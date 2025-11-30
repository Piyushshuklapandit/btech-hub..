"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface Subject {
  _id?: string
  name: string
  code: string
  description: string
  semester: number
}

interface Props {
  subject?: Subject | null
  onSuccess: () => void
}

export default function SubjectForm({ subject, onSuccess }: Props) {
  const [formData, setFormData] = useState<Subject>({
    name: "",
    code: "",
    description: "",
    semester: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { token } = useAuth()

  useEffect(() => {
    if (subject) {
      setFormData(subject)
    }
  }, [subject])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = subject ? `/api/subjects/${subject._id}` : "/api/subjects"
      const method = subject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", code: "", description: "", semester: 1 })
        onSuccess()
      } else {
        setError("Failed to save subject")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card border border-border rounded-lg space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">{error}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Subject Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Code</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Semester</label>
        <select
          value={formData.semester}
          onChange={(e) => setFormData({ ...formData, semester: Number.parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Saving..." : subject ? "Update Subject" : "Add Subject"}
      </button>
    </form>
  )
}
