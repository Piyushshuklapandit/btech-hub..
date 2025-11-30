import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/api/subjects`)
    const subjects = await response.json()
    return NextResponse.json(subjects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"
    const response = await fetch(`${backendUrl}/api/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return NextResponse.json(result, { status: response.status })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
