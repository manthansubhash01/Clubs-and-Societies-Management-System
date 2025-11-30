import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    venue: "",
    start_time: "",
    end_time: "",
    capacity: "",
    poc: "",
    thumbnail_url: "",
    restrict_email_domain: false,
    allowed_email_domain: "adypu.edu.in",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        restrict_email_domain: !!form.restrict_email_domain,
        allowed_email_domain: form.restrict_email_domain
          ? form.allowed_email_domain
          : undefined,
      };

      const created = await api.post("/events", payload);

      if (created?.id) navigate(`/events/${created.id}`);
      else navigate("/events");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="relative z-10 pt-24 pb-20 px-6 overflow-y-auto max-h-screen">

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-5xl text-white font-semibold mb-4">
            Create New Event
          </h1>
          <p className="text-gray-200 text-lg max-w-xl mx-auto">
            Fill in the details below to publish a new event for your community.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-white/40">
          {error && (
            <div className="text-red-600 mb-4 bg-red-100 border border-red-300 rounded p-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">

            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Event Title
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Enter event title"
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Describe your event"
                rows={4}
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Thumbnail Image URL
              </label>
              <input
                name="thumbnail_url"
                value={form.thumbnail_url}
                onChange={onChange}
                placeholder="Paste event thumbnail image URL"
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Venue
              </label>
              <input
                name="venue"
                value={form.venue}
                onChange={onChange}
                placeholder="Where will the event take place?"
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-[#12202b] font-medium">
                  Start Time
                </label>
                <input
                  name="start_time"
                  type="datetime-local"
                  value={form.start_time}
                  onChange={onChange}
                  className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-[#12202b] font-medium">
                  End Time
                </label>
                <input
                  name="end_time"
                  type="datetime-local"
                  value={form.end_time}
                  onChange={onChange}
                  className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Capacity (optional)
              </label>
              <input
                name="capacity"
                type="number"
                value={form.capacity}
                onChange={onChange}
                placeholder="Max attendees allowed"
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#12202b] font-medium">
                Point of Contact
              </label>
              <input
                name="poc"
                value={form.poc}
                onChange={onChange}
                placeholder="Who to contact for details?"
                className="w-full border border-[#e4d8c9] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#b8894a] outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-[#12202b] font-medium">
                Email Domain Restriction
              </label>

              <div className="flex items-center gap-4 bg-[#faf6f1] border border-[#e4d8c9] rounded-xl p-4">
                <input
                  id="restrict"
                  name="restrict_email_domain"
                  type="checkbox"
                  checked={form.restrict_email_domain}
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      restrict_email_domain: e.target.checked,
                    }))
                  }
                  className="w-5 h-5"
                />

                <label htmlFor="restrict" className="text-sm text-[#12202b]">
                  Restrict registrations to:
                </label>

                <input
                  name="allowed_email_domain"
                  value={form.allowed_email_domain}
                  onChange={onChange}
                  disabled={!form.restrict_email_domain}
                  placeholder="e.g. adypu.edu.in"
                  className="border border-[#dccfbc] px-3 py-2 rounded-lg outline-none disabled:bg-gray-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                disabled={loading}
                className="bg-[#b8894a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#9c763f] transition shadow-md"
              >
                {loading ? "Creating..." : "Create Event"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/events")}
                className="text-sm text-[#7b6f61] hover:underline"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
