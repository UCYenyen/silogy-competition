import { notFound } from "next/navigation";
import Navbar from "@/components/no-animation-navbar";
import supabase from "@/lib/db";

export default async function PermintaanDetailPage({ params }: { params: { id: string } }) {
  // Fetch specific permintaan data by id
  const { data: quest, error } = await supabase
    .from("permintaan")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!quest || error) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{quest.nama_permintaan}</h1>
        <div className="mb-2">Deskripsi: {quest.deskripsi_permintaan}</div>
        <div className="mb-2">Lokasi: {quest.lokasi_permintaan}</div>
        <div className="mb-2">Urgensi: {quest.tingkat_kedaruratan}</div>
        <div className="mb-2">Upah: {quest.upah_permintaan}</div>
      </div>
    </div>
  );
}