import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ClubDetail() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchClub = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/clubs");
        if (!res.ok) throw new Error("Failed to fetch clubs");
        const data = await res.json();
        const found = data.find((c) => String(c.id) === String(id));
        if (mounted) setClub(found || null);
      } catch (err) {
        console.error(err);
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

  if (loading)
    return <div className="p-8 text-center text-gray-600">Loading club…</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!club)
    return (
      <div className="p-8 text-center">
        <div className="text-lg font-semibold mb-2">Club not found</div>
        <Link to="/clubs" className="text-[var(--accent)]">
          Back to clubs
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--beige)" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{club.club_name}</h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            {club.type} · {club.membersCount ?? 0} members
          </p>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">About</h2>
          <p className="text-gray-700">{club.description}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Upcoming Events</h3>
            <p className="text-sm text-gray-600">
              No events yet. Events will be shown here.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Core Members</h3>
            <p className="text-sm text-gray-600">
              Member listing and roles will appear here.
            </p>
          </div>
        </section>

        <div className="mt-6">
          <Link to="/clubs" className="text-[var(--accent)]">
            ← Back to Clubs
          </Link>
        </div>
      </div>
    </div>
  );
}
