import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoute from "./api/chat.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/chat", chatRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});