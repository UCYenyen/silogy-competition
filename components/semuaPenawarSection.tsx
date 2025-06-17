'use client'
import { IPermintaan } from "@/types/permintaan.md";
import { useEffect, useState } from "react";
import PenawarCard from "./penawarQuest";
import supabase from "@/lib/db";

interface semuaPenawarSectionProps {
  id_quest: number;
}

interface PenawarWithUser extends IPermintaan {
  calon_penerima_id: number;
  users: {
    username: string;
  } | null;
}

export default function SemuaPenawarSectionProps({
  id_quest,
}: semuaPenawarSectionProps) {
  const [permintaan, setPermintaan] = useState<PenawarWithUser[]>([]);
  const [statusPermintaan, setStatusPermintaan] = useState<string | null>(null);

  useEffect(() => {
    const fetchPenawar = async () => {
      // Fetch status_permimtaan from permintaan table
      const { data: permintaanData, error: permintaanError } = await supabase
        .from("permintaan")
        .select("status_permimtaan")
        .eq("id", id_quest)
        .single();

      if (!permintaanError && permintaanData) {
        setStatusPermintaan(permintaanData.status_permimtaan);
      }

      // Fetch penawar only if status is not "sedang dikerjakan"
      if (permintaanData?.status_permimtaan !== "sedang dikerjakan") {
        const { data, error } = await supabase
          .from("users_permintaan")
          .select(`
            *,
            users:calon_penerima_id (
              username
            )
          `)
          .eq("permintaan_id", id_quest)
          .eq("status_penerimaan", "Menunggu Konfirmasi");

        if (!error && data) {
          setPermintaan(data);
        }
      } else {
        setPermintaan([]); // Clear penawar if status is "sedang dikerjakan"
      }
    };

    fetchPenawar();
  }, [id_quest]);

  // If status is "sedang dikerjakan", don't render anything
  if (statusPermintaan === "Sedang Dikerjakan") {
    return null;
  }

  return (
    <>
      {permintaan.map((quest) => (
        <div
          key={quest.id}
          className="block w-full h-full cursor-pointer"
        >
          <PenawarCard
            penerima_id={quest.calon_penerima_id || 0}
            nama_penawar={quest.users?.username || "Unknown"}
            deskripsi_penawar={quest.deskripsi_permintaan}
          />
        </div>
      ))}
    </>
  );
}
