'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateTaskStatus, deleteTask } from '@/lib/actions/tasks'
import { getPriorityColor, getStatusColor, formatDate } from '@/lib/utils'
import type { TaskWithCategory } from '@/lib/types'

interface TaskCardProps {
  task: TaskWithCategory
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isPending, startTransition] = useTransition()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const router = useRouter()

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      await updateTaskStatus(task.id, newStatus)
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTask(task.id)
    })
  }

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Created: {formatDate(task.created_at)}</span>
            {task.due_date && (
              <span>Due: {formatDate(task.due_date)}</span>
            )}
            {task.categories && (
              <span className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: task.categories.color }}
                ></div>
                {task.categories.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {/* Status Change Dropdown */}
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isPending}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            disabled={isPending}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Edit
          </button>
          
          {/* Delete Button */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isPending}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isPending}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
