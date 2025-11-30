"use client"

import { useState } from "react"

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Complete</span>{" "}
          BTech Learning Platform
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access comprehensive study materials, notes, and resources for all BTech subjects. From basic concepts to
          advanced topics.
        </p>

        <div className="flex gap-4 mb-12 justify-center flex-col sm:flex-row">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
            Explore Subjects
          </button>
          <button className="px-8 py-3 border border-border text-foreground rounded-lg hover:bg-card transition-colors font-semibold">
            Learn More
          </button>
        </div>

        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search subjects, topics, or resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/50">
          <div>
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Resources</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">50+</p>
            <p className="text-sm text-muted-foreground">Subjects</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">1000+</p>
            <p className="text-sm text-muted-foreground">Study Notes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">24/7</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
