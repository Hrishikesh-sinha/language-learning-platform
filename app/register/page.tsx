"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const languages = [
  "French",
  "Spanish",
  "Hindi",
  "English",
  "Japanese",
  "Chinese",
  "German",
  "Italian",
  "Korean",
  "Portuguese",
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    collegeEmail: "",
    selectedLanguage: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Registration successful! Please login to continue.",
        })
        router.push("/login?type=user")
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join thousands of language learners worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
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
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter your mobile number"
              />
            </div>

            <div>
              <Label htmlFor="collegeEmail">College Email ID (Optional)</Label>
              <Input
                id="collegeEmail"
                type="email"
                value={formData.collegeEmail}
                onChange={(e) => setFormData({ ...formData, collegeEmail: e.target.value })}
                placeholder="Enter your college email"
              />
            </div>

            <div>
              <Label htmlFor="language">Select Language to Learn *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, selectedLanguage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login?type=user" className="text-green-600 hover:text-green-700 font-semibold">
                Sign in here
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
