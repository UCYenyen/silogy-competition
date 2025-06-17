"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import TakeQuestButton from "./takeQuestButton";
import PenawarQuest from "./semuaPenawarSection";

interface QuestDetailProps {
  questId: number;
  pembuat_id: number;
}

export default function questDetail({ questId, pembuat_id }: QuestDetailProps) {
  const { loggedInUser } = useUser();

  return (
    <>
      {pembuat_id === loggedInUser?.id ? (
        <>
          <div className="flex gap-4">
            <Link
              href="/edit-permintaan"
              className="p-2 px-8 text-2xl text-white bg-blue-400 text-center rounded-2xl"
            >
              Edit
            </Link>
            <div className="p-2 px-8 text-2xl text-white bg-green-400 text-center rounded-2xl">
              Selesai
            </div>
            <PenawarQuest id_quest={questId} />
          </div>
        </>
      ) : loggedInUser ? (
        <TakeQuestButton questId={questId} pembuat_id={loggedInUser.id} />
      ) : (
        <TakeQuestButton questId={questId} pembuat_id={0} />
      )}
    </>
  );
}
