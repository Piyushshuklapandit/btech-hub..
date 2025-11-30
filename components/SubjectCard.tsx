"use client"

import Link from "next/link"

interface Subject {
  _id: string
  name: string
  code: string
  description: string
  semester: number
  chapters?: number
  color?: string
}

interface Props {
  subject: Subject
}

export default function SubjectCard({ subject }: Props) {
  return (
    <Link href={`/subject/${subject._id}`}>
      <div className="group cursor-pointer rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 h-full">
        <div className={`h-32 ${subject.color} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-30">{subject.code.charAt(0)}</span>
          </div>
        </div>
        <div className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{subject.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{subject.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Sem {subject.semester}</span>
            <span>{subject.chapters || 0} chapters</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
