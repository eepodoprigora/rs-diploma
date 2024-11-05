module.exports = function (comment) {
  return {
    content: comment.content,
    id: comment._id,
    author: comment.author ? comment.author.login : "Удаленный пользователь",
    publishedAt: comment.createdAt,
  };
};
