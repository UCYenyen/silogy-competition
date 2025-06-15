"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMessage("Login gagal. Silakan cek email dan password Anda.");
      setLoading(false);
      return;
    }

    setMessage("Login berhasil!");
    // Redirect or reload as needed
    window.location.href = "/";
  };

  return (
    <div>
      <nav 
        className="fixed z-[200] w-full p-6 md:p-8 px-16 flex items-center justify-between text-white text-lg md:text-xl font-bold transition-all duration-100 filter"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <div className="flex items-center gap-4 shadow-xs">
          <Link href="/" className="font-heading text-4xl">TolongYuk!</Link>
        </div>
        <div className="hidden md:flex items-center gap-4 shadow-xs">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/semua-permintaan" className="hover:underline">Permintaan</Link>
          <div className="bg-[#FAFAFA] p-2 rounded-lg text-[#413939]">
            <Link href="/register" className="hover:underline px-4">Register</Link>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="flex flex-col gap-1.5 md:hidden shadow-xs">
          <div className="w-10 bg-white h-1.5"></div>
          <div className="w-10 bg-white h-1.5"></div>
        </div>
      </nav>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background-home-desktop.svg')",
        }}
      >
        <div className="bg-white/75 flex flex-col border-1 gap-4 border-white backdrop-blur-sm rounded-2xl px-10 py-16 shadow-lg w-full justify-between max-w-[40rem]">
          <h1 className="text-3xl font-bold text-[#163760] text-center mb-12">
            Masuk
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Masukkan email"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div>
              <label className="block text-[#163760] font-semibold mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Masukkan password"
                className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
              />
            </div>
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                className="px-12 bg-[#93CBDC] text-[#163760] text-xl font-semibold py-2 rounded-full shadow hover:bg-[#7fbccf] transition-colors"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>
          {message && (
            <div className="mt-4 text-center text-red-600">{message}</div>
          )}
          <div className="text-center text-sm text-[#163760]">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="font-semibold text-[#163760] underline hover:text-[#0f2f5c]"
            >
              Daftar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}