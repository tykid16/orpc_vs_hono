import { OpenAPIHono } from '@hono/zod-openapi';
import { createTasksHandler, createTasksRoute } from './createTasks';
import { getTasksHandler, getTasksRoute } from './getTasks';

export const tasksApi = new OpenAPIHono();

tasksApi
    .openapi(getTasksRoute, getTasksHandler)
    .openapi(createTasksRoute, createTasksHandler);