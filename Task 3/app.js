const express = require("express");
const app = express();

app.use(express.json());

let posts = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("This is home page.");
});
app.get("/about", (req, res) => {
  res.send("This is about page.");
});
app.get("/posts", (req, res, next) => {
  res.json(posts);
});
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and Content are required." });
  }

  const newPost = {
    id: idCounter,
    title,
    content,
  };
  idCounter++;

  posts.push(newPost);

  res.status(201).json(newPost);
});
app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }

  res.json(post);
});
app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }

  const { title, content } = req.body;

  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === postId);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found." });
  }

  posts.splice(index, 1);
  res.json({ message: "Post Deleted Sucessfully." });
});
app.listen(3000);
