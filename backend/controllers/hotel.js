const Hotel = require("../models/Hotel");
const Amenity = require("../models/Amenity");
const mapHotel = require("../helpers/mapHotel");

// add

async function addHotel(hotel) {
  const newHotel = await Hotel.create(hotel);

  // Выполняем популяцию сразу после создания
  const populatedHotel = await Hotel.findById(newHotel._id)
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .populate("amenities");

  return populatedHotel;
}

// edit

async function editHotelByCode(code, hotelData) {
  const updatedHotel = await Hotel.findOneAndUpdate(
    { code }, // поиск по коду
    hotelData,
    { returnDocument: "after", new: true } // возвращаем новый документ
  );

  if (updatedHotel) {
    return await Hotel.findById(updatedHotel._id)
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .populate("amenities");
  }

  return updatedHotel;
}

// delete

function deleteHotel(code) {
  return Hotel.deleteOne({ code: code });
}

// get list with search

async function getHotels(limit = 3, search = "") {
  const filter = search ? { title: { $regex: search, $options: "i" } } : {};
  const hotels = await Hotel.find(filter).limit(limit).sort({ createdAt: -1 });

  const totalCount = await Hotel.countDocuments(filter);
  return { hotels: hotels.map(mapHotel), totalCount };
}

// get item

async function getHotel(code) {
  try {
    const hotel = await Hotel.findOne({ code })
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .populate("amenities");

    if (!hotel) {
      throw new Error("Отель не найден");
    }
    return hotel;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addHotel,
  editHotelByCode,
  deleteHotel,
  getHotels,
  getHotel,
};
