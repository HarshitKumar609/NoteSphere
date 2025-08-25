import connectToMongo from "./db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/Auth.routes.js";
import notesRoutes from "./routes/Notes.routes.js";
dotenv.config({
  path: "./env",
});

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.listen(process.env.port || 3000, () => {
  console.log(`server is running in port ${process.env.Port || 3000}`);
  console.log(`http://localhost:${process.env.Port || 3000}`);
});
