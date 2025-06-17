"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import supabase from "@/lib/db";
import { IPermintaan } from "@/types/permintaan.md";
import { IUserPermintaan } from "@/types/users_permintaan.md";
import QuestCard from "@/components/questYangDitawar";
import LoadingOverlay from "@/components/loading-overlay";
import { useUser } from "@/context/UserContext";

export default function UserDashboardPage() {
  const {loggedInUser} = useUser();
  const [permintaan, setPermintaan] = useState<IPermintaan[]>([]);
  const [takenQuests, setTakenQuests] = useState<IUserPermintaan[]>([]);
  const [loading, setLoading] = useState(true);
  const [takenQuestsLoading, setTakenQuestsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const fetchUserPermintaan = async () => {
      if (!loggedInUser?.id) return;
      
      setLoading(true);
      const { data: permintaan, error } = await supabase
        .from('permintaan')
        .select('*')
        .eq('pembuat_id', loggedInUser.id);
      
      if (!error && permintaan) {
        setPermintaan(permintaan as IPermintaan[]);
      } else {
        setPermintaan([]);
        console.error('Error fetching user permintaan:', error);
      }
      setLoading(false);
    };

    fetchUserPermintaan();
  }, [loggedInUser]); 

  
  useEffect(() => {
    const fetchTakenQuests = async () => {
      if (!loggedInUser?.id) return;
      
      setTakenQuestsLoading(true);
      
      
      const { data: users_permintaan, error } = await supabase
        .from('users_permintaan')
        .select('*')
        .eq('calon_penerima_id', loggedInUser.id);
      
      if (!error && users_permintaan) {
        
        const permintaanIds = users_permintaan.map((up: IUserPermintaan) => up.permintaan_id);
        
        if (permintaanIds.length > 0) {
          const { data: takenPermintaan, error: permintaanError } = await supabase
            .from('permintaan')
            .select('*')
            .in('id', permintaanIds);
          
          if (!permintaanError && takenPermintaan) {
            setTakenQuests(takenPermintaan as IUserPermintaan[]);
          }
        }
      } else {
        console.error('Error fetching taken quests:', error);
      }
      setTakenQuestsLoading(false);
    };

    fetchTakenQuests();
  }, [loggedInUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ini blm pasti tpi nek mau bisa buat ngitung user e ada brp quest and ngambil brp gitu

  return (
    <div className="bg-[#EDEDED] min-h-screen">
      <Navbar/>
      <LoadingOverlay isVisible={isLoading} />
      
      {loggedInUser && (
        <section className="pt-32 px-4 md:px-24">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" fill="#163760" />
                  <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#163760" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#163760]">{loggedInUser.username}</h2>
              {/*yg bagian ini lah pokok e buat ngasi data e nek mau*/}
              
                {/* <h2>Total Permintaan: {questAmount}</h2>
                <h2>Jumlah Permintaan yang diambil: {takenQuestAmount}</h2> */}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="gap-8 flex px-4 md:px-24 flex-col items-center md:items-start md:justify-center bg-[#EDEDED]">
        <div className="w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
        <h1 className="text-[#322C2C] font-bold text-3xl md:text-4xl text-center">
          Quest yang Saya Ambil
        </h1>
        
        <div className="grid grid-cols-1 gap-4 md:gap-12 w-full">
          {!loggedInUser ? (
            <div className="col-span-full text-center text-gray-500">
              Silakan login untuk melihat quest yang Anda ambil.
            </div>
          ) : takenQuestsLoading ? (
            <div className="col-span-full text-center text-gray-500">
              Loading quest yang diambil...
            </div>
          ) : takenQuests.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg">
              <div className="w-24 h-24 mb-6 flex items-center justify-center">
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="48" cy="48" r="48" fill="#E0F7FF" />
                  <path
                    d="M48 28c-11 0-20 8.5-20 19s9 19 20 19 20-8.5 20-19-9-19-20-19zm0 34c-8.3 0-15-6.2-15-15s6.7-15 15-15 15 6.2 15 15-6.7 15-15 15zm-2-7h4v4h-4v-4zm0-16h4v12h-4V39z"
                    fill="#00B8D9"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0189BB] mb-2 text-center">
                Belum ada quest yang diambil
              </h2>
              <p className="text-lg text-[#5A5A5A] mb-6 text-center">
                Kamu belum mengambil quest apapun.
                <br />
                Yuk, lihat quest yang tersedia!
              </p>
            </div>
          ) : (
            takenQuests.map((quest) => (
              <div
                key={quest.id}
                onClick={() => window.location.href = `/permintaan/${quest.id}`}
                className="block w-full h-full cursor-pointer"
              >
                <QuestCard
                  id={quest.id}
                  nama_permintaan={quest.nama_permintaan}
                  status_permintaan={"Diambil"}
                  lokasi_permintaan={quest.lokasi_permintaan}
                  tingkat_kedaruratan={quest.tingkat_kedaruratan}
                  upah={quest.upah_permintaan}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="min-h-screen gap-8 flex p-12 md:pt-16 md:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED]">
        <div className="w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
        <h1 className="text-[#322C2C] font-bold text-3xl md:text-4xl text-center">
          Permintaanku
        </h1>
        <div className="flex flex-col gap-8 p-12 rounded-lg shadow-lg justify-start items-center bg-[#CDEBF3] w-full">
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 md:gap-6 w-full pb-48">
          {!loggedInUser ? (
            <div className="col-span-full text-center text-gray-500">
              Silakan login untuk melihat permintaan Anda.
            </div>
          ) : loading ? (
            <div className="col-span-full text-center text-gray-500">
              Loading permintaan...
            </div>
          ) : permintaan.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg">
              <div className="w-24 h-24 mb-6 flex items-center justify-center">
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="48" cy="48" r="48" fill="#E0F7FF" />
                  <path
                    d="M48 28c-11 0-20 8.5-20 19s9 19 20 19 20-8.5 20-19-9-19-20-19zm0 34c-8.3 0-15-6.2-15-15s6.7-15 15-15 15 6.2 15 15-6.7 15-15 15zm-2-7h4v4h-4v-4zm0-16h4v12h-4V39z"
                    fill="#00B8D9"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0189BB] mb-2 text-center">
                Belum ada permintaan
              </h2>
              <p className="text-lg text-[#5A5A5A] mb-6 text-center">
                Kamu belum membuat permintaan apapun.
                <br />
                Yuk, buat permintaan pertama kamu sekarang!
              </p>
              <button
                onClick={() => (window.location.href = "/form-minta-bantuan")}
                className="reveal bg-blue-500 hover:bg-blue-600 text-white text-base rounded-md px-4 py-2"
                type="button"
              >
                Buat Permintaan
              </button>
            </div>
          ) : (
            permintaan.map((quest) => (
              <div
                key={quest.id}
                onClick={() => window.location.href = `/permintaan/${quest.id}`}
                className="block w-full h-full cursor-pointer"
              >
                <QuestCard
                  id={quest.id}
                  nama_permintaan={quest.nama_permintaan}
                  lokasi_permintaan={quest.lokasi_permintaan}
                  tingkat_kedaruratan={quest.tingkat_kedaruratan}
                  status_permintaan={quest.status_permintaan}
                  upah={quest.upah_permintaan}
                />
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
