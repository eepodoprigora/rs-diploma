const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    check_in: {
      type: String,
      required: true,
    },
    check_out: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
