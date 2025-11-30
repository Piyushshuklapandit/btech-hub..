"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AdminHeader from "@/components/AdminHeader"
import SubjectsManager from "@/components/admin/SubjectsManager"
import SiteConfigManager from "@/components/admin/SiteConfigManager"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("subjects")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push("/login")
    } else if (user.role !== "admin") {
      router.push("/")
    }
  }, [user, router])

  if (!mounted || !user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("subjects")}
            className={`px-4 py-2 font-semibold transition-colors border-b-2 -mb-[2px] ${
              activeTab === "subjects"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Manage Subjects
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-4 py-2 font-semibold transition-colors border-b-2 -mb-[2px] ${
              activeTab === "config"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Site Config
          </button>
        </div>

        {activeTab === "subjects" && <SubjectsManager />}
        {activeTab === "config" && <SiteConfigManager />}
      </div>
    </div>
  )
}
