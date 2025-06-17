"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import TakeQuestButton from "./takeQuestButton";
import PenawarQuest from "./semuaPenawarSection";

interface QuestDetailProps {
  questId: number;
  pembuat_id: number;
}

export default function QuestDetail({ questId, pembuat_id }: QuestDetailProps) {
  const { loggedInUser } = useUser();

  return (
    <>
      {pembuat_id === loggedInUser?.id ? (
        <>
        <div className="flex flex-col gap-8">
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
