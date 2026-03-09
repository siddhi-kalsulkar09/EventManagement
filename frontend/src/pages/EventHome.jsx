import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import api from "../lib/axios";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Users,
  Star,
  Trash2,
  Edit,
  ArrowLeft,
} from "lucide-react";

const EventHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

    // Navbar search function
  const handleSearch = (text) => {
    if (text.trim() === "") {
      setEvents(allEvents);
      setIsSearching(false);
      return;
    }

    const filtered = allEvents.filter((event) =>
      event.title.toLowerCase().includes(text.toLowerCase())
    );

    setEvents(filtered);
    setIsSearching(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
    <Navbar onSearch={handleSearch} />
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <Link to="/" className="btn btn-ghost">
            <ArrowLeft className="w-4 h-4"/> Back
          </Link>

          <div className="flex gap-3">

            <Link
              to={`/event/${event._id}`}
              className="btn btn-warning btn-sm"
            >
              <Edit className="w-4 h-4"/> Edit
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm"
            >
              <Trash2 className="w-4 h-4"/> Delete
            </button>

          </div>

        </div>

        {/* EVENT HERO */}
        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <h1 className="card-title text-3xl font-bold">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 mt-4 text-sm text-base-content/70">

              <div className="flex items-center gap-2">
                <CalendarDays size={18}/>
                {event.date} • {event.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18}/>
                {event.venue}
              </div>

            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4">

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Seats</div>
            <div className="stat-value">{event.totalSeats}</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Available Seats</div>
            <div className="stat-value text-success">
              {event.availableSeats}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Participants</div>
            <div className="stat-value text-primary">
              {event.participants.length}
            </div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Rating</div>
            <div className="stat-value flex items-center gap-2">
              {event.rating}
              <Star className="text-yellow-500"/>
            </div>
          </div>

        </div>

        {/* PARTICIPANTS */}
        <div className="card bg-base-100 shadow-xl">

          <div className="card-body">

            <div className="flex justify-between items-center mb-4">

              <h2 className="card-title">
                <Users className="w-5 h-5"/>
                Participants
              </h2>

              <Link
                to={`/register/${event._id}`}
                className="btn btn-success btn-sm"
              >
                Register Participant
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>

                <tbody>

                  {event.participants.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </div>
    </>
  );
};

export default EventHome;