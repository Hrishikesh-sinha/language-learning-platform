import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Progress from "@/models/Progress"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    let progress = await Progress.findOne({ userId: decoded.userId })

    if (!progress) {
      // Create initial progress for new user
      progress = new Progress({
        userId: decoded.userId,
        completedDays: [],
        streak: 0,
        coins: 0,
        currentDay: 0,
        level: "Beginner",
        efficiency: 0,
      })
      await progress.save()
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Progress fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
