const mongoose = require("mongoose");
// const validator = require("validator");

const HotelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    photos: {
      type: Array,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    rating_average: {
      type: String,
      required: true,
    },
    addressline: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    price_per_night: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
