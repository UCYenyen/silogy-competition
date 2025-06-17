"use client";
import Link from "next/link";
import supabase from "@/lib/db";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import LogoutButton from "@/components/logoutButton";

export default function AskHelpForm() {
  const {loggedInUser} = useUser();
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const [form, setForm] = useState({
    title: "",
    location: "",
    tingkat_kedaruratan: "",
    description: "",
    upah: "", // Tambahkan upah di state
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!loggedInUser) {
      setMessage("Anda harus login untuk membuat permintaan.");
      setLoading(false);
      return;
    }
    const { error } = await supabase
      .from("permintaan")
      .insert([
        {
          nama_permintaan: form.title,
          lokasi_permintaan: form.location,
          deskripsi_permintaan: form.description,
          upah_permintaan: form.upah, // Tambahkan upah ke data yang dikirim
          status_permintaan: form.status,
          created_at: new Date().toISOString(),
          pembuat_id: loggedInUser?.id || null,
          tingkat_kedaruratan: form.tingkat_kedaruratan,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating request:", error.message);
      setMessage("Gagal membuat permintaan. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    setMessage("Permintaan berhasil dibuat!");
    setForm({
      title: "",
      location: "",
      tingkat_kedaruratan: "",
      description: "",
      upah: "", // Reset upah
      status: "Pending",
    });
    setLoading(false);
  };

  return (
    <>
      <nav
        className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} // Set initial transparent background
      >
        <div className="flex items-center gap-4 shadow-xs">
          <Link href="/" className="font-heading text-4xl">
            TolongYuk!
          </Link>
        </div>
        <div className="flex items-center gap-4 shadow-xs">
          {loggedInUser ? (
            <div className="relative">
              <div
                className="flex items-center justify-center px-2 py-1 rounded-full hover:bg-gray-200 transition min-w-10 min-h-10 cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" fill="#163760" />
                    <path
                      d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                      fill="#163760"
                    />
                  </svg>
                </span>
              </div>
              {dropdownVisible && (
                <div
                  className="absolute flex flex-col items-center justify-center right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  tabIndex={0}
                  onBlur={() => setDropdownVisible(false)}
                >
                  <p className="px-4 py-2 text-gray-700">
                    Halo, {loggedInUser?.username || "Pengguna"}
                  </p>
                  <hr className="my-2" />
                  <LogoutButton />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
              <Link href="/login" className="hover:underline px-4">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div
        className="min-h-screen pt-28 pb-28 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background-home-no-noise.svg')",
        }}
      >
        <div className="bg-white/75 flex flex-col border-1 gap-4 border-white backdrop-blur-sm rounded-2xl w-full p-4 max-w-[90%] md:max-w-[40rem]">
          <h1 className="text-3xl font-bold text-[#163760] text-center mb-12">
            Buat Permintaan Bantuan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Judul Permintaan
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Masukkan judul permintaan"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Lokasi
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Masukkan lokasi"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Tingkat Kedaruratan
              </label>
              <select
                name="tingkat_kedaruratan"
                value={form.tingkat_kedaruratan}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              >
                <option value="">Pilih tingkat kedaruatan</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Jelaskan detail permintaan bantuan Anda..."
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Upah
              </label>
              <input
                name="upah"
                type="number"
                value={form.upah}
                onChange={handleChange}
                required
                placeholder="Masukkan upah (contoh: 50000)"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="px-12 bg-[#93CBDC] text-[#163760] text-xl font-semibold py-2 rounded-full shadow hover:bg-[#7fbccf] transition-colors"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Kirim Permintaan"}
              </button>
            </div>
          </form>
          {message && (
            <div className="mt-4 text-center text-red-600">{message}</div>
          )}
        </div>
      </div>
    </>
  );
}
