import { notFound } from "next/navigation";
import Navbar from "@/components/no-animation-navbar";
import supabase from "@/lib/db";
import QuestDetail from "@/components/quest-page-details";
import DetailButtonPermintaan from "@/components/detail-button-permintaan";


export default async function PermintaanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params object
  const { id } = await params;

  // Fetch specific permintaan data by id
  const { data: quest, error } = await supabase
    .from("permintaan")
    .select(`*`)
    .eq("id", id)
    .single();

  const { data: pembuat } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", quest?.pembuat_id)
    .single();

  if (!quest || error) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="min-w-screen min-h-screen max-w-screen mx-auto p-8">
        <div className="flex flex-col gap-8 p-12 rounded-lg justify-start items-center w-full"></div>

        <h1 className="text-3xl font-bold mb-4">Detail Permintaan</h1>

        <div className="flex flex-col gap-8 p-12 rounded-lg shadow-lg justify-start items-start bg-[#CDEBF3] w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-4 md:flex-row gap-2 md:items-center justify-between w-full">
            <h1 className="text-3xl font-bold mb-4">{quest.nama_permintaan}</h1>
              <DetailButtonPermintaan
                questId={quest.id}
                pembuat_id={pembuat.id}
              />
            </div>
            <div className="mb-2">
              Tingkat kedaruratan:{" "}
              <span className="font-bold">{quest.tingkat_kedaruratan}</span>
            </div>
            <div className="mb-2">
              Upah:{" "}
              <span className="font-bold">Rp.{quest.upah_permintaan}</span>
            </div>
            <div className="mb-2">Lokasi: {quest.lokasi_permintaan}</div>
            <div className="mb-2">
              Deskripsi: <br className="mb-4"></br>
              {quest.deskripsi_permintaan}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold mb-4">Kontak</h2>
            <div className="mb-2">Nama: {pembuat.username}</div>
            <div className="mb-2">No. Telepon: {pembuat.no_telpon}</div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <QuestDetail questId={quest.id} pembuat_id={pembuat.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
