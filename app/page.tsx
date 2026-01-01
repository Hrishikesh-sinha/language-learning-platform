import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, Globe } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">LinguaLearn</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-green-600">
              Features
            </Link>
            <Link href="#languages" className="text-gray-600 hover:text-green-600">
              Languages
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-green-600">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Learn Languages the Fun Way</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master 10 different languages with our interactive, gamified learning platform. Start your journey today and
          unlock a world of opportunities!
        </p>

        {/* Login Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/login?type=user">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              <Users className="mr-2 h-5 w-5" />
              User Login
            </Button>
          </Link>
          <Link href="/login?type=faculty">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Faculty Login
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-2">New to LinguaLearn?</p>
          <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold underline">
            Create New Account
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose LinguaLearn?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>Gamified Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Earn coins, maintain streaks, and track your progress with our engaging reward system.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Interactive Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn through interactive quizzes with immediate feedback and multiple difficulty levels.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>10 Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from French, Spanish, Hindi, English, Japanese, Chinese, German, Italian, Korean, and Portuguese.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Available Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "French", flag: "🇫🇷" },
              { name: "Spanish", flag: "🇪🇸" },
              { name: "Hindi", flag: "🇮🇳" },
              { name: "English", flag: "🇺🇸" },
              { name: "Japanese", flag: "🇯🇵" },
              { name: "Chinese", flag: "🇨🇳" },
              { name: "German", flag: "🇩🇪" },
              { name: "Italian", flag: "🇮🇹" },
              { name: "Korean", flag: "🇰🇷" },
              { name: "Portuguese", flag: "🇵🇹" },
            ].map((lang) => (
              <div key={lang.name} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-2">{lang.flag}</div>
                <p className="font-medium text-gray-700">{lang.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">LinguaLearn</span>
          </div>
          <p className="text-gray-400">© 2024 LinguaLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
