import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 1080;
app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);


connectDB().then(() => {

app.listen(port, () => {
  console.log(`http://localhost:${port}/events`);
});
});
