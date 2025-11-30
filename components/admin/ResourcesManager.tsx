"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import ResourceForm from "./ResourceForm"

interface Resource {
  _id: string
  title: string
  type: "youtube" | "drive" | "pdf" | "link"
  url: string
  description: string
}

interface Chapter {
  _id: string
  name: string
}

interface Subject {
  _id: string
  name: string
}

interface Props {
  subject: Subject
  chapter: Chapter
  onBack: () => void
}

export default function ResourcesManager({ subject, chapter, onBack }: Props) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const { token } = useAuth()

  const fetchResources = async () => {
    try {
      const response = await fetch(`/api/subjects/${subject._id}/chapters/${chapter._id}/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setResources(await response.json())
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [subject._id, chapter._id, token])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/subjects/${subject._id}/chapters/${chapter._id}/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setResources(resources.filter((r) => r._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete resource:", error)
    }
  }

  const getResourceIcon = (type: string) => {
    const icons: Record<string, string> = {
      youtube: "🎥",
      drive: "📁",
      pdf: "📄",
      link: "🔗",
    }
    return icons[type] || "📎"
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-primary hover:text-accent transition-colors flex items-center gap-2">
        ← Back to Chapters
      </button>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Resources for {chapter.name}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancel" : "Add Resource"}
        </button>
      </div>

      {showForm && (
        <ResourceForm
          subjectId={subject._id}
          chapterId={chapter._id}
          resource={editingResource}
          onSuccess={() => {
            setShowForm(false)
            setEditingResource(null)
            fetchResources()
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-accent transition-colors mt-2 inline-block"
                >
                  Open Link →
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingResource(resource)
                    setShowForm(true)
                  }}
                  className="px-3 py-2 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="px-3 py-2 text-sm bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
