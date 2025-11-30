import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../lib/api";
import LoadingScreen from "./LoadingScreen";
import useLoader from "../hooks/useLoader";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const showLoader = useLoader(loading, 800);

  const canViewData = ["SUPER_ADMIN", "PRESIDENT", "VICE_PRESIDENT"].includes(
    localStorage.getItem("role")
  );

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        const data = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isLive = event
    ? (() => {
        const start = new Date(event.start_time);
        const end = new Date(event.end_time);
        const now = new Date();
        return start <= now && end >= now;
      })()
    : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (event?.restrict_email_domain) {
      const allowed = (event.allowed_email_domain || "").toLowerCase();
      if (!form.email.toLowerCase().endsWith(`@${allowed}`)) {
        setSubmitError(
          `Registrations are restricted to @${allowed} email addresses`
        );
        return;
      }
    }

    try {
      await api.post(`/events/${id}/register`, form);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err?.message || "Failed to register");
    }
  };

  if (showLoader) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <LoadingScreen message="Fetching event information…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <div className="p-20 text-center text-red-600 mt-32">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6efe6]">
      <Navbar />

      <div className="w-full bg-[#12202b] rounded-3xl max-w-[1300px] mx-auto px-10 py-24 mt-40 relative overflow-hidden shadow-xl">
        <img
          src={
            event.thumbnail_url ||
            event.image ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
          }
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-white font-['Playfair_Display'] text-5xl font-semibold leading-tight">
            {event.name}
          </h1>

          <p className="text-white/80 mt-4 text-xl">{event.venue}</p>

          {isLive && (
            <div className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm font-semibold animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span> LIVE NOW
            </div>
          )}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#eadfce] mb-12">
          <h2 className="text-[#12202b] font-['Playfair_Display'] text-4xl mb-6">
            About this event
          </h2>

          <p className="text-[#7b6f61] text-lg leading-relaxed max-w-[900px]">
            {event.description || "No description available."}
          </p>

          <div className="mt-8 space-y-3 text-[#12202b] text-lg">
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>
            <p>
              <strong>Starts:</strong> {event.start_time}
            </p>
            <p>
              <strong>Ends:</strong> {event.end_time}
            </p>
          </div>

          {canViewData && (
            <button
              onClick={() => navigate(`/events/${id}/registrations`)}
              className="mt-8 bg-[#b8894a] text-white px-6 py-3 rounded-xl shadow hover:bg-[#9c763f] transition"
            >
              View Registrations
            </button>
          )}
        </div>

        {!isLive ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#eadfce]">
            <h2 className="text-[#12202b] font-['Playfair_Display'] text-2xl mb-6">
              Register for this event
            </h2>

            {submitted ? (
              <p className="text-green-600 font-medium">
                Registration successful!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="text-red-600 bg-red-100 border border-red-300 rounded p-3 text-sm">
                    {submitError}
                  </div>
                )}

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                  required
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                  required
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                />

                <button className="bg-[#b8894a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#9c763f] transition">
                  Submit Registration
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-8 border border-[#eadfce]">
            <p className="text-red-500 font-semibold text-lg">
              Registration is closed because this event is currently LIVE.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
