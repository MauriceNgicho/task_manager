'use client'

import EditTaskForm from '@/components/forms/EditTaskForm'
import { notFound } from 'next/navigation'

interface EditTaskPageProps {
  params: {
    id: string
  }
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = params

  if (!id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-4xl px-4">
        <EditTaskForm taskId={id} />
      </div>
    </div>
  )
}
