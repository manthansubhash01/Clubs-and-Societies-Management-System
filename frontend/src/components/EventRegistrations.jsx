import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

const EventRegistrations = () => {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRegistrations() {
      try {
        setLoading(true);
        const data = await api.get(`/events/${id}/registrations`);
        setRegistrations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load registrations");
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Registrations</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>

        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan={3} className="border p-4 text-center text-gray-600">No registrations yet</td>
            </tr>
          ) : (
            registrations.map((r) => (
              <tr key={r.id || r._id}>
                <td className="border p-2">{r.name}</td>
                <td className="border p-2">{r.email}</td>
                <td className="border p-2">{r.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventRegistrations;
