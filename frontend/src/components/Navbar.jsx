import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo / Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Event Management
          </h1>

          {/* Search + Button */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <input
              type="text"
              placeholder="Search event..."
              className="px-3 py-2 rounded-lg outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100"
            >
              Search
            </button>

            {/* New Event */}
            <Link
              to="/create"
              className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-indigo-100 transition duration-300"
            >
              <PlusIcon size={18} />
              <span>New Event</span>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;