import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
