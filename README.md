# LinguaLearn - Language Learning Platform

A comprehensive MERN stack language learning platform similar to Duolingo, built with Next.js, MongoDB, and modern React components.

## Features

### 🎯 Core Functionality
- **Multi-language Support**: Learn from 10 different languages (French, Spanish, Hindi, English, Japanese, Chinese, German, Italian, Korean, Portuguese)
- **Dual Login System**: Separate authentication for Users and Faculty
- **Interactive Quizzes**: Multiple-choice questions with immediate feedback
- **Progress Tracking**: Day-wise completion tracking with visual indicators
- **Gamification**: Coins, streaks, and efficiency scoring system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 👤 User Features
- **Registration & Authentication**: Secure user registration with JWT authentication
- **Personal Dashboard**: Welcome message, progress overview, and motivational quotes
- **Learning Interface**: Interactive quiz system with 10 questions per day
- **Progress Visualization**: Weekly calendar showing completed days
- **Reward System**: Earn coins based on performance (10 coins for 70%+ efficiency, 5 coins for completion)
- **Relearn Option**: Retry quizzes for additional practice and coins
- **Level Progression**: Beginner → Intermediate → Advanced based on progress

### 👨‍🏫 Faculty Features
- **Faculty Dashboard**: Overview of student statistics and activities
- **Student Management**: Monitor student progress and performance
- **Content Management**: Ability to manage quiz questions and lessons
- **Analytics**: View detailed reports and student analytics

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icons

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally or MongoDB Atlas account

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd lingualearn-platform
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Create a `.env.local` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/lingualearn
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
\`\`\`

### 4. Start MongoDB
Make sure MongoDB is running on your system:
\`\`\`bash
# For local MongoDB installation
mongod

# Or use MongoDB Atlas cloud connection
\`\`\`

### 5. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### User Model
\`\`\`javascript
{
  fullName: String,
  email: String (unique),
  mobile: String,
  collegeEmail: String (optional),
  selectedLanguage: String (enum),
  password: String (hashed),
  userType: String (user/faculty),
  createdAt: Date,
  lastLogin: Date
}
\`\`\`

### Progress Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  completedDays: [Number], // 0-6 for Mon-Sun
  streak: Number,
  coins: Number,
  currentDay: Number,
  level: String (Beginner/Intermediate/Advanced),
  efficiency: Number (0-100),
  totalQuizzesCompleted: Number,
  totalCorrectAnswers: Number,
  lastQuizDate: Date
}
\`\`\`

### Quiz Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  language: String,
  questions: [{
    questionId: String,
    question: String,
    selectedAnswer: Number,
    correctAnswer: Number,
    isCorrect: Boolean
  }],
  score: Number,
  totalQuestions: Number,
  efficiency: Number,
  coinsEarned: Number,
  completedAt: Date,
  dayOfWeek: Number
}
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User/Faculty login

### User Management
- `GET /api/user/progress` - Get user progress data

### Quiz System
- `GET /api/quiz/questions` - Get quiz questions for user's language
- `POST /api/quiz/complete` - Submit quiz completion and update progress

## Usage Guide

### For Students
1. **Registration**: Create account with personal details and select a language to learn
2. **Login**: Use User Login to access the student dashboard
3. **Dashboard**: View progress, streak, coins, and motivational quotes
4. **Learning**: Click "Let's Go" to start daily quiz (10 questions)
5. **Progress**: Complete quizzes to earn coins and maintain streaks
6. **Relearn**: Retry completed quizzes for additional practice

### For Faculty
1. **Login**: Use Faculty Login to access the teaching dashboard
2. **Dashboard**: View student statistics and recent activities
3. **Management**: Access student management and content creation tools
4. **Analytics**: Monitor student progress and performance metrics

## Deployment

### Frontend (Vercel)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

### Environment Variables for Production
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lingualearn
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-nextauth-secret
\`\`\`

## Features in Detail

### Gamification System
- **Coins**: Earn 10 coins for 70%+ efficiency, 5 coins for completion
- **Streaks**: Maintain daily learning streaks
- **Levels**: Progress from Beginner to Advanced based on completed days
- **Efficiency Scoring**: Performance-based scoring system

### Quiz System
- **Multiple Languages**: Tailored questions for each supported language
- **Difficulty Levels**: Easy, Medium, and Hard questions
- **Immediate Feedback**: Visual indicators for correct/incorrect answers
- **Progress Tracking**: Day-wise completion with visual calendar

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Support**: Full desktop experience
- **Modern UI**: Clean, intuitive interface using shadcn/ui components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**LinguaLearn** - Making language learning accessible, engaging, and fun! 🌍📚
