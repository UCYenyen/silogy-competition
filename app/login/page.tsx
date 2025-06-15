'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('Login successful!')
      window.location.href = '/dashboard' // <-- This is the fix
    } else {
      setMessage(data.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/background-home-desktop.svg')" }}>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-10 py-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#163760] text-center mb-6">Masuk</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Username</label>
            <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Masukkan username"
            className="w-full border-b-2 border-[#163760] bg-transparent text-[#163760] placeholder-[#163760] placeholder-opacity-20 focus:outline-none focus:ring-0 focus:border-[#163760] py-2"
          />

          </div>
          <div>
            <label className="block text-[#163760] font-semibold mb-1">Password</label>
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
          <button
            type="submit"
            className="w-full bg-[#93CBDC] text-[#163760] font-semibold py-2 rounded-full shadow hover:bg-[#7fbccf] transition-colors"
          >
            Masuk
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-[#163760]">
          Belum punya akun?{' '}
          <a href="/register" className="font-semibold text-[#163760] underline hover:text-[#0f2f5c]">
            Daftar
          </a>
        </div>
        {message && <div className="mt-4 text-center text-red-600">{message}</div>}
      </div>
    </div>
  )
}