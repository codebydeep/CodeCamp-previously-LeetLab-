import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createRoom, joinRoom } from "../controllers/rooms.controllers.js";

const roomRoutes = express.Router();

roomRoutes.post("/create-room", authMiddleware, createRoom)
roomRoutes.post("/join-room", authMiddleware, joinRoom)

export default roomRoutes 