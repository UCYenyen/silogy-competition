import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import QuestCard from "./quest-card";

gsap.registerPlugin(ScrollTrigger);

export default function QuestSection() {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    tipeKebutuhan: "",
    lokasi: "",
    tingkatKedaruratan: "",
    upah: "",
  });

  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/quests");
        if (!res.ok) {
          throw new Error("Failed to fetch quests");
        }
        const data = await res.json();
        setQuests(data.quests || []);
      } catch (err) {
        setQuests([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  // Jalankan animasi setiap kali quests berubah
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
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

  const dropdownData = {
    tipeKebutuhan: [
      "Pembersihan Lingkungan",
      "Perbaikan Infrastruktur",
      "Bantuan Sosial",
      "Gotong Royong",
      "Keamanan Lingkungan",
      "Kegiatan Komunitas",
    ],
    lokasi: [
      "Surabaya Pusat",
      "Surabaya Utara",
      "Surabaya Selatan",
      "Surabaya Timur",
      "Surabaya Barat",
      "Semua Wilayah",
    ],
    tingkatKedaruratan: [
      "Sangat Mendesak",
      "Mendesak",
      "Normal",
      "Tidak Mendesak",
    ],
    upah: [
      "Gratis (Volunteer)",
      "< Rp 50.000",
      "Rp 50.000 - Rp 100.000",
      "Rp 100.000 - Rp 200.000",
      "> Rp 200.000",
    ],
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const selectOption = (filterType: string, option: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: option,
    }));
    setActiveDropdown(null);
  };

  const getDisplayText = (filterType: string, defaultText: string) => {
    const selected =
      selectedFilters[filterType as keyof typeof selectedFilters];
    return selected || defaultText;
  };
  return (
    <section className="min-h-screen gap-8 flex p-12 xl:pt-48 xl:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED]">
      <div className="reveal mt-24 w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
      <div className="flex items-center justify-center gap-4 mb-8">
        <h1 className="reveal text-[#322C2C] font-bold text-5xl text-center m-0">
          Semua Permintaan
        </h1>
        <button
          onClick={() => (window.location.href = "/buat-permintaan")}
          className="reveal bg-blue-500 hover:bg-blue-600 text-white text-base rounded-md px-4 py-2"
          type="button"
        >
          Buat Permintaan
        </button>
      </div>
      <div className="reveal flex flex-col gap-8 p-4 rounded-lg shadow-lg justify-start items-center bg-[#CDEBF3] w-full">
        <div className="flex flex-col w-full items-center gap-8">
          <div className="flex flex-col w-full items-center gap-4">
            <div className="relative w-full flex justify-center">
              <input
                type="text"
                placeholder="Cari"
                className="w-full rounded-full py-2 px-8 pr-18 text-2xl font-semibold text-[#5A5A5A] bg-white shadow focus:outline-none"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl text-[#5A5A5A]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M20 20l-3.5-3.5"
                  />
                </svg>
              </span>
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col md:flex-row w-full gap-2 mt-4 bg-[#F8FAFA] relative">
              {/* Tipe Kebutuhan Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => toggleDropdown("tipeKebutuhan")}
                  className="w-full bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow hover:bg-gray-50"
                >
                  {getDisplayText("tipeKebutuhan", "Tipe kebutuhan")}
                  <span
                    className={`text-base transition-transform ${
                      activeDropdown === "tipeKebutuhan" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {activeDropdown === "tipeKebutuhan" && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {dropdownData.tipeKebutuhan.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectOption("tipeKebutuhan", option)}
                        className="w-full p-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Lokasi Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => toggleDropdown("lokasi")}
                  className="w-full bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow hover:bg-gray-50"
                >
                  {getDisplayText("lokasi", "Lokasi")}
                  <span
                    className={`text-base transition-transform ${
                      activeDropdown === "lokasi" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {activeDropdown === "lokasi" && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {dropdownData.lokasi.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectOption("lokasi", option)}
                        className="w-full p-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tingkat Kedaruratan Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => toggleDropdown("tingkatKedaruratan")}
                  className="w-full bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow hover:bg-gray-50"
                >
                  {getDisplayText("tingkatKedaruratan", "Tingkat Kedaruratan")}
                  <span
                    className={`text-base transition-transform ${
                      activeDropdown === "tingkatKedaruratan"
                        ? "rotate-180"
                        : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {activeDropdown === "tingkatKedaruratan" && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {dropdownData.tingkatKedaruratan.map((option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          selectOption("tingkatKedaruratan", option)
                        }
                        className="w-full p-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Upah Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => toggleDropdown("upah")}
                  className="w-full bg-white p-4 font-bold text-lg flex items-center justify-between gap-2 shadow hover:bg-gray-50"
                >
                  {getDisplayText("upah", "Upah")}
                  <span
                    className={`text-base transition-transform ${
                      activeDropdown === "upah" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {activeDropdown === "upah" && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {dropdownData.upah.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectOption("upah", option)}
                        className="w-full p-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid pb-48 grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading quests...
          </div>
        ) : quests.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Belum ada permintaan bantuan.
          </div>
        ) : (
          quests.map((quest) => (
            <Link
              key={quest.quest_id}
              href={`/permintaan/${quest.quest_id}`}
              className="block"
              style={{ textDecoration: "none" }}
            >
              <QuestCard
                title={quest.title}
                location={quest.location}
                urgency={quest.urgency_level}
                imageUrl={quest.imageUrl}
              />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}