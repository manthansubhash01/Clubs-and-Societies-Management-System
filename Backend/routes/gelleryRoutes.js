import express from "express";
import { addImage, getGallery } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/gallery", getGallery);
router.post("/gallery", addImage);



export default router;
