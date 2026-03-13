import Hotel from "../models/Hotel.js";

export async function getAllHotels() {
  return Hotel.find();
}