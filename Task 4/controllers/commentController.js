const { getIO } = require("../socket");
const { comments, getNextCommentId } = require("../data/comments");
const { posts } = require("../data/posts");

exports.createComment = (req, res) => {
  const postId = parseInt(req.params.id);
  const { text } = req.body;

  const postExists = posts.find((p) => p.id === postId);
  if (!postExists) {
    return res.status(404).json({ message: "Post not found." });
  }
  if (!text) {
    return res.status(400).json({ message: "Comment text required." });
  }

  const newComment = {
    id: getNextCommentId(),
    postId,
    text,
  };

  comments.push(newComment);

  const io = getIO();
  io.emit("newComment", newComment);

  res.status(201).json(newComment);
};
exports.getCommentsByPost = (req, res) => {
  const postId = parseInt(req.params.id);

  const postComments = comments.filter((c) => c.postId === postId);

  res.json(postComments);
};
