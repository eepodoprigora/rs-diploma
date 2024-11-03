const Amenity = require("../models/Amenity");

async function getAmenities() {
  return await Amenity.find({});
}

module.exports = { getAmenities };
