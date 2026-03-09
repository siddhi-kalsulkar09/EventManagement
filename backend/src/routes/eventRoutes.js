// import express from "express";
// import {
//   createEvent,
//   getAllEvents,
//   updateEvent,
//   deleteEvent,
//   getEventById,
// } from "../controllers/eventController.js";

// const router = express.Router();

// router.get("/", getAllEvents);
// router.post("/", createEvent);
// router.put("/:id", updateEvent);
// router.delete("/:id", deleteEvent);
// router.get("/:id", getEventById);

// export default router;

import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventById,
  registerParticipant   // 👈 new import
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEventById);

// ✅ New Registration Route
router.post("/:id/register", registerParticipant);

export default router;