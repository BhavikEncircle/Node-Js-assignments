const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", auth, createPost);
router.put("/posts/:id", auth, updatePost);
router.delete("/posts/:id", auth, deletePost);

module.exports = router;
