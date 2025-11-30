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
        if (mounted) setClubs(Array.isArray(data) ? data : []);
      } catch (err) {
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
            Discover communities, events and students driving campus life. Browse and learn about student-run clubs across disciplines.
          </p>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-2 text-[#12202b]">
                About Clubs
              </h2>
              <p className="text-sm text-[#7b6f61] leading-relaxed">
                Browse and learn about student-run clubs across disciplines. Each club page includes its description, events and contact info.
              </p>
              <div className="mt-4">
                <button className="px-6 py-2.5 bg-[#b8894a] text-white rounded-md font-semibold hover:bg-[#12202b] transition-all">
                  Apply / Learn
                </button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2">
            {error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : clubs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No clubs found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clubs.map((c) => (
                  <article
                    key={c.id}
                    className="rounded-lg shadow-lg bg-white overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 bg-[#FFC107] rounded-md flex items-center justify-center text-xl font-bold text-[#12202b]">
                          {c.club_name ? c.club_name.charAt(0) : "?"}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#12202b]">
                            {c.club_name}
                          </h3>
                          <p className="mt-2 text-sm text-[#7b6f61] leading-relaxed">
                            {c.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-[#7b6f61]">
                              {c.type ?? "N/A"} · {c.membersCount ?? 0} members
                            </div>
                            <Link
                              to={`/clubs/${c.id}`}
                              className="text-[#b8894a] text-sm font-semibold hover:text-[#12202b] transition-colors"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
