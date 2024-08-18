import express from "express";
import { isAuthenticate } from "../middleware/verifyToken.js";
import { friends } from "../controller/users.controller.js";

const router = express.Router();

router.get("/", isAuthenticate, friends);

export default router;
