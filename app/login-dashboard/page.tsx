"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logout from "../../components/logoutButton";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [quests, setQuests] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', location: '', urgency_level: '', due_date: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) {
        setCheckingRole(false);
        return;
      }
      const data = await res.json();
      setUser(data.user);

      // Check if user is staff/admin
      const staffRes = await fetch("/api/staff");
      if (staffRes.ok) {
        const staffList = await staffRes.json();
        const staff = staffList.find(
          (s: any) => s.user_id === data.user.user_id
        );
        if (staff) {
          if (staff.role && staff.role.role_name === "admin") {
            router.replace("/dashboard/admin");
            return;
          } else {
            router.replace("/dashboard/staff");
            return;
          }
        }
      }
      setCheckingRole(false);
    };
    fetchUserAndRole();
  }, [router]);

  useEffect(() => {
    if (user) fetchQuests();
    // eslint-disable-next-line
  }, [user]);

  const fetchQuests = async () => {
    const res = await fetch('/api/quests?userOnly=1');
    const data = await res.json();
    if (data.quests) {
      setQuests(data.quests);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch('/api/quests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Quest created!');
      setShowModal(false);
      setForm({ title: '', description: '', location: '', urgency_level: '', due_date: '' });
      fetchQuests();
    } else {
      setMessage(data.error || 'Failed to create quest');
    }
  };

  if (checkingRole) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in. Please <a href="/login">login</a>.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Buat Quest
        </button>
      </div>
      <div className="mb-4">
        <div className="font-semibold">Nama: {user.name}</div>
        <div className="font-semibold">Email: {user.email}</div>
        <div className="font-semibold">Telepon: {user.phone_number}</div>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-2">Quest Anda</h2>
      <ul>
        {quests.length === 0 && <li className="text-gray-500">Belum ada quest.</li>}
        {quests.map(q => (
          <li key={q.quest_id} className="border p-3 my-2 rounded flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold">{q.title}</div>
              <div className="text-gray-600 text-sm">{q.description}</div>
              <div className="text-gray-500 text-xs">Lokasi: {q.location}</div>
              <div className="text-gray-500 text-xs">Urgensi: {q.urgency_level}</div>
              <div className="text-gray-500 text-xs">Status: {q.status} | Konfirmasi: {q.confirmation_status}</div>
              <div className="text-gray-500 text-xs">Jatuh tempo: {q.due_date ? new Date(q.due_date).toLocaleDateString() : 'Tidak ada'}</div>
            </div>
          </li>
        ))}
      </ul>
      <Logout />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg flex flex-col gap-2 min-w-[300px]">
            <h2 className="text-xl mb-2">Buat Quest</h2>
            <input name="title" placeholder="Judul" value={form.title} onChange={handleChange} required className="border p-1" />
            <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} required className="border p-1" />
            <input name="location" placeholder="Lokasi" value={form.location} onChange={handleChange} required className="border p-1" />
            <select name="urgency_level" value={form.urgency_level} onChange={handleChange} required className="border p-1">
              <option value="">Pilih Urgensi</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            <input name="due_date" type="date" value={form.due_date} onChange={handleChange} className="border p-1" />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="border p-2 rounded bg-blue-500 text-white">Submit</button>
              <button type="button" onClick={() => setShowModal(false)} className="border p-2 rounded">Cancel</button>
            </div>
            {message && <div>{message}</div>}
          </form>
        </div>
      )}
    </div>
  );
}