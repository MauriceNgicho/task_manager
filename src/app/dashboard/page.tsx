import { Suspense } from 'react'
import Link from 'next/link'
import TaskList, { TaskListSkeleton } from '@/components/tasks/TaskList'
import ProtectedRoute from '@/components/ProtectedRoute'
import { signOut } from '@/lib/actions/auth'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Task Manager
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/tasks/create"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Create Task
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Tasks
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Manage your tasks and stay organized
                </p>
                <Link
                  href="/tasks/create"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  + New Task
                </Link>
              </div>
            </div>

            {/* Tasks List */}
            <Suspense fallback={<TaskListSkeleton />}>
              <TaskList />
            </Suspense>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
