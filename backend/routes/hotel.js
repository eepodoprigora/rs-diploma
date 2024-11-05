const express = require("express");
const {
  addHotel,
  editHotelByCode,
  deleteHotel,
  getHotels,
  getHotel,
} = require("../controllers/hotel");
const {
  addBooking,
  getAllBookings,
  deleteBookingAsync,
  editBookingAsync,
} = require("../controllers/booking");
const { addComment, deleteComment } = require("../controllers/comment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapHotel = require("../helpers/mapHotel");
const mapComment = require("../helpers/mapComment");
const ROLES = require("../constants/roles");
const { getAmenities } = require("../controllers/amenity");
const mapBooking = require("../helpers/mapBooking");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { limit, search } = req.query;
  try {
    const hotels = await getHotels(parseInt(limit), search);
    res.send({ data: hotels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/hotel/:code", async (req, res) => {
  try {
    const hotel = await getHotel(req.params.code);
    res.send({ data: mapHotel(hotel) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/hotels/amenities",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const amenities = await getAmenities();

    res.send(amenities);
  }
);

router.post("/hotel/:code/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.code, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.post("/hotel/:code/bookings", authenticated, async (req, res) => {
  try {
    const newBooking = await addBooking(req.params.code, {
      hotel: req.params.code,
      user: req.user.id,
      phone: req.body.phone,
      check_in: req.body.check_in,
      check_out: req.body.check_out,
    });

    res.send({ data: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/bookings", authenticated, async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.send({ data: bookings.map(mapBooking) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/bookings/:id", authenticated, async (req, res) => {
  try {
    const { check_in, check_out, phone } = req.body;

    const updatedBooking = await editBookingAsync(
      req.params.id,
      check_in,
      check_out,
      {
        phone: phone,
      }
    );

    res.send({ data: mapBooking(updatedBooking) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/bookings/:id", authenticated, async (req, res) => {
  try {
    await deleteBookingAsync(req.params.id);
    res.send({ error: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/hotel/:code/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

router.post(
  "/",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const newHotel = await addHotel({
      title: req.body.title,
      code: req.body.code,
      content: req.body.content,
      photos: req.body.photos,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      rating_average: req.body.rating_average,
      addressline: req.body.addressline,
      stars: req.body.stars,
      price_per_night: req.body.price_per_night,
      amenities: req.body.amenities,
    });

    res.send({ data: mapHotel(newHotel) });
  }
);

router.patch(
  "/hotel/:code/edit",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const updatedPost = await editHotelByCode(req.params.code, {
      title: req.body.title,
      code: req.body.code,
      content: req.body.content,
      photos: req.body.photos,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      rating_average: req.body.rating_average,
      addressline: req.body.addressline,
      stars: req.body.stars,
      price_per_night: req.body.price_per_night,
      amenities: req.body.amenities,
    });

    res.send({ data: mapHotel(updatedPost) });
  }
);

router.delete(
  "/hotel/:code",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    try {
      const result = await deleteHotel(req.params.code);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.send({ error: null });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting hotel", error });
    }
  }
);

module.exports = router;
