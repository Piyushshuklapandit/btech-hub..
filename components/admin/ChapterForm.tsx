"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface Chapter {
  _id?: string
  name: string
  description: string
}

interface Props {
  subjectId: string
  chapter?: Chapter | null
  onSuccess: () => void
}

export default function ChapterForm({ subjectId, chapter, onSuccess }: Props) {
  const [formData, setFormData] = useState<Chapter>({
    name: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { token } = useAuth()

  useEffect(() => {
    if (chapter) {
      setFormData(chapter)
    }
  }, [chapter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = chapter ? `/api/subjects/${subjectId}/chapters/${chapter._id}` : `/api/subjects/${subjectId}/chapters`
      const method = chapter ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", description: "" })
        onSuccess()
      } else {
        setError("Failed to save chapter")
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

      <div>
        <label className="block text-sm font-medium mb-2">Chapter Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          required
        />
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

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Saving..." : chapter ? "Update Chapter" : "Add Chapter"}
      </button>
    </form>
  )
}
