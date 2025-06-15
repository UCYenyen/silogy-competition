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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: <input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Password: <input name="password" type="password" value={form.password} onChange={handleChange} required /></label>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}