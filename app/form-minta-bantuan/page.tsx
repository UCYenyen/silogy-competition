"use client";
import supabase from "@/lib/db";
import { useState, useEffect } from "react";
import { IUser } from "@/types/user.md";
import Navbar from "@/components/navbar";

export default function AskHelpForm() {
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

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
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background-home-desktop.svg')",
        }}
      >
        <div className="bg-white/75 flex flex-col border-1 gap-4 border-white backdrop-blur-sm rounded-2xl px-10 py-16 shadow-lg w-full justify-between max-w-[40rem]">
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
