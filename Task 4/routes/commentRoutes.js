const express = require("express");
const router = express.Router();

const {
  createComment,
  getCommentsByPost,
} = require("../controllers/commentController");
router.post("/posts/:id/comments", createComment);
router.get("/posts/:id/comments", getCommentsByPost);

module.exports = router;
