import express from "express";
import { createUser, getAllUsers} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);



export default router;
