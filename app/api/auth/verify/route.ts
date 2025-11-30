import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // In production, verify JWT signature
    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
