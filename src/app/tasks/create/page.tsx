import { Suspense } from 'react'
import CreateTaskForm from '@/components/forms/CreateTaskForm'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function CreateTaskPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-64">
              <div className="text-lg">Loading...</div>
            </div>
          }>
            <CreateTaskForm />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  )
}
