"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface Resource {
  _id?: string
  title: string
  type: "youtube" | "drive" | "pdf" | "link"
  url: string
  description: string
}

interface Props {
  subjectId: string
  chapterId: string
  resource?: Resource | null
  onSuccess: () => void
}

export default function ResourceForm({ subjectId, chapterId, resource, onSuccess }: Props) {
  const [formData, setFormData] = useState<Resource>({
    title: "",
    type: "youtube",
    url: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { token } = useAuth()

  useEffect(() => {
    if (resource) {
      setFormData(resource)
    }
  }, [resource])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = resource
        ? `/api/subjects/${subjectId}/chapters/${chapterId}/resources/${resource._id}`
        : `/api/subjects/${subjectId}/chapters/${chapterId}/resources`
      const method = resource ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ title: "", type: "youtube", url: "", description: "" })
        onSuccess()
      } else {
        setError("Failed to save resource")
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
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as Resource["type"],
              })
            }
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="youtube">YouTube</option>
            <option value="drive">Google Drive</option>
            <option value="pdf">PDF</option>
            <option value="link">Link</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="https://..."
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
        {loading ? "Saving..." : resource ? "Update Resource" : "Add Resource"}
      </button>
    </form>
  )
}
