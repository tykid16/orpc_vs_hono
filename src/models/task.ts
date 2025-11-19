import { z } from '@hono/zod-openapi';

export const TaskSchema = z
  .object({
    uuid: z.string().openapi({
      example: '12345678-e29b-41d4-a716-123456789000',
    }),
    title: z.string().openapi({
      example: 'Title',
    }),
    description: z.string().openapi({
      example: 'Description',
    }),
    completed: z.boolean().openapi({
      example: false,
    }),
    priority: z.number().min(1).max(5).openapi({
      example: 3,
    }), // タスクの優先度（1〜5）
  })
  .openapi('TaskSchema');

// 新しいタスク作成用のリクエストモデル
export const CreateTaskSchema = z
  .object({
    title: z.string().openapi({
      example: 'Title',
    }),
    description: z.string().openapi({
      example: 'Description',
    }),
    priority: z.number().min(1).max(5).default(3).openapi({
      example: 3,
    }),
    completed: z.boolean().default(false).openapi({
      example: false,
    }),
  })
  .openapi('CreateTaskSchema');

// タスクのレスポンスモデル
export const TaskListSchema = z.array(TaskSchema).openapi('TaskListSchema');