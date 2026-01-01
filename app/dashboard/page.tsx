"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Globe, Coins, Flame, Share2, Calendar, Trophy, Target, ArrowRight, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const motivationalQuotes = [
  "The limits of my language mean the limits of my world. - Ludwig Wittgenstein",
  "To have another language is to possess a second soul. - Charlemagne",
  "Language is the road map of a culture. - Rita Mae Brown",
  "Learn a new language and get a new soul. - Czech Proverb",
  "A different language is a different vision of life. - Federico Fellini",
  "Language is not a genetic gift, it is a social gift. - Frank Smith",
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [progress, setProgress] = useState<any>(null)
  const [currentQuote, setCurrentQuote] = useState("")
  const [loading, setLoading] = useState(true)
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
    setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
    fetchUserProgress()
  }, [router])

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/user/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProgress(data)
      }
    } catch (error) {
      console.error("Error fetching progress:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const getDayStatus = (dayIndex: number) => {
    if (!progress?.completedDays) return false
    return progress.completedDays.includes(dayIndex)
  }

  const getLanguageFlag = (language: string) => {
    const flags: { [key: string]: string } = {
      french: "🇫🇷",
      spanish: "🇪🇸",
      hindi: "🇮🇳",
      english: "🇺🇸",
      japanese: "🇯🇵",
      chinese: "🇨🇳",
      german: "🇩🇪",
      italian: "🇮🇹",
      korean: "🇰🇷",
      portuguese: "🇵🇹",
    }
    return flags[language?.toLowerCase()] || "🌍"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-12 w-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-800">LinguaLearn</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-green-600 bg-green-50">
                  <Target className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Flame className="h-4 w-4 mr-2" />
                  Streak: {progress?.streak || 0} days
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Coins className="h-4 w-4 mr-2" />
                  Coins: {progress?.coins || 0}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      Welcome back, {user?.fullName}! {getLanguageFlag(user?.selectedLanguage)}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Learning {user?.selectedLanguage?.charAt(0).toUpperCase() + user?.selectedLanguage?.slice(1)}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {progress?.level || "Beginner"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-medium">Let's start from Day {(progress?.currentDay || 0) + 1}</p>
                  <Button onClick={() => router.push("/learn")} className="bg-green-600 hover:bg-green-700">
                    Let's Go
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((progress?.completedDays?.length || 0) / 7) * 100)}%</span>
                  </div>
                  <Progress value={((progress?.completedDays?.length || 0) / 7) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Days of the Week */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={day}
                      className={`p-3 rounded-lg text-center text-sm font-medium transition-colors ${
                        getDayStatus(index) ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <div className="truncate">{day.slice(0, 3)}</div>
                      {getDayStatus(index) && <Trophy className="h-4 w-4 mx-auto mt-1" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Flame className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Current Streak</p>
                      <p className="text-2xl font-bold">{progress?.streak || 0} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Coins className="h-8 w-8 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Coins</p>
                      <p className="text-2xl font-bold">{progress?.coins || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Efficiency</p>
                      <p className="text-2xl font-bold">{progress?.efficiency || 0}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Motivational Quote */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg italic text-gray-700 border-l-4 border-green-500 pl-4">
                  "{currentQuote}"
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
