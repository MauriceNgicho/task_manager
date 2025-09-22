'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createTaskSchema, type CreateTaskInput } from '@/lib/validations/task'

export async function createTask(formData: CreateTaskInput) {
  // Validate the form data
  const validatedFields = createTaskSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your inputs.',
    }
  }

  const { title, description, category_id, priority, due_date } = validatedFields.data

  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        message: 'You must be logged in to create a task.',
      }
    }

    // If category_id is provided, verify it belongs to the user
    if (category_id) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category_id)
        .eq('user_id', user.id)
        .single()

      if (categoryError || !category) {
        return {
          message: 'Invalid category selected.',
        }
      }
    }

    // Create the task
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .insert({
        title,
        description: description || null,
        category_id: category_id || null,
        priority,
        due_date: due_date ? new Date(due_date).toISOString() : null,
        user_id: user.id,
      })
      .select()
      .single()

    if (taskError) {
      console.error('Task creation error:', taskError)
      return {
        message: 'Failed to create task. Please try again.',
      }
    }

    // Revalidate the dashboard page to show the new task
    revalidatePath('/dashboard')
    
    return {
      success: true,
      task,
    }
  } catch (error) {
    console.error('Unexpected error creating task:', error)
    return {
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function getCategories() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        categories: [],
        error: 'You must be logged in to view categories.',
      }
    }

    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, color')
      .eq('user_id', user.id)
      .order('name')

    if (categoriesError) {
      console.error('Categories fetch error:', categoriesError)
      return {
        categories: [],
        error: 'Failed to fetch categories.',
      }
    }

    return {
      categories: categories || [],
      error: null,
    }
  } catch (error) {
    console.error('Unexpected error fetching categories:', error)
    return {
      categories: [],
      error: 'An unexpected error occurred while fetching categories.',
    }
  }
}

export async function getTasks() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        tasks: [],
        error: 'You must be logged in to view tasks.',
      }
    }

    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select(`
        id,
        title,
        description,
        status,
        priority,
        due_date,
        completed_at,
        created_at,
        updated_at,
        category_id,
        categories (
          id,
          name,
          color
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (tasksError) {
      console.error('Tasks fetch error:', tasksError)
      return {
        tasks: [],
        error: 'Failed to fetch tasks.',
      }
    }

    return {
      tasks: tasks || [],
      error: null,
    }
  } catch (error) {
    console.error('Unexpected error fetching tasks:', error)
    return {
      tasks: [],
      error: 'An unexpected error occurred while fetching tasks.',
    }
  }
}

export async function updateTaskStatus(taskId: string, status: string) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        message: 'You must be logged in to update tasks.',
      }
    }

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Task update error:', updateError)
      return {
        message: 'Failed to update task status.',
      }
    }

    // Revalidate the dashboard page
    revalidatePath('/dashboard')
    
    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error updating task:', error)
    return {
      message: 'An unexpected error occurred while updating the task.',
    }
  }
}

// ... (existing code)

export async function deleteTask(taskId: string) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        message: 'You must be logged in to delete tasks.',
      }
    }

    const { error: deleteError } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Task deletion error:', deleteError)
      return {
        message: 'Failed to delete task.',
      }
    }

    // Revalidate the dashboard page
    revalidatePath('/dashboard')
    
    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error deleting task:', error)
    return {
      message: 'An unexpected error occurred while deleting the task.',
    }
  }
}

export async function getTaskById(taskId: string) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        task: null,
        error: 'You must be logged in to view tasks.',
      }
    }

    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (taskError) {
      console.error('Task fetch error:', taskError)
      return {
        task: null,
        error: 'Failed to fetch task.',
      }
    }

    return {
      task,
      error: null,
    }
  } catch (error) {
    console.error('Unexpected error fetching task:', error)
    return {
      task: null,
      error: 'An unexpected error occurred while fetching the task.',
    }
  }
}

export async function updateTask(taskId: string, formData: CreateTaskInput) {
  const validatedFields = createTaskSchema.safeParse(formData)
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your inputs.',
    }
  }

  const { title, description, category_id, priority, due_date } = validatedFields.data

  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return {
        message: 'You must be logged in to update a task.',
      }
    }

    if (category_id) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category_id)
        .eq('user_id', user.id)
        .single()

      if (categoryError || !category) {
        return {
          message: 'Invalid category selected.',
        }
      }
    }

    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .update({
        title,
        description: description || null,
        category_id: category_id || null,
        priority,
        due_date: due_date ? new Date(due_date).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (taskError) {
      console.error('Task update error:', taskError)
      return {
        message: 'Failed to update task. Please try again.',
      }
    }

    revalidatePath('/dashboard')
    revalidatePath(`/tasks/edit/${taskId}`)
    
    return {
      success: true,
      task,
    }
  } catch (error) {
    console.error('Unexpected error updating task:', error)
    return {
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
