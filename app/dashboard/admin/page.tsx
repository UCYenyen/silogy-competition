"use client";
import { useEffect, useState } from "react";
import Logout from "../../../components/logoutButton";

interface Quest {
  quest_id: number;
  title: string;
  description: string;
  location: string;
  urgency_level: string;
  due_date: string | null;
  created_at: string;
  confirmation_status: string;
}

export default function AdminDashboard() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetchQuests = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/quests");
    const data = await res.json();
    setQuests(data.quests || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleAction = async (quest_id: number, action: "accepted" | "declined") => {
    setMessage(null);
    const res = await fetch("/api/admin/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quest_id, action }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Quest ${action}!`);
      fetchQuests();
    } else {
      setMessage(data.error || "Failed to update quest");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Quest Confirmations</h2>
      {message && <div className="mb-2">{message}</div>}
      <ul>
        {quests.map((q) => (
          <li key={q.quest_id} className="border p-4 my-4 rounded shadow">
            <div className="font-bold">{q.title}</div>
            <div>{q.description}</div>
            <div className="text-sm text-gray-600">Location: {q.location}</div>
            <div className="text-sm text-gray-600">Urgency: {q.urgency_level}</div>
            <div className="text-sm text-gray-600">Due: {q.due_date ? new Date(q.due_date).toLocaleDateString() : 'No due date'}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleAction(q.quest_id, "accepted")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(q.quest_id, "declined")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
      {quests.length === 0 && <div>No pending quests.</div>}
      <Logout />
    </div>
  );
}