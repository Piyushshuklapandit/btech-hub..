"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            BTech Hub
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#subjects" className="text-sm hover:text-primary transition-colors">
              Subjects
            </Link>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-sm hover:text-primary transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-sm hover:text-primary transition-colors">
              Home
            </Link>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="block text-sm hover:text-primary transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
