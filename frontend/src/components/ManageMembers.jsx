import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../lib/api';

const allowedRoles = ['SUPER_ADMIN', 'PRESIDENT', 'VICE_PRESIDENT'];

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'MEMBER', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  if (!allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-[#f6efe6]">
        <Navbar />
        <div className="max-w-[900px] mx-auto px-6 py-24 text-center text-red-600">You are not authorized to view this page.</div>
        <Footer />
      </div>
    );
  }



  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await api.get('/members');
      setMembers(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      const club_id = localStorage.getItem('club_id') || undefined;
      const payload = { ...form, club_id };
      await api.post('/members', payload);
      setForm({ name: '', email: '', phone: '', role: 'MEMBER', password: '' });
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert('Failed to create member: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this member?')) return;
    try {
      await api.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete member');
    }
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setForm({ name: m.name || '', email: m.email || '', phone: m.phone || '', role: m.role || 'MEMBER', password: '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', phone: '', role: 'MEMBER', password: '' });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      await api.put(`/members/${editingId}`, payload);
      cancelEdit();
      fetchMembers();
    } catch (err) {
      console.error(err);
      alert('Failed to update member: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6efe6] pt-24">
      <Navbar />
      <main className="max-w-[1000px] mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-4">Manage Members</h1>

        <section className="mb-8">
          <h2 className="font-semibold">Create New Member</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="p-2 border rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="p-2 border rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
            <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded">
              <option value="MEMBER">MEMBER</option>
              <option value="PRESIDENT">PRESIDENT</option>
              <option value="VICE_PRESIDENT">VICE_PRESIDENT</option>
              {role === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">SUPER_ADMIN</option>}
            </select>
            <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="p-2 border rounded col-span-2 md:col-span-1" />
            <div className="col-span-2">
              <button className="bg-[#12202b] text-white px-4 py-2 rounded">Create</button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-semibold mb-3">Members</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow p-3">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Club</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className="border-t">
                      <td className="p-2">{m.name}</td>
                      <td className="p-2">{m.email}</td>
                      <td className="p-2">{m.phone}</td>
                      <td className="p-2">{m.role}</td>
                      <td className="p-2">{m.club_id}</td>
                      <td className="p-2">
                        <button onClick={() => startEdit(m)} className="mr-2 text-sm text-blue-600">Edit</button>
                        <button onClick={() => handleDelete(m.id)} className="text-sm text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {editingId && (
          <section className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Edit Member</h3>
            <form onSubmit={submitEdit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="p-2 border rounded" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="p-2 border rounded" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
              <select name="role" value={form.role} onChange={handleChange} className="p-2 border rounded">
                <option value="MEMBER">MEMBER</option>
                <option value="PRESIDENT">PRESIDENT</option>
                <option value="VICE_PRESIDENT">VICE_PRESIDENT</option>
                {role === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">SUPER_ADMIN</option>}
              </select>
              <input name="password" value={form.password} onChange={handleChange} placeholder="Password (leave blank to keep)" type="password" className="p-2 border rounded col-span-2 md:col-span-1" />
              <div className="col-span-2">
                <button className="bg-[#12202b] text-white px-4 py-2 rounded mr-2">Save</button>
                <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">Cancel</button>
              </div>
            </form>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ManageMembers;
