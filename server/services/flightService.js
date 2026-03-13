import Flight from "../model/Flight.js";

export async function getAllFlights() {
  return Flight.find();
}