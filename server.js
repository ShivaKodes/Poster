const Bare = require("./util/Bare");

const server = new Bare();
const PORT = 3005;

const USERS = [
  {
    id: 1,
    name: "Shiva",
    username: "shk",
    password: "string",
  },
  {
    id: 2,
    name: "Drako",
    username: "drk",
    password: "string",
  },
  {
    id: 3,
    name: "Hufflepuff",
    username: "hpf",
    password: "string",
  },
];

const POSTS = [
  {
    id: 12,
    title: "A Post",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ipsa asperiores enim doloribus quaerat consequatur temporibus non quam, eum esse?",
    userId: 1,
  },
];

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});
server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});
server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/js");
});

server.route("get", "/api/user", (req, res) => {
  res.status(200).json({ user: "Shiva" });
});
server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);

    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
