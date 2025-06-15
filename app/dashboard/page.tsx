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
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndRedirect = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) {
        setCheckingAdmin(false);
        return;
      }
      const data = await res.json();
      setUser(data.user);

      // Check if user is staff and admin
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
      setCheckingAdmin(false);
    };
    fetchUserAndRedirect();
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

  if (checkingAdmin) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in. Please <a href="/login">login</a>.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>User ID: {user.user_id}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Phone: {user.phone_number}</div>
      <button onClick={() => setShowModal(true)} className="border p-2 m-5 border-2 rounded ">
        Create Quest
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg flex flex-col gap-2 min-w-[300px]">
            <h2 className="text-xl mb-2">Create Quest</h2>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="border p-1" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-1" />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="border p-1" />
            <select name="urgency_level" value={form.urgency_level} onChange={handleChange} required>
              <option value="">Select Urgency</option>
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
      <h2 className="text-lg mt-6 mb-2">Your Quests</h2>
      <ul>
        {quests.map(q => (
          <li key={q.quest_id} className="border p-2 my-2 rounded">
            <strong>{q.title}</strong> - {q.confirmation_status} <br />
            {q.description}
          </li>
        ))}
      </ul>
      <Logout />
    </div>
  );
}