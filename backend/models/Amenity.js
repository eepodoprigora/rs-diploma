const mongoose = require("mongoose");

const AmenitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Amenity = mongoose.model("Amenity", AmenitySchema);
module.exports = Amenity;
