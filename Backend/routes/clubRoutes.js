import express from "express";
import { getAllClubs, getClubById, addClub } from "../controllers/clubController.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = express.Router();

router.get("/clubs", getAllClubs);
router.get("/clubs/:id", getClubById);
router.post("/clubs", authenticate, requireRole("SUPER_ADMIN"), addClub);

export default router;
