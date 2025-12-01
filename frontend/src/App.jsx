import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Clubs from "./components/Clubs";
import ClubDetail from "./components/ClubDetail";
import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import EventRegistrations from "./components/EventRegistrations";
import ManageMembers from "./components/ManageMembers";
import ManageGallery from "./components/ManageGallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/:id/registrations" element={<EventRegistrations />} />
        <Route path="/events/new" element={<CreateEvent />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin/members" element={<ManageMembers />} />
        <Route path="/admin/gallery" element={<ManageGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
