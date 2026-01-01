import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { fullName, email, mobile, collegeEmail, selectedLanguage, password } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const user = new User({
      fullName,
      email,
      mobile,
      collegeEmail,
      selectedLanguage,
      password: hashedPassword,
      userType: "user",
    })

    await user.save()

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
