"use client";
import { useUser } from "@/context/UserContext";
import TakeQuestButton from "./takeQuestButton";
import Link from "next/link";

interface QuestDetailProps {
  questId: number;
  pembuat_id: number;
}

export default function QuestDetail({ questId, pembuat_id }: QuestDetailProps) {
  const { loggedInUser } = useUser();

  return (
    <>
      {pembuat_id === loggedInUser?.id ? (
        <div className="flex gap-2 items-center">
              <Link
                href="/edit-permintaan"
                className="p-2 px-8 text-xl text-white bg-blue-400 text-center rounded-2xl"
              >
                Edit
              </Link>
              <div className="p-2 px-8 text-xl text-white bg-green-400 text-center rounded-2xl">
                Selesai
              </div>
        </div>
               
      ) : loggedInUser ? (
        <TakeQuestButton questId={questId} pembuat_id={pembuat_id}/>
      ) : (
        <></>
      )}
    </>
  );
}
