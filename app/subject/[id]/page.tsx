"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface Chapter {
  _id: string
  name: string
  description: string
  resources?: Resource[]
}

interface Resource {
  _id: string
  title: string
  type: "youtube" | "drive" | "pdf" | "link"
  url: string
  description: string
}

interface Subject {
  _id: string
  name: string
  code: string
  description: string
  semester: number
}

export default function SubjectPage() {
  const params = useParams()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectRes = await fetch(`/api/subjects/${params.id}`)
        const chaptersRes = await fetch(`/api/subjects/${params.id}/chapters`)

        if (subjectRes.ok && chaptersRes.ok) {
          const subjectData = await subjectRes.json()
          const chaptersData = await chaptersRes.json()

          // Fetch resources for each chapter
          const chaptersWithResources = await Promise.all(
            chaptersData.map(async (chapter: Chapter) => {
              const resourceRes = await fetch(`/api/subjects/${params.id}/chapters/${chapter._id}/resources`)
              const resources = resourceRes.ok ? await resourceRes.json() : []
              return { ...chapter, resources }
            }),
          )

          setSubject(subjectData)
          setChapters(chaptersWithResources)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const getResourceIcon = (type: string) => {
    const icons: Record<string, string> = {
      youtube: "🎥",
      drive: "📁",
      pdf: "📄",
      link: "🔗",
    }
    return icons[type] || "📎"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-20">
          <p className="text-muted-foreground">Subject not found</p>
          <Link href="/" className="text-primary hover:text-accent mt-4 inline-block">
            Back to home
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/" className="text-primary hover:text-accent flex items-center gap-2 mb-8">
          ← Back to Subjects
        </Link>

        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
              <p className="text-lg text-muted-foreground">
                {subject.code} • Semester {subject.semester}
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{subject.description}</p>
        </div>

        <div className="space-y-8">
          {chapters.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">No chapters available yet</p>
            </div>
          ) : (
            chapters.map((chapter) => (
              <div key={chapter._id} className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-2">{chapter.name}</h2>
                <p className="text-muted-foreground mb-6">{chapter.description}</p>

                {chapter.resources && chapter.resources.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Resources</h3>
                    <div className="grid gap-4">
                      {chapter.resources.map((resource) => (
                        <a
                          key={resource._id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex items-start gap-4"
                        >
                          <span className="text-3xl">{getResourceIcon(resource.type)}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary hover:text-accent transition-colors">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                            <p className="text-xs text-muted-foreground mt-2 capitalize">
                              {resource.type} • Click to open
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No resources available for this chapter</p>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
