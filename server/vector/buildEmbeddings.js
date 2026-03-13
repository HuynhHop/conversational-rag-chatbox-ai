import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Flight from "../models/Flight.js";
import { createEmbedding } from "../ai/embedding.js";

await mongoose.connect(process.env.MONGODB_URI);

console.log("MongoDB connected");

async function buildHotelEmbeddings() {

  const hotels = await Hotel.find();

  for (const hotel of hotels) {

    const text = `
Hotel: ${hotel.name}
Location: ${hotel.province} ${hotel.district}
Price: ${hotel.pricePerNight}
Star: ${hotel.starRating}
Amenities: ${hotel.amenities.join(",")}
Description: ${hotel.description}
`;

    const vector = await createEmbedding(text);

    hotel.embedding = vector;

    await hotel.save();

    console.log("Hotel embedded:", hotel.name);
  }

}

async function buildFlightEmbeddings() {

  const flights = await Flight.find();

  for (const flight of flights) {

    const text = `
Flight: ${flight.airline}
From: ${flight.from}
To: ${flight.to}
Price: ${flight.price}
Departure: ${flight.departureTime}
`;

    const vector = await createEmbedding(text);

    flight.embedding = vector;

    await flight.save();

    console.log("Flight embedded:", flight.airline, flight.from, "→", flight.to);
  }

}

async function buildAll() {

  await buildHotelEmbeddings();

  await buildFlightEmbeddings();

  console.log("All embeddings complete");

  process.exit();

}

buildAll();