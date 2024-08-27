import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.routes.js";
import usersRoute from "./routes/users.routes.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
// const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/friendList", usersRoute);

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
