import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Flight from "../models/Flight.js";
import { createEmbedding } from "../ai/embedding.js";
import { qdrant } from "./qdrantClient.js";
import { randomUUID } from "crypto";

await mongoose.connect(process.env.MONGODB_URI);

console.log("MongoDB connected");

const COLLECTION = "travel";

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

    await qdrant.upsert(COLLECTION, {
      points: [
        {
          id: randomUUID(),
          vector: vector,

          payload: {
            type: "hotel",
            name: hotel.name,
            province: hotel.province,
            district: hotel.district,
            price: hotel.pricePerNight,
            star: hotel.starRating,
            amenities: hotel.amenities,
            description: hotel.description
          }
        }
      ]
    });

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

    await qdrant.upsert(COLLECTION, {
      points: [
        {
          id: randomUUID(),
          vector: vector,

          payload: {
            type: "flight",
            airline: flight.airline,
            from: flight.from,
            to: flight.to,
            price: flight.price,
            departure: flight.departureTime
          }
        }
      ]
    });

    console.log(
      "Flight embedded:",
      flight.airline,
      flight.from,
      "→",
      flight.to
    );
  }
}

async function buildAll() {

  await buildHotelEmbeddings();
  await buildFlightEmbeddings();

  console.log("All embeddings pushed to Qdrant");

  process.exit();
}

buildAll();