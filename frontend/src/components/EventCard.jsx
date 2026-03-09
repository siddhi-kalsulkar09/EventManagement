import { Link, useLocation } from "react-router";
import { CalendarDays, UserCircle, Info, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const EventCard = ({ event, setEvents }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/event/${event._id}`;

  // Delete event
  const handleDelete = async () => {
    try {
      await api.delete(`/events/${event._id}`);
      setEvents((prev) => prev.filter((e) => e._id !== event._id));
      toast.success("Event deleted successfully");
    } catch {
      toast.error("Failed to delete event");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <Link
        to={`/eventHome/${event._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${
          isActive ? "border-primary shadow-lg" : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >

        {/* Top Row */}
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">{event._id}</p>
          <span className="badge badge-secondary">{formatDate(event.date)}</span>
        </div>

        {/* Event Info */}
        <div className="mt-4 space-y-2">

          {/* Title */}
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">{event.title}</p>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 text-base-content/70">
            <Info className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">{event.category}</p>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-2 text-base-content/70">
            <UserCircle className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">{event.venue}</p>
          </div>

          {/* Seats */}
          <div className="flex justify-between mt-2 text-sm">
            <span>Total: {event.totalSeats}</span>
            <span>Available: {event.availableSeats}</span>
            <span>Status: {event.attendanceStatus || "N/A"}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">

          <span className="text-xs text-base-content/60">
            {formatDate(event.createdAt)}
          </span>

          <div className="flex items-center gap-4">

            {/* EDIT */}
            <div className="tooltip tooltip-warning" data-tip="Edit event">
              <Link
        to={`/event/${event._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${
          isActive ? "border-primary shadow-lg" : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >
              <Edit2 className="size-4 text-warning hover:scale-110 transition" />
              </Link>
            </div>

            {/* REGISTER BUTTON */}
            <Link
              to={`/register/${event._id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-sm btn-success"
            >
              Register
            </Link>

            {/* DELETE */}
            <div className="tooltip tooltip-error" data-tip="Delete Event">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="text-error hover:scale-110 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

          </div>
        </div>

      </Link>

      {/* DELETE MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Event
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure want to delete{" "}
              <span className="font-semibold">{event.title}</span>?
            </p>

            <div className="modal-action">

              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>

            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default EventCard;