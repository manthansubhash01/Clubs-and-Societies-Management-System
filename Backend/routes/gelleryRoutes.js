import express from "express";
import { addImage, getGallery, deleteImage, getGalleryByClub } from "../controllers/galleryController.js";
import { authenticate } from "../MiddleWares/auth.js";

const router = express.Router();

router.get("/gallery", getGallery);
router.get("/gallery/:club_id", getGalleryByClub);
router.post("/gallery", authenticate, addImage);
router.delete("/gallery/:id", authenticate, deleteImage);

export default router;
