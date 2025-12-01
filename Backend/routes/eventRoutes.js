import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import {
  createRegistration,
  getRegistrationsForEvent,
} from "../controllers/registrationController.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = express.Router();

const allowedRoles = ["PRESIDENT", "VICE_PRESIDENT", "HANDLER", "SUPER_ADMIN"];

router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.post("/events", authenticate, requireRole(...allowedRoles), createEvent);
router.post("/events/:id/register", createRegistration);
router.get(
  "/events/:id/registrations",
  authenticate,
  requireRole(...allowedRoles),
  getRegistrationsForEvent
);
router.put("/events/:id", authenticate, updateEvent);
router.delete(
  "/events/:id",
  authenticate,
  requireRole(...allowedRoles),
  deleteEvent
);

export default router;
