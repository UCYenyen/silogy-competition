import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import QuestCard from "./quest-card";
import LoadingOverlay from "@/components/loading-overlay";
import supabase from "@/lib/db";
import { IPermintaan } from "@/types/permintaan.md";

gsap.registerPlugin(ScrollTrigger);

export default function QuestSection() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false); // State for buffer animation
  const [quests, setQuests] = useState<IPermintaan[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      const { data: permintaan, error } = await supabase
        .from("permintaan")
        .select("*");
      if (!error && permintaan) {
        setQuests(permintaan as IPermintaan[]);
      } else {
        setQuests([]);
      }
      setLoading(false);
    };
    fetchQuests();
  }, []);

  // GSAP animation for reveal elements
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [quests]);

  const handleQuestClick = (id: number) => {
    setIsNavigating(true); // Show loading animation
    setTimeout(() => {
      router.push(`/permintaan/${id}`); // Navigate to the quest detail page
    }, 1000); // Add a slight delay for the animation
  };

  return (
    <section className="min-h-screen gap-8 flex p-12 xl:pt-48 xl:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED]">
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isNavigating} />

      <div className="reveal mt-24 w-50 z-50 h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <h1 className="reveal text-[#322C2C] font-bold text-5xl text-center m-0">
          Semua Permintaan
        </h1>
        <button
          onClick={() => (window.location.href = "/form-minta-bantuan")}
          className="reveal bg-blue-500 hover:bg-blue-600 text-white text-base rounded-md px-4 py-2"
          type="button"
        >
          Buat Permintaan
        </button>
      </div>
      <div className="grid pb-48 grid-cols-1 gap-4 md:gap-12 w-full">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading permintaan...
          </div>
        ) : quests.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Belum ada permintaan bantuan.
          </div>
        ) : (
          quests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => handleQuestClick(quest.id)} // Handle click
              className="block w-full h-full cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              <QuestCard
                id={quest.id}
                nama_permintaan={quest.nama_permintaan}
                lokasi_permintaan={quest.lokasi_permintaan}
                tingkat_kedaruratan={quest.tingkat_kedaruratan}
                upah={quest.upah_permintaan}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
