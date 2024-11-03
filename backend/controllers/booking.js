const Hotel = require("../models/Hotel");
const Booking = require("../models/Booking");

async function addBooking(hotelCode, booking) {
  const hotel = await Hotel.findOne({ code: hotelCode });
  if (!hotel) {
    throw new Error("Отель с указанным кодом не найден");
  }

  const newBooking = await Booking.create({
    ...booking,
    hotel: hotel._id,
  });

  await Hotel.findByIdAndUpdate(hotel._id, { $push: { bookings: newBooking } });

  await newBooking.populate([
    { path: "user", select: "_id email" },
    { path: "hotel", select: "_id title code" },
  ]);
  return newBooking;
}

async function getAllBookings() {
  const bookings = await Booking.find({});

  await Promise.all(
    bookings.map((booking) =>
      booking.populate([
        { path: "user", select: "_id email" },
        { path: "hotel", select: "_id title code" },
      ])
    )
  );

  return bookings;
}

async function deleteBookingAsync(id) {
  return Booking.deleteOne({ _id: id });
}

async function editBookingAsync(id, check_in, check_out) {
  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: id },
    { check_in, check_out },
    { new: true }
  ).populate([
    { path: "user", select: "_id email" },
    { path: "hotel", select: "_id title code" },
  ]);

  if (!updatedBooking) {
    throw new Error("Бронирование не найдено");
  }

  return updatedBooking;
}

module.exports = {
  addBooking,
  editBookingAsync,
  deleteBookingAsync,
  getAllBookings,
};
