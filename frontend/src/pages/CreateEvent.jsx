import api from "../lib/axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    totalSeats: "",
    availableSeats: "",
    participantsName: "",
    email: "",
    phone: "",
    status: "",
    attendanceStatus: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/events", {
        ...formData,
        totalSeats: Number(formData.totalSeats),
        availableSeats: Number(formData.availableSeats),
        rating: Number(formData.rating),
      });

      toast.success("Event created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating event", error);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Events
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Event
              </h2>

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    className="input input-bordered"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Workshop / Seminar / Cultural"
                    className="input input-bordered"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    className="input input-bordered"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Venue */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Venue</span>
                  </label>
                  <input
                    type="text"
                    name="venue"
                    placeholder="Event Location"
                    className="input input-bordered"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Seats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Total Seats</span>
                    </label>
                    <input
                      type="number"
                      name="totalSeats"
                      className="input input-bordered"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Available Seats</span>
                    </label>
                    <input
                      type="number"
                      name="availableSeats"
                      className="input input-bordered"
                      value={formData.availableSeats}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Participant Details */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Participant Name</span>
                  </label>
                  <input
                    type="text"
                    name="participantsName"
                    className="input input-bordered"
                    value={formData.participantsName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="input input-bordered"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}
                <div className="form-control mb-4 mt-4">
                  <label className="label">
                    <span className="label-text">Event Status</span>
                  </label>
                  <select
                    name="status"
                    className="select select-bordered"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Attendance Status */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Attendance Status</span>
                  </label>
                  <select
                    name="attendanceStatus"
                    className="select select-bordered"
                    value={formData.attendanceStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Rating (1-5)</span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    className="input input-bordered"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Event"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;