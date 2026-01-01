import mongoose from "mongoose"

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    completedDays: [
      {
        type: Number, // 0-6 representing Monday-Sunday
        min: 0,
        max: 6,
      },
    ],
    streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    coins: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentDay: {
      type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    efficiency: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalQuizzesCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCorrectAnswers: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastQuizDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Progress || mongoose.model("Progress", ProgressSchema)
