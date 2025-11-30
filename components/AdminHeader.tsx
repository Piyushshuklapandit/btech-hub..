"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            BTech Hub Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
