const { posts, getNextPostId } = require("../data/posts");
exports.getAllPosts = (req, res) => {
  res.json(posts);
};

exports.getPostById = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  res.json(post);
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: "Title and Content required" });
  }

  const newPost = {
    id: getNextPostId(),
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

exports.updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;

  if (title) {
    post.title = title;
  }
  if (content) {
    post.content = content;
  }

  res.json(post);
};

exports.deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
};
