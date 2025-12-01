import express from "express";
import { login, refresh, logout, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/refresh", refresh);
router.post("/auth/logout", logout);
router.post("/auth/change-password", changePassword);

export default router;
