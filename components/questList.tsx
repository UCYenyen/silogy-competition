'use client'
import { useEffect, useState } from 'react'

export default function QuestList() {
  const [quests, setQuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/quests')
        const data = await res.json()
        setQuests(data.quests || [])
      } catch (err) {
        setError('Failed to fetch quests')
      } finally {
        setLoading(false)
      }
    }
    fetchQuests()
  }, [])

  if (loading) return <div>Loading quests...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">All Quests ({quests.length})</h2>
      <div className="grid gap-4">
        {quests.map(q => (
          <div key={q.quest_id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="font-bold">{q.title}</div>
            <div>{q.description}</div>
            <div>Location: {q.location}</div>
            <div>Urgency: {q.urgency_level}</div>
            <div>Status: {q.status}</div>
            <div>Due: {q.due_date ? new Date(q.due_date).toLocaleDateString() : 'No due date'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}