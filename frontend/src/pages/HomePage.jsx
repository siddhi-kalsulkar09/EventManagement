import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import EventCard from "../components/EventCard.jsx";
import EventNotFound from "../components/EventNotFound.jsx";
import { LoaderIcon } from "lucide-react";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
        setAllEvents(res.data);
      } catch (error) {
        console.log("Error fetching events", error);
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  // Back to all events
  const handleBack = () => {
    setEvents(allEvents);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {isSearching && (
          <button
            onClick={handleBack}
            className="btn btn-outline btn-primary mb-4"
          >
            Back to Events
          </button>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoaderIcon className="animate-spin size-10 text-primary" />
          </div>
        )}

        {/* No Events */}
        {!loading && events.length === 0 && <EventNotFound />}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <>
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Events</h2>
              <span className="badge badge-primary">
                Total: {events.length}
              </span>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  setEvents={setEvents}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;