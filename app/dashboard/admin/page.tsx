"use client";
import { notFound } from "next/navigation";
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
}

export default function AdminQuestConfirmation({ params }: { params: { id: string } }) {
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

export async function QuestDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/quests/${params.id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const { quest } = await res.json();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{quest.title}</h1>
      <div className="mb-2">Deskripsi: {quest.description}</div>
      <div className="mb-2">Lokasi: {quest.location}</div>
      <div className="mb-2">Urgensi: {quest.urgency_level}</div>
      <div className="mb-2">Status: {quest.status}</div>
      <div className="mb-2">Konfirmasi: {quest.confirmation_status}</div>
      <div className="mb-2">Deadline: {quest.due_date ? new Date(quest.due_date).toLocaleDateString() : 'No due date'}</div>
    </div>
  );
}