// import Event from "../models/event.js";

// export const createEvent = async (req, res) => {
//   try {
//     const event = await Event.create(req.body);
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteEvent = async (req, res) => {
//   try {
//     await Event.findByIdAndDelete(req.params.id);
//     res.json({ message: "Event deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Event from "../models/event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EVENT BY ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ REGISTER PARTICIPANT
export const registerParticipant = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // add participant
    event.participants.push({
      name,
      email,
      phone,
    });

    // decrease seats
    event.availableSeats = event.availableSeats - 1;

    await event.save();

    res.json({
      message: "Registration Successful",
      event,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};