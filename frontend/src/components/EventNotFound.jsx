import { CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router";

const EventNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <CalendarDaysIcon className="size-10 text-primary" />
      </div>

      <h3 className="text-2xl font-bold">No events yet</h3>
      <p className="text-base-content/70">
        Ready to add events? Click below to create your first event.
      </p>

      <Link to="/create-event" className="btn btn-primary">
        Add First Event
      </Link>
    </div>
  );
};

export default EventNotFound;