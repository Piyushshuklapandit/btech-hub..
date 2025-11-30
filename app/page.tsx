"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import SubjectsGrid from "@/components/SubjectsGrid"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/context/AuthContext"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <SubjectsGrid />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
