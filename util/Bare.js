const fs = require("node:fs/promises");
const http = require("node:http");

class Bare {
  constructor() {
    this.server = http.createServer();

    this.routes = {};

    this.server.on("request", (req, res) => {
      //used to send a file to client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");

        const fileStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);

        fileStream.pipe(res);
      };

      //to set the status code
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      //to send a json data
      //!TODO-> handle for huge json
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(data));
      };

      //if routes object does not have a key of req.method+req.url, return 404
      if (!this.routes[req.method.toLowerCase() + req.url]) {
        return res
          .status(404)
          .json({ error: `cannot ${req.method} ${req.url}` });
      }

      this.routes[req.method.toLowerCase() + req.url](req, res);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }
  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }
}

module.exports = Bare;
