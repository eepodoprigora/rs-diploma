const Comment = require("../models/Comment");
const Hotel = require("../models/Hotel");

// add

async function addComment(hotelCode, comment) {
  const newComment = await Comment.create(comment);

  // Найти отель по коду вместо ID
  const hotel = await Hotel.findOne({ code: hotelCode });

  if (!hotel) {
    throw new Error("Отель с указанным кодом не найден");
  }

  await Hotel.findByIdAndUpdate(hotel._id, { $push: { comments: newComment } });

  await newComment.populate("author");

  return newComment;
}

// delete

async function deleteComment(hotelId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Hotel.findByIdAndUpdate(hotelId, { $pull: { comments: commentId } });
}

module.exports = {
  addComment,
  deleteComment,
};
