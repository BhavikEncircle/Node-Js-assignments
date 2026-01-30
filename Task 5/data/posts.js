let posts = [];
let postId = 1;

function getNextPostId() {
  return postId++;
}

module.exports = {
  posts,
  getNextPostId,
};
