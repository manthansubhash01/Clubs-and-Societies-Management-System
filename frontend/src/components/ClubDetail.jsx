import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import useLoader from "../hooks/useLoader";

export default function ClubDetail() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showLoader = useLoader(loading, 800);

  useEffect(() => {
    let mounted = true;
    const fetchClub = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/clubs");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const found = data.find((c) => String(c.id) === String(id));
        if (mounted) setClub(found || null);
      } catch (err) {
        if (mounted) setError("Unable to load club");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchClub();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (showLoader) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <LoadingScreen message="Loading club details" />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );

  if (!club)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg font-semibold mb-2">Club not found</div>
        <Link to="/clubs" className="text-[var(--accent)]">
          Back to clubs
        </Link>
      </div>
    );

  return (
    <div>
      <div className="min-h-screen bg-[var(--beige)] pb-16">
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[60vh] rounded-b-[40px] overflow-hidden shadow-xl"
          >
            <img
              src={club.poster_image || "https://picsum.photos/1400"}
              alt={club.club_name}
              className="w-full h-full object-cover scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--beige)]/90 via-black/40 to-black/10"></div>

            <div className="absolute bottom-12 left-10">
              <div>
                <h1 className="text-6xl font-black text-white leading-[1.05] drop-shadow-xl">
                  {club.club_name}
                </h1>
                <p className="text-white/70 mt-3 text-lg font-light">
                  {club.type} · {club.membersCount ?? 0} members
                </p>
              </div>
            </div>

            {/* Modern overlapping logo */}
            {club.logo_image && (
              <div className="absolute bottom-12 right-10 w-40 h-40 rounded-full bg-white shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden z-10">
                <img
                  src={club.logo_image}
                  alt={`${club.club_name} logo`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 backdrop-blur-xl bg-white/20 text-white font-semibold px-6 py-3 rounded-full shadow-xl"
          >
            FEATURED CLUB
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-black/5">
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {club.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-black/5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                <div className="px-4 py-1 rounded-full text-sm font-medium bg-[var(--accent)]/15 text-[var(--accent)]">
                  Soon
                </div>
              </div>
              <p className="mt-3 text-gray-600">
                No upcoming events yet. Stay tuned.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-black/5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Core Members</h3>
                <div className="px-4 py-1 rounded-full text-sm font-medium bg-[var(--accent)]/15 text-[var(--accent)]">
                  Team
                </div>
              </div>
              <p className="mt-3 text-gray-600">
                Member list will appear here.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/clubs"
              className="inline-block px-6 py-3 rounded-full bg-black text-white hover:bg-black/80 transition"
            >
              ← Back to Clubs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
