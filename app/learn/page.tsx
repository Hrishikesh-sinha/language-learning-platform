"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Globe, ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy, Coins } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  type: "multiple-choice" | "fill-blank"
  difficulty: "easy" | "medium" | "hard"
}

export default function LearnPage() {
  const [user, setUser] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [efficiency, setEfficiency] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login?type=user")
      return
    }

    setUser(JSON.parse(userData))
    fetchQuestions()
  }, [router])

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/quiz/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        completeQuiz(newAnswers)
      }
    }, 2000)
  }

  const completeQuiz = async (finalAnswers: number[]) => {
    const finalScore = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)

    const calculatedEfficiency = Math.round((finalScore / questions.length) * 100)
    setEfficiency(calculatedEfficiency)
    setQuizCompleted(true)

    try {
      const token = localStorage.getItem("token")
      await fetch("/api/quiz/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          score: finalScore,
          totalQuestions: questions.length,
          efficiency: calculatedEfficiency,
          answers: finalAnswers,
        }),
      })

      toast({
        title: "Quiz Completed!",
        description: `You earned ${calculatedEfficiency >= 70 ? 10 : 5} coins!`,
      })
    } catch (error) {
      console.error("Error completing quiz:", error)
    }
  }

  const handleRelearn = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setEfficiency(0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-12 w-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your lesson...</p>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
              <CardDescription className="text-lg">Great job on completing today's lesson</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Your Score</p>
                  <p className="text-2xl font-bold text-green-600">
                    {score}/{questions.length}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-blue-600">{efficiency}%</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="h-6 w-6 text-yellow-500" />
                  <p className="text-lg font-semibold">You earned {efficiency >= 70 ? 10 : 5} coins!</p>
                </div>
              </div>

              <Badge variant="secondary" className="text-lg px-4 py-2">
                {efficiency >= 90 ? "Excellent!" : efficiency >= 70 ? "Good Job!" : "Keep Practicing!"}
              </Badge>

              <div className="flex space-x-4">
                <Button onClick={handleRelearn} variant="outline" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Relearn (5 coins)
                </Button>
                <Button onClick={() => router.push("/dashboard")} className="flex-1 bg-green-600 hover:bg-green-700">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-green-600" />
            <span className="font-semibold">LinguaLearn</span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>
                Score: {score}/{currentQuestionIndex}
              </span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
              <Badge
                variant={
                  currentQuestion?.difficulty === "easy"
                    ? "secondary"
                    : currentQuestion?.difficulty === "medium"
                      ? "default"
                      : "destructive"
                }
              >
                {currentQuestion?.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion?.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-4 text-left justify-start h-auto ${
                  selectedAnswer === index ? "border-green-500 bg-green-50" : ""
                } ${
                  showResult && index === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-100 text-green-700"
                    : ""
                } ${
                  showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                    ? "border-red-500 bg-red-100 text-red-700"
                    : ""
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </Button>
            ))}

            {!showResult && (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {currentQuestionIndex === questions.length - 1 ? "Complete Quiz" : "Next Question"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}

            {showResult && (
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <p className="text-lg font-medium">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <span className="text-green-600">Correct! 🎉</span>
                  ) : (
                    <span className="text-red-600">Incorrect. The correct answer is highlighted above.</span>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
