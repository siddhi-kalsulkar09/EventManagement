import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CreateEvent from "./pages/CreateEvent";
import EventDetailPage from "./pages/EventDetailPage";
import EventHome from "./pages/EventHome";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <>
      {/* Toast messages show karayla */}
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/register/:id" element={<RegisterPage />} />
        {/* <Route path="/EventHome/:id" element={<EventHome />} /> */}

        <Route path="/eventHome/:id" element={<EventHome />} />
      </Routes>
    </>
  );
};

export default App;