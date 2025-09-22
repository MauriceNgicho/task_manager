# 🤖 AI-Powered Task Manager

A sophisticated task management application that leverages artificial intelligence to enhance productivity for individuals and small teams. Built with Next.js, Supabase, and AI integration to provide intelligent task assistance and automated insights.

## ✨ Key Features

### 🧠 AI-Powered Intelligence
- **Smart Task Prioritization**: AI automatically analyzes your tasks and suggests optimal priority ordering based on deadlines, complexity, and importance
- **Intelligent Sub-task Generation**: Automatically breaks down complex tasks into manageable sub-tasks with AI-powered suggestions
- **Weekly Progress Summaries**: Get AI-generated insights and summaries of your productivity patterns and achievements
- **Contextual Recommendations**: Receive intelligent suggestions for task optimization and workflow improvements

### 🔐 Secure Authentication
- User registration and login with email verification
- Protected routes with middleware-based authentication
- Secure session management with Supabase Auth

### 📱 Modern User Experience
- Responsive design that works seamlessly across devices
- Real-time updates and notifications
- Clean, intuitive interface built with Tailwind CSS
- Server-side rendering for optimal performance

### 👥 Team Collaboration (Coming Soon)
- Shared task lists and project management
- Team progress tracking and analytics
- Collaborative AI insights for team productivity

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Authentication & Database**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Language**: TypeScript
- **State Management**: React Server Components + Zustand for client state

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task_manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication in the Supabase dashboard
3. Configure email templates for user verification
4. Add your Supabase URL and anon key to `.env.local`

## 📁 Project Structure
