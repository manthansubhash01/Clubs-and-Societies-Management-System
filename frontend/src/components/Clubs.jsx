import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchClubs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/clubs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (mounted) setClubs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--beige)" }}>
      {/* Hero */}
      <section
        className="relative h-72 md:h-96 flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.12), rgba(10,10,10,0.12)), url(/hero-placeholder.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(12,8,6,0.15)]"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow">
              Explore Campus Clubs
            </h1>
            <p className="mt-3 text-lg opacity-90">
              Discover communities, events and students driving campus life.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <aside className="lg:col-span-1">
            <div className="card-cream p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">About Clubs</h2>
              <p className="text-sm text-[var(--muted)]">
                Browse and learn about student-run clubs across disciplines.
                Each club page includes description, events and contact info.
              </p>
              <div className="mt-4">
                <button className="inline-block px-4 py-2 bg-[var(--accent)] text-white rounded-md">
                  Apply / Learn
                </button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12 text-gray-600">
                Loading clubs…
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">{error}</div>
            ) : clubs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No clubs found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {clubs.map((c) => (
                  <article
                    key={c.id}
                    className="rounded-lg shadow card-cream overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 bg-white rounded-md flex items-center justify-center text-xl font-semibold text-[var(--accent)] border border-transparent">
                          {c.club_name ? c.club_name.charAt(0) : "?"}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">
                            {c.club_name}
                          </h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {c.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-gray-600">
                              {c.type ?? "N/A"} · {c.membersCount ?? 0} members
                            </div>
                            <Link
                              to={`/clubs/${c.id}`}
                              className="text-[var(--accent)] text-sm font-medium"
                            >
                              View
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
    </div>
  );
}
