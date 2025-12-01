import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import useLoader from "../hooks/useLoader";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showLoader = useLoader(loading, 800);

  useEffect(() => {
    let mounted = true;

    const fetchClubs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/clubs");
        if (!res.ok) throw new Error("Failed to fetch clubs");
        const data = await res.json();
        console.log("Fetched clubs from backend:", data);
        if (mounted) setClubs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching clubs:", err);
        if (mounted) setError("Could not load clubs");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchClubs();
    return () => {
      mounted = false;
    };
  }, []);

  if (showLoader) {
    return (
      <div className="min-h-screen bg-[#f3e6d9]">
        <Navbar />
        <LoadingScreen message="Loading clubs and communities" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3e6d9]">
      <Navbar />

      <section className="relative pt-32 pb-16 bg-[#f6efe6]">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="font-['Playfair_Display'] text-6xl text-[#12202b] mb-6 text-center">
            Explore Campus Clubs
          </h1>
          <p className="text-center text-[#7b6f61] text-xl max-w-3xl mx-auto">
            Discover communities, events and students driving campus life.
            Browse and learn about student-run clubs across disciplines.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : clubs.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No clubs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clubs.map((c) => (
              <article
                key={c.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center p-6 group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-4 border-2 border-[#b8894a]">
                  {c.logo_image ? (
                    <img
                      src={c.logo_image}
                      alt={c.club_name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-[#b8894a]">
                      {c.club_name ? c.club_name.charAt(0) : "?"}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#12202b] text-center mb-2 group-hover:text-[#b8894a] transition-colors">
                  {c.club_name}
                </h3>
                <p className="text-sm text-[#7b6f61] text-center line-clamp-3 mb-4">
                  {c.description}
                </p>
                <div className="flex-1" />
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-xs text-[#7b6f61]">
                    {c.type ?? "N/A"} · {c.membersCount ?? 0} members
                  </span>
                  <Link
                    to={`/clubs/${c.id}`}
                    className="ml-auto px-4 py-1 bg-[#b8894a] text-white rounded-full text-xs font-semibold hover:bg-[#12202b] transition"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
