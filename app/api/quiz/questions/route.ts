import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"

// Sample questions for different languages
const questionBank = {
  french: [
    {
      id: "fr1",
      question: "How do you say 'Hello' in French?",
      options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "fr2",
      question: "What does 'Merci' mean in English?",
      options: ["Please", "Thank you", "Excuse me", "Goodbye"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "fr3",
      question: "How do you say 'Good morning' in French?",
      options: ["Bonne nuit", "Bon après-midi", "Bonjour", "Bonsoir"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "fr4",
      question: "What is the French word for 'water'?",
      options: ["Lait", "Eau", "Jus", "Café"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "fr5",
      question: "How do you say 'I love you' in French?",
      options: ["Je t'aime", "Je te déteste", "Je suis désolé", "Je ne sais pas"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "fr6",
      question: "What does 'Au revoir' mean?",
      options: ["Hello", "Thank you", "Goodbye", "Please"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "fr7",
      question: "How do you say 'Yes' in French?",
      options: ["Non", "Oui", "Peut-être", "Jamais"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "fr8",
      question: "What is 'bread' in French?",
      options: ["Pain", "Beurre", "Fromage", "Lait"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "fr9",
      question: "How do you ask 'How are you?' in French?",
      options: ["Où êtes-vous?", "Comment allez-vous?", "Que faites-vous?", "Qui êtes-vous?"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "fr10",
      question: "What does 'Bonne nuit' mean?",
      options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
      correctAnswer: 3,
      type: "multiple-choice",
      difficulty: "easy",
    },
  ],
  spanish: [
    {
      id: "es1",
      question: "How do you say 'Hello' in Spanish?",
      options: ["Hola", "Adiós", "Gracias", "Por favor"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "es2",
      question: "What does 'Gracias' mean in English?",
      options: ["Please", "Thank you", "Excuse me", "Goodbye"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "es3",
      question: "How do you say 'Good morning' in Spanish?",
      options: ["Buenas noches", "Buenas tardes", "Buenos días", "Buenas"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "es4",
      question: "What is the Spanish word for 'water'?",
      options: ["Leche", "Agua", "Jugo", "Café"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "es5",
      question: "How do you say 'I love you' in Spanish?",
      options: ["Te amo", "Te odio", "Lo siento", "No sé"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "es6",
      question: "What does 'Adiós' mean?",
      options: ["Hello", "Thank you", "Goodbye", "Please"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "es7",
      question: "How do you say 'Yes' in Spanish?",
      options: ["No", "Sí", "Tal vez", "Nunca"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "es8",
      question: "What is 'bread' in Spanish?",
      options: ["Pan", "Mantequilla", "Queso", "Leche"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "es9",
      question: "How do you ask 'How are you?' in Spanish?",
      options: ["¿Dónde estás?", "¿Cómo estás?", "¿Qué haces?", "¿Quién eres?"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "es10",
      question: "What does 'Buenas noches' mean?",
      options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
      correctAnswer: 3,
      type: "multiple-choice",
      difficulty: "easy",
    },
  ],
  // Add more languages with similar structure
  english: [
    {
      id: "en1",
      question: "Which is the correct spelling?",
      options: ["Recieve", "Receive", "Receve", "Receiv"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "en2",
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Gone", "Went", "Going"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "en3",
      question: "Choose the correct article: '__ apple'",
      options: ["A", "An", "The", "No article needed"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "en4",
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childes", "Child"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "en5",
      question: "Which sentence is grammatically correct?",
      options: ["She don't like pizza", "She doesn't like pizza", "She not like pizza", "She no like pizza"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "en6",
      question: "What is the comparative form of 'good'?",
      options: ["Gooder", "More good", "Better", "Best"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "en7",
      question: "Choose the correct preposition: 'I'm interested __ music'",
      options: ["in", "on", "at", "for"],
      correctAnswer: 0,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "en8",
      question: "What is the past participle of 'eat'?",
      options: ["Ate", "Eaten", "Eating", "Eated"],
      correctAnswer: 1,
      type: "multiple-choice",
      difficulty: "medium",
    },
    {
      id: "en9",
      question: "Which word is a synonym for 'happy'?",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "easy",
    },
    {
      id: "en10",
      question: "Choose the correct form: 'If I __ you, I would study harder'",
      options: ["am", "was", "were", "be"],
      correctAnswer: 2,
      type: "multiple-choice",
      difficulty: "hard",
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    await connectDB()

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const language = user.selectedLanguage.toLowerCase()
    const questions = questionBank[language as keyof typeof questionBank] || questionBank.english

    // Return 10 random questions for the day
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10)

    return NextResponse.json({ questions: shuffledQuestions })
  } catch (error) {
    console.error("Questions fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
