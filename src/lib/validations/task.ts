import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  category_id: z.string()
    .optional()
    .or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  due_date: z.string()
    .optional()
    .refine((date) => {
      if (!date) return true
      const dueDate = new Date(date)
      const now = new Date()
      return dueDate > now
    }, 'Due date must be in the future'),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
