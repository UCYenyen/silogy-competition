"use client";
import { useEffect, useState } from "react";

interface Quest {
  quest_id: number;
  title: string;
  description: string;
  location: string;
  urgency_level: string;
  due_date: string | null;
  created_at: string;
  status: string;
}

export default function StaffDashboard() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetchQuests = async () => {
    setLoading(true);
    const res = await fetch("/api/staff/quests");
    const data = await res.json();
    setQuests(data.quests || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleTakeQuest = async (quest_id: number) => {
    setMessage(null);
    const res = await fetch("/api/staff/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quest_id }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Quest taken!");
      fetchQuests();
    } else {
      setMessage(data.error || "Failed to take quest");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Approved Quests</h2>
      {message && <div className="mb-2">{message}</div>}
      <ul>
        {quests.map((q) => (
          <li key={q.quest_id} className="border p-4 my-4 rounded shadow">
            <div className="font-bold">{q.title}</div>
            <div>{q.description}</div>
            <div className="text-sm text-gray-600">Location: {q.location}</div>
            <div className="text-sm text-gray-600">Urgency: {q.urgency_level}</div>
            <div className="text-sm text-gray-600">Due: {q.due_date ? new Date(q.due_date).toLocaleDateString() : 'No due date'}</div>
            <div className="text-sm text-gray-600">Status: {q.status}</div>
            <button
              onClick={() => handleTakeQuest(q.quest_id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              disabled={q.status === "Ongoing"}
            >
              {q.status === "Ongoing" ? "Already Taken" : "Take Quest"}
            </button>
          </li>
        ))}
      </ul>
      {quests.length === 0 && <div>No available quests.</div>}
    </div>
  );
}