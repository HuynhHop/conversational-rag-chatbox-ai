import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({

  name: String,
  province: String,
  district: String,
  pricePerNight: Number,
  starRating: Number,
  amenities: [String],
  description: String, 

    embedding: [Number]
}, {
  collection: "hotel"
});

export default mongoose.model("Hotel", HotelSchema);