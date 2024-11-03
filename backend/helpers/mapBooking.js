module.exports = function (booking) {
  return {
    hotel: booking.hotel,
    user: booking.user,
    phone: booking.phone,
    check_in: booking.check_in,
    check_out: booking.check_out,
    id: booking._id,
  };
};
