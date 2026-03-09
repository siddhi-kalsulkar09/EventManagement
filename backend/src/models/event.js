// // const mongoose = require("mongoose");
// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//     venue: {
//       type: String,
//       required: true,
//     },
//     totalSeats: {
//       type: Number,
//       required: true,
//     },
//     availableSeats: {
//       type: Number,
//       required: true,
//     },
//     participantName: {
//       type: String,
//     },
//     email: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     status: {
//       type: String,
//       default: "Registered",
//     },
//     attendanceStatus: {
//       type: String,
//       default: "Absent",
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//     },
//   },
//   { timestamps: true }
// );

// const EventExport = mongoose.model("Event", eventSchema);
// export default EventExport;

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    // participants array (multiple registrations store होतील)
    participants: [
      {
        name: String,
        email: String,
        phone: String,
      },
    ],

    status: {
      type: String,
      default: "Registered",
    },

    attendanceStatus: {
      type: String,
      default: "Absent",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const EventExport = mongoose.model("Event", eventSchema);
export default EventExport;