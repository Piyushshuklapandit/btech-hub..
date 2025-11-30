"use client"

import { useEffect, useState } from "react"
import SubjectCard from "./SubjectCard"

interface Subject {
  _id: string
  name: string
  code: string
  description: string
  semester: number
  chapters?: number
  color?: string
}

export default function SubjectsGrid() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)

  const gradients = [
    "gradient-purple-blue",
    "gradient-blue-cyan",
    "gradient-pink-purple",
    "gradient-green-blue",
    "gradient-orange-red",
  ]

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subjects")
        if (response.ok) {
          const data = await response.json()
          const withGradients = data.map((subject: Subject, idx: number) => ({
            ...subject,
            color: gradients[idx % gradients.length],
          }))
          setSubjects(withGradients)
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  return (
    <section id="subjects" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore All Subjects</h2>
          <p className="text-xl text-muted-foreground">
            Choose your subject and dive into comprehensive learning materials
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
