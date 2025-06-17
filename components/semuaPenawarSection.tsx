'use client'
import { IPermintaan } from "@/types/permintaan.md";
import { useEffect, useState } from "react";
import PenawarCard from "./penawarQuest";
import supabase from "@/lib/db";

interface semuaPenawarSectionProps {
  id_quest: number;
}

export default function semuaPenawarSectionProps({
  id_quest,
}: semuaPenawarSectionProps) {
    const [permintaan, setPermintaan] = useState<IPermintaan[]>([]);

    // Fetch data when component mounts or id_quest changes
    useEffect(() => {
      const fetchPenawar = async () => {
        const { data, error } = await supabase
          .from("users_permintaan")
          .select(`*`)
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
            nama_penawar={quest.nama_permintaan}
            deskripsi_penawar={quest.deskripsi_permintaan}
          />
        </div>
      ))}
    </>
  );
}
