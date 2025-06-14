'use client'
import { useState, useEffect } from 'react'

interface Staff {
  staff_id: number
  user_id: number
  bio: string | null
  role_id: number
  created_at: string
  user: {
    user_id: number
    name: string
    email: string
    phone_number: string | null
  }
  role: {
    role_id: number
    role_name: string
    description: string | null
  }
}

export default function StaffList() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/staff')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setStaff(data)
        setError(null)
      } else {
        setError('Invalid data format received')
      }
    } catch (err) {
      console.error('Error fetching staff:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch staff')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="text-center text-gray-500">Loading staff...</div>
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
      <h2 className="text-2xl font-bold mb-6 text-center">Staff Members ({staff.length})</h2>
      
      {staff.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No staff members found in the database.
        </div>
      ) : (
        <div className="grid gap-4">
          {staff.map((member) => (
            <div 
              key={member.staff_id} 
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Staff ID</label>
                  <p className="text-lg font-semibold text-gray-900">{member.staff_id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{member.user.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                    {member.role.role_name}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{member.user.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{member.user.phone_number || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Staff Since</label>
                  <p className="text-gray-900">
                    {new Date(member.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="text-sm font-medium text-gray-500">Bio</label>
                  <p className="text-gray-900 mt-1">
                    {member.bio || 'No bio provided'}
                  </p>
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="text-sm font-medium text-gray-500">Role Description</label>
                  <p className="text-gray-700 text-sm mt-1">
                    {member.role.description || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}