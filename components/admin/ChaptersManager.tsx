"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import ChapterForm from "./ChapterForm"
import ResourcesManager from "./ResourcesManager"

interface Chapter {
  _id: string
  name: string
  description: string
  resources?: any[]
}

interface Subject {
  _id: string
  name: string
}

interface Props {
  subject: Subject
  onBack: () => void
}

export default function ChaptersManager({ subject, onBack }: Props) {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const { token } = useAuth()

  const fetchChapters = async () => {
    try {
      const response = await fetch(`/api/subjects/${subject._id}/chapters`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setChapters(await response.json())
      }
    } catch (error) {
      console.error("Failed to fetch chapters:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChapters()
  }, [subject._id, token])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/subjects/${subject._id}/chapters/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setChapters(chapters.filter((c) => c._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete chapter:", error)
    }
  }

  if (selectedChapter) {
    return (
      <ResourcesManager
        subject={subject}
        chapter={selectedChapter}
        onBack={() => {
          setSelectedChapter(null)
          fetchChapters()
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-primary hover:text-accent transition-colors flex items-center gap-2">
        ← Back to Subjects
      </button>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Chapters for {subject.name}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancel" : "Add Chapter"}
        </button>
      </div>

      {showForm && (
        <ChapterForm
          subjectId={subject._id}
          chapter={editingChapter}
          onSuccess={() => {
            setShowForm(false)
            setEditingChapter(null)
            fetchChapters()
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter._id}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{chapter.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{chapter.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedChapter(chapter)}
                  className="px-3 py-2 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
                >
                  Resources ({chapter.resources?.length || 0})
                </button>
                <button
                  onClick={() => {
                    setEditingChapter(chapter)
                    setShowForm(true)
                  }}
                  className="px-3 py-2 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(chapter._id)}
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
