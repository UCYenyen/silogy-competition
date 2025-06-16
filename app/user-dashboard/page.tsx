"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { IUser } from "@/types/user.md";
import Navbar from "@/components/navbar";
// Register ScrollTrigger plugin
export default function UserDashboardPage() {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="bg-[#EDEDED] min-h-screen">
      <Navbar/>

      <section className="min-h-screen gap-8 flex p-4 md:pt-48 md:px-24 flex-col items-center md:items-start md:justify-start bg-[#EDEDED] ">
        <div className="w-32 md:w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
        <h1 className="text-[#322C2C] font-bold mt-24 md:mt-0 text-5xl md:text-5xl text-center ">
          Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <h1 className="text-[#322C2C] font-bold text-3xl md:text-4xl">
              Halo, {loggedInUser?.username || "Pengguna"}
            </h1>
          </div>
        </div>

        <div className="w-50 z-[150] h-1 bg-gradient-to-l from-[#0189BB] to-transparent"></div>
        <h1 className="text-[#322C2C] font-bold text-3xl md:text-4xl text-center ">
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
              <div className="flex flex-col md:flex-row w-full gap-2 mt-4 bg-[#F8FAFA]">
                <button className="flex-1 bg-white p-4 font-bold text-sm md:text-lg flex items-center justify-between gap-2 shadow">
                  Tipe kebutuhan <span className="text-base">▼</span>
                </button>
                <button className="flex-1 bg-white p-4 font-bold text-sm  md:text-lg flex items-center justify-between gap-2 shadow">
                  Lokasi <span className="text-base">▼</span>
                </button>
                <button className="flex-1 bg-white p-4 font-bold text-sm md:text-lg flex items-center justify-between gap-2 shadow">
                  Tingkat Kedaruratan <span className="text-base">▼</span>
                </button>
                <button className="flex-1 bg-white p-4 font-bold text-sm md:text-lg flex items-center justify-between gap-2 shadow">
                  Upah <span className="text-base">▼</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-[400px pb-48">
          <div className="flex flex-col items-center justify-center w-full rounded-2xl bg-white shadow-lg p-12 mt-12">
            <div className="mb-6">
              <svg width="96" height="96" fill="none" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="48" fill="#E0F7FA" />
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
        </div>
      </section>
      <Footer />
    </div>
  );
}
