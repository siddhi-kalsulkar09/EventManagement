import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event", error);
        toast.error("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Delete event
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting event", error);
      toast.error("Failed to delete event");
    }
  };

  // Save / Update event
  const handleSave = async () => {
    if (!event.title?.trim() || !event.category?.trim()) {
      toast.error("Please add title and category");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/events/${id}`, {
        ...event,
        totalSeats: Number(event.totalSeats),
        availableSeats: Number(event.availableSeats),
        rating: Number(event.rating),
      });
      toast.success("Event updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating event", error);
      toast.error("Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Events
            </Link>

            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5"/> Delete Event
            </button>
          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {/* Title */}
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Title</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.title}
                  onChange={(e) => setEvent({ ...event, title: e.target.value })}
                />
              </div>

              {/* Category */}
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Category</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.category}
                  onChange={(e) => setEvent({ ...event, category: e.target.value })}
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Date</span></label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Time</span></label>
                  <input
                    type="time"
                    className="input input-bordered"
                    value={event.time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })}
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Venue</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.venue}
                  onChange={(e) => setEvent({ ...event, venue: e.target.value })}
                />
              </div>

              {/* Seats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Total Seats</span></label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={event.totalSeats}
                    onChange={(e) => setEvent({ ...event, totalSeats: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Available Seats</span></label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={event.availableSeats}
                    onChange={(e) => setEvent({ ...event, availableSeats: e.target.value })}
                  />
                </div>
              </div>

              {/* Participant Info */}
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Participant Name</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={event.participantsName}
                  onChange={(e) => setEvent({ ...event, participantsName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={event.email}
                  onChange={(e) => setEvent({ ...event, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  value={event.phone}
                  onChange={(e) => setEvent({ ...event, phone: e.target.value })}
                />
              </div>

              {/* Status & Attendance */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <select
                  className="select select-bordered"
                  value={event.status}
                  onChange={(e) => setEvent({ ...event, status: e.target.value })}
                >
                  <option value="">Select Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  className="select select-bordered"
                  value={event.attendanceStatus}
                  onChange={(e) => setEvent({ ...event, attendanceStatus: e.target.value })}
                >
                  <option value="">Attendance Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              {/* Rating */}
              <div className="form-control mb-6">
                <label className="label"><span className="label-text">Rating (1-5)</span></label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="input input-bordered"
                  value={event.rating}
                  onChange={(e) => setEvent({ ...event, rating: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;