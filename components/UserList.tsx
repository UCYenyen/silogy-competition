'use client'
import { useState, useEffect } from 'react'

interface User {
  user_id: number
  name: string
  email: string
  phone_number: string | null
  password_hash?: string | null
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      const data = await response.json()
      if (Array.isArray(data)) {
        setUsers(data)
        setError(null)
      } else {
        setError('Invalid data format received')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="text-center text-gray-500">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Users ({users.length})</h2>
      {users.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No users found in the database.
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div 
              key={user.user_id} 
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-lg font-semibold text-gray-900">{user.user_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{user.phone_number || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Password</label>
                  <p className='text-gray-900'>{user.password_hash || 'gaada'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}