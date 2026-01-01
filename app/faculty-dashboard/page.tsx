"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, BookOpen, BarChart3, LogOut, TrendingUp, Award } from "lucide-react"

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState<any>(null)
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    totalQuizzes: 0,
    averageScore: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login?type=faculty")
      return
    }

    const user = JSON.parse(userData)
    if (user.userType !== "faculty") {
      router.push("/login?type=faculty")
      return
    }

    setFaculty(user)
    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      // Mock data for faculty dashboard
      setStats({
        totalStudents: 150,
        activeStudents: 89,
        totalQuizzes: 1250,
        averageScore: 78,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading faculty dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">LinguaLearn Faculty</h1>
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
        {/* Welcome Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
              Welcome, {faculty?.fullName}!
            </CardTitle>
            <CardDescription className="text-lg">
              Faculty Dashboard - Monitor student progress and manage content
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold">{stats.activeStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Quizzes</p>
                  <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold">{stats.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Student Management
              </CardTitle>
              <CardDescription>View and manage student profiles and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Students</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                Content Management
              </CardTitle>
              <CardDescription>Create and edit quiz questions and lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">Manage Content</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Analytics
              </CardTitle>
              <CardDescription>View detailed analytics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">View Analytics</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest student activities and quiz completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { student: "Alice Johnson", action: "Completed French Quiz", score: "85%", time: "2 hours ago" },
                { student: "Bob Smith", action: "Started Spanish Course", score: "N/A", time: "4 hours ago" },
                { student: "Carol Davis", action: "Completed German Quiz", score: "92%", time: "6 hours ago" },
                { student: "David Wilson", action: "Completed Italian Quiz", score: "78%", time: "8 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.student}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.score === "N/A" ? "secondary" : "default"}>{activity.score}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
