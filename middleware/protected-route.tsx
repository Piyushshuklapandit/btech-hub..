"use client"

import type React from "react"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user"
}

export default function ProtectedRoute({ children, requiredRole = "user" }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole === "admin" && user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, requiredRole, router, mounted])

  if (!mounted || !isAuthenticated) {
    return null
  }

  if (requiredRole === "admin" && user?.role !== "admin") {
    return null
  }

  return <>{children}</>
}
