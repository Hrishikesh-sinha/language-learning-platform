"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, ArrowLeft, Users, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [loginType, setLoginType] = useState("user")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "faculty" || type === "user") {
      setLoginType(type)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userType: loginType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        toast({
          title: "Success",
          description: "Login successful!",
        })

        if (loginType === "user") {
          router.push("/dashboard")
        } else {
          router.push("/faculty-dashboard")
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Login failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">LinguaLearn</h1>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            {loginType === "user" ? (
              <Users className="h-6 w-6 text-green-600" />
            ) : (
              <BookOpen className="h-6 w-6 text-blue-600" />
            )}
            <CardTitle className="text-2xl">{loginType === "user" ? "User Login" : "Faculty Login"}</CardTitle>
          </div>
          <CardDescription>
            {loginType === "user"
              ? "Welcome back! Continue your language learning journey"
              : "Access your teaching dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className={`w-full ${loginType === "user" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {loginType === "user" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold">
                  Create one here
                </Link>
              </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Looking for {loginType === "user" ? "Faculty" : "User"} login?{" "}
              <Link
                href={`/login?type=${loginType === "user" ? "faculty" : "user"}`}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Switch here
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <Link href="/" className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
