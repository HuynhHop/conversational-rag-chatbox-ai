import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({

  airline: String,
  from: String,
  to: String,
  price: Number,
  departureTime: String,
   embedding: [Number]

}, {
  collection: "flight"

});

export default mongoose.model("Flight", FlightSchema);