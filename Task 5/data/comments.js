let comments = [];
let commentId = 1;

function getNextCommentId() {
  return commentId++;
}

module.exports = {
  comments,
  getNextCommentId,
};
