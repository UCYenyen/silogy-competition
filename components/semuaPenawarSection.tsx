'use client'
import { IPermintaan } from "@/types/permintaan.md";
import { useEffect, useState } from "react";
import PenawarCard from "./penawarQuest";
import supabase from "@/lib/db";

interface semuaPenawarSectionProps {
  id_quest: number;
}

interface PenawarWithUser extends IPermintaan {
  users: {
    username: string;
  } | null;
}

export default function SemuaPenawarSectionProps({
  id_quest,
}: semuaPenawarSectionProps) {
  const [permintaan, setPermintaan] = useState<PenawarWithUser[]>([]);

  useEffect(() => {
    const fetchPenawar = async () => {
      const { data, error } = await supabase
        .from("users_permintaan")
        .select(`
          *,
          users:calon_penerima_id (
            username
          )
        `)
        .eq("permintaan_id", id_quest);

      if (!error && data) {
        setPermintaan(data);
      }
    };

    fetchPenawar();
  }, [id_quest]);

  return (
    <>
      {permintaan.map((quest) => (
        <div
          key={quest.id}
          className="block w-full h-full cursor-pointer"
        >
          <PenawarCard
            nama_penawar={quest.users?.username || "Unknown"}
            deskripsi_penawar={quest.deskripsi_permintaan}
          />
        </div>
      ))}
    </>
  );
}
