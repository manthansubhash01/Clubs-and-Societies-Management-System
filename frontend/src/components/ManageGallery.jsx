import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../lib/api";

const allowedRoles = ["SUPER_ADMIN", "PRESIDENT", "HANDLER"];

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({ url: "", text: "", club_id: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const userClubId =
    typeof window !== "undefined" ? localStorage.getItem("club_id") : null;

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (clubs.length > 0 && !form.club_id) {
      if (role !== "SUPER_ADMIN" && userClubId) {
        setForm((prev) => ({ ...prev, club_id: Number(userClubId) }));
      } else {
        setForm((prev) => ({ ...prev, club_id: clubs[0].id }));
      }
    }
  }, [clubs, role, userClubId]);

  if (!isMounted || !role) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <div className="max-w-[900px] mx-auto px-6 py-24 text-center">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  if (!allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <div className="max-w-[900px] mx-auto px-6 py-24 text-center text-red-600">
          You are not authorized to view this page.
        </div>
        <Footer />
      </div>
    );
  }

  const fetchData = async () => {
    try {
      setLoading(true);

      const galleryData = await api.get("/gallery");
      setGallery(galleryData || []);

      const clubsData = await api.get("/clubs");
      setClubs(clubsData || []);

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "club_id" ? Number(value) : value });
  };

  const handleAddImage = async (e) => {
    e.preventDefault();

    if (!form.url.trim()) {
      alert("Please enter an image URL");
      return;
    }

    if (!form.club_id) {
      alert("Please select a club");
      return;
    }

    try {
      setIsAdding(true);
      const payload = {
        url: form.url.trim(),
        text: form.text.trim() || null,
        club_id: Number(form.club_id),
      };

      await api.post("/gallery", payload);
      setForm({
        url: "",
        text: "",
        club_id:
          role !== "SUPER_ADMIN" && userClubId
            ? Number(userClubId)
            : clubs.length > 0
            ? clubs[0].id
            : "",
      });
      setSuccessMessage("Image added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add image: " + (err.message || "Unknown error"));
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      setSuccessMessage("Image deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image: " + (err.message || "Unknown error"));
    }
  };

  const displayGallery =
    role === "SUPER_ADMIN"
      ? gallery
      : gallery.filter((img) => img.club_id === Number(userClubId));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <div className="max-w-[900px] mx-auto px-6 py-24 text-center">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6efe6]">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-[#12202b] mb-8 text-center">
          Manage Gallery
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#12202b] mb-6">
            Add Gallery Image
          </h2>

          <form onSubmit={handleAddImage} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#12202b] mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12202b] mb-2">
                Image Description (Optional)
              </label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Add a description for this image"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#12202b] mb-2">
                {role === "SUPER_ADMIN" ? "Select Club *" : "Club"}
              </label>
              <select
                name="club_id"
                value={form.club_id}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                disabled={role !== "SUPER_ADMIN"}
                required
              >
                <option value="">-- Select a club --</option>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.club_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isAdding}
                className="bg-[#FFC107] text-[#12202b] px-6 py-2 rounded font-semibold hover:bg-[#b8894a] disabled:opacity-50 transition"
              >
                {isAdding ? "Adding..." : "Add Image"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#12202b] mb-6">
            Gallery Images ({displayGallery.length})
          </h2>

          {displayGallery.length === 0 ? (
            <p className="text-center text-[#7b6f61] py-8">
              No gallery images yet. Add one to get started!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGallery.map((image) => (
                <div
                  key={image.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={image.url}
                    alt={image.text || "Gallery image"}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80";
                    }}
                  />
                  <div className="p-4">
                    <p className="text-sm text-[#7b6f61] mb-2 font-semibold">
                      Club: {image.club?.club_name || "Unknown"}
                    </p>
                    {image.text && (
                      <p className="text-sm text-[#7b6f61] mb-3 line-clamp-2">
                        {image.text}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mb-3 truncate">
                      {image.url}
                    </p>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageGallery;
