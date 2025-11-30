"use client"

import { useState } from "react"

export default function Footer() {
  const [driveLink, setDriveLink] = useState("")

  const fetchDriveLink = async () => {
    try {
      const response = await fetch("/api/config")
      if (response.ok) {
        const data = await response.json()
        setDriveLink(data.firstYearDriveLink || "")
      }
    } catch (error) {
      console.error("Failed to fetch drive link:", error)
    }
  }

  useState(() => {
    fetchDriveLink()
  })

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">BTech Hub</h3>
            <p className="text-sm text-muted-foreground">Your complete platform for BTech learning and resources</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Subjects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">First Year Resources</h3>
            {driveLink && (
              <a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Access Drive Folder →
              </a>
            )}
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BTech Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
