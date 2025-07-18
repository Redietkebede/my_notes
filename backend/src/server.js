import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    //credentials: true,
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/trial", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});
