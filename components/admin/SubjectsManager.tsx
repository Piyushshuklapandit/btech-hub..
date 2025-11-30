"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import SubjectForm from "./SubjectForm"
import ChaptersManager from "./ChaptersManager"

interface Subject {
  _id: string
  name: string
  code: string
  description: string
  semester: number
}

export default function SubjectsManager() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const { token } = useAuth()

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setSubjects(await response.json())
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [token])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/subjects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setSubjects(subjects.filter((s) => s._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete subject:", error)
    }
  }

  if (selectedSubject) {
    return <ChaptersManager subject={selectedSubject} onBack={() => setSelectedSubject(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Subjects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          {showForm ? "Cancel" : "Add Subject"}
        </button>
      </div>

      {showForm && (
        <SubjectForm
          subject={editingSubject}
          onSuccess={() => {
            setShowForm(false)
            setEditingSubject(null)
            fetchSubjects()
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {subject.code} • Semester {subject.semester}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{subject.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="px-3 py-2 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
                >
                  Chapters
                </button>
                <button
                  onClick={() => {
                    setEditingSubject(subject)
                    setShowForm(true)
                  }}
                  className="px-3 py-2 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subject._id)}
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
