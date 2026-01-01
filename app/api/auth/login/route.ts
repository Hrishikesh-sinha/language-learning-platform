import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password, userType } = await request.json()

    // Find user
    const user = await User.findOne({ email, userType })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    // Return user data (excluding password)
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      selectedLanguage: user.selectedLanguage,
      userType: user.userType,
    }

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userData,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
