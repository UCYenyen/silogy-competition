import { notFound } from "next/navigation";
import Navbar from "@/components/no-animation-navbar";
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function PermintaanDetailPage({ params }: { params: { id: string } }) {
  // Fetch quest detail dari API atau database
  const res = await fetch(`${baseUrl}/api/quests/${params.id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const { quest } = await res.json();

  return (
    <div>
        <Navbar />      
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{quest.title}</h1>
      <div className="mb-2">Deskripsi: {quest.description}</div>
      <div className="mb-2">Lokasi: {quest.location}</div>
      <div className="mb-2">Urgensi: {quest.urgency_level}</div>
      <div className="mb-2">Status: {quest.status}</div>
      <div className="mb-2">Konfirmasi: {quest.confirmation_status}</div>
    </div>
    </div>
  );
}