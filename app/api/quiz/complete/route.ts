import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import Progress from "@/models/Progress"

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    const { score, totalQuestions, efficiency, answers } = await request.json()

    await connectDB()

    let progress = await Progress.findOne({ userId: decoded.userId })

    if (!progress) {
      progress = new Progress({
        userId: decoded.userId,
        completedDays: [],
        streak: 0,
        coins: 0,
        currentDay: 0,
        level: "Beginner",
        efficiency: 0,
      })
    }

    // Calculate coins earned (10 for good performance, 5 for completion)
    const coinsEarned = efficiency >= 70 ? 10 : 5

    // Update progress
    const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
    const mondayIndex = today === 0 ? 6 : today - 1 // Convert to Monday = 0 index

    if (!progress.completedDays.includes(mondayIndex)) {
      progress.completedDays.push(mondayIndex)
      progress.streak += 1
    }

    progress.coins += coinsEarned
    progress.efficiency = efficiency
    progress.currentDay = Math.max(progress.currentDay, mondayIndex)

    // Update level based on progress
    const completedDaysCount = progress.completedDays.length
    if (completedDaysCount >= 21) {
      progress.level = "Advanced"
    } else if (completedDaysCount >= 7) {
      progress.level = "Intermediate"
    } else {
      progress.level = "Beginner"
    }

    await progress.save()

    return NextResponse.json({
      message: "Quiz completed successfully",
      coinsEarned,
      newLevel: progress.level,
      totalCoins: progress.coins,
      streak: progress.streak,
    })
  } catch (error) {
    console.error("Quiz completion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
