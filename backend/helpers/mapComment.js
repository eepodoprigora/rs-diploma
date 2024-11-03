module.exports = function (comment) {
  return {
    content: comment.content,
    id: comment._id,
    author: comment.author.login,
    publishedAt: comment.createdAt,
  };
};
