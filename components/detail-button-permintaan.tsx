"use client";
import { useUser } from "@/context/UserContext";
import TakeQuestButton from "./takeQuestButton";
import Link from "next/link";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";

interface QuestDetailProps {
  questId: number;
  pembuat_id: number;
}

export default function QuestDetail({ questId, pembuat_id }: QuestDetailProps) {
  const { loggedInUser } = useUser();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data, error } = await supabase
        .from("permintaan")
        .select("status_permintaan")
        .eq("id", questId)
        .single();
      if (!error && data) {
        setStatus(data.status_permintaan);
      }
    };
    fetchStatus();
  }, [questId]);

  if (status === "selesai") {
    return (
      <div className="text-gray-500 font-semibold">
        Permintaan sudah selesai.
      </div>
    );
  }

  return (
    <>
      {pembuat_id === loggedInUser?.id ? (
        <div className="flex gap-2 items-center">
          <Link
            href={`/edit-permintaan?quest_id=${questId}`}
            className="p-2 px-8 text-xl text-white bg-blue-400 text-center rounded-2xl"
          >
            Edit
          </Link>
          <button
            className="p-2 px-8 text-xl text-white bg-green-400 text-center rounded-2xl"
            onClick={async () => {
              await supabase
                .from("permintaan")
                .update({ status_permintaan: "selesai" })
                .eq("id", questId);
              setStatus("selesai");
              // Optional: refresh page or show notification
            }}
          >
            Selesai
          </button>
        </div>
      ) : loggedInUser ? (
        <TakeQuestButton questId={questId} pembuat_id={pembuat_id} />
      ) : (
        <></>
      )}
    </>
  );
}
