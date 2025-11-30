"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

interface Config {
  homeTitle: string
  homeDescription: string
  firstYearDriveLink: string
}

export default function SiteConfigManager() {
  const [config, setConfig] = useState<Config>({
    homeTitle: "",
    homeDescription: "",
    firstYearDriveLink: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const { token } = useAuth()

  const fetchConfig = async () => {
    try {
      const response = await fetch("/api/config", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setConfig(await response.json())
      }
    } catch (error) {
      console.error("Failed to fetch config:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [token])

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const response = await fetch("/api/config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        setMessage("Configuration saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to save configuration")
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="p-6 bg-card border border-border rounded-lg space-y-6">
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes("success")
                ? "bg-green-500/10 border border-green-500/50 text-green-500"
                : "bg-red-500/10 border border-red-500/50 text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Home Page Title</label>
          <input
            type="text"
            value={config.homeTitle}
            onChange={(e) => setConfig({ ...config, homeTitle: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Your Complete BTech Learning Platform"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Home Page Description</label>
          <textarea
            value={config.homeDescription}
            onChange={(e) => setConfig({ ...config, homeDescription: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            rows={4}
            placeholder="Access comprehensive study materials..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">First Year Drive Link</label>
          <input
            type="url"
            value={config.firstYearDriveLink}
            onChange={(e) => setConfig({ ...config, firstYearDriveLink: e.target.value })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="https://drive.google.com/drive/folders/..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            This link will be displayed in the footer for First Year students
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  )
}
