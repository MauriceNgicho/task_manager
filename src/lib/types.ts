export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  user_id: string
  name: string
  description?: string
  color: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  category_id?: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date?: string
  completed_at?: string
  created_at: string
  updated_at: string
  category?: Category
}

export interface Subtask {
  id: string
  task_id: string
  user_id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date?: string
  completed_at?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface CreateTaskFormData {
  title: string
  description?: string
  category_id?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date?: string
}

export interface ActionResponse<T = unknown> {
  success?: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

// Type for tasks returned from Supabase with joined category data
export interface TaskWithCategory {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date?: string
  completed_at?: string
  created_at: string
  updated_at: string
  category_id?: string
  categories?: {
    id: string
    name: string
    color: string
  } | null
}
