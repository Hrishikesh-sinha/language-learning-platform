import mongoose from "mongoose"

const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: [
        "french",
        "spanish",
        "hindi",
        "english",
        "japanese",
        "chinese",
        "german",
        "italian",
        "korean",
        "portuguese",
      ],
    },
    questions: [
      {
        questionId: String,
        question: String,
        selectedAnswer: Number,
        correctAnswer: Number,
        isCorrect: Boolean,
      },
    ],
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    efficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    coinsEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    dayOfWeek: {
      type: Number,
      min: 0,
      max: 6,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema)
