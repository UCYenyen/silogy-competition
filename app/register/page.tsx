'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone_number: '', password: '' })
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('Registration successful!')
      setForm({ name: '', email: '', phone_number: '', password: '' })
    } else {
      setMessage(data.error || 'Registration failed')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background-home-desktop.svg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl px-10 py-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#163760] text-center mb-6">Daftar</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Nama</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
              className="w-full border-0 border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-50 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
            />
          </div>
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email"
              className="w-full border-0 border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-50 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
            />
          </div>
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Nomor Telepon</label>
            <input
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon"
              className="w-full border-0 border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-50 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
            />
          </div>
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Kata Sandi</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Masukkan kata sandi"
              className="w-full border-0 border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-50 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#93CBDC] text-[#163760] font-semibold py-2 rounded-full shadow hover:bg-[#7fbccf] transition-colors"
          >
            Daftar
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-red-600 font-medium">{message}</div>
        )}
      </div>
    </div>
  )
}