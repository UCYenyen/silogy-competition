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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='m-5'>
          <label className='border border-2 border-black p-2'>Name: <input name="name" value={form.name} onChange={handleChange} required /></label>
        </div>
        <div className='m-5'>
          <label className='border border-2 border-black p-2'>Email: <input name="email" type="email" value={form.email} onChange={handleChange} required /></label>
        </div>
        <div className='m-5'>
          <label className='border border-2 border-black p-2'>Phone: <input name="phone_number" value={form.phone_number} onChange={handleChange} /></label>        </div>
        <div className='m-5'>
          <label className='border border-2 border-black p-2'>Password: <input name="password" type="password" value={form.password} onChange={handleChange} required /></label>
        </div>
        <button type="submit" className='border border-2 rounded-lg border-black p-2 m-5'>Register</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  )
}