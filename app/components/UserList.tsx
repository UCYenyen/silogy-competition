'use client'
import { useState, useEffect } from 'react'

interface User {
  id: number
  email: string
  username: string | null
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center">Loading users...</div>

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users in Database</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found in the database.</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <strong className="text-gray-700">ID:</strong>
                  <p className="text-gray-900">{user.id}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Email:</strong>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Username:</strong>
                  <p className="text-gray-900">{user.username || 'Not set'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}