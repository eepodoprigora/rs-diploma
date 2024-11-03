const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (hotel) {
  return {
    id: hotel.id,
    title: hotel.title,
    code: hotel.code,
    content: hotel.content,
    photos: hotel.photos,
    longitude: hotel.longitude,
    latitude: hotel.latitude,
    ratingAverage: hotel.rating_average,
    addressline: hotel.addressline,
    stars: hotel.stars,
    pricePerNight: hotel.price_per_night,
    amenities: hotel.amenities,
    comments: hotel.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
  };
};
