import { createRoute, RouteHandler, z } from '@hono/zod-openapi';
import { CreateTaskSchema, TaskSchema } from '../../models/task';
import { ErrorResponse } from '../../models/error';

type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;

export const createTasksRoute = createRoute({
    path: '/',
    method: 'post',
    description: '新たにタスクを登録します',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: CreateTaskSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {
                    schema: TaskSchema,
                },
            },
        },
        500: {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: ErrorResponse,
                },
            },
        },
    },
});

type TaskSchema = z.infer<typeof TaskSchema>;

export const createTasksHandler: RouteHandler<
    typeof createTasksRoute,
    {}
> = async (c) => {
    try {
        const newTask = await c.req.json<CreateTaskSchema>();
        const uuid = crypto.randomUUID();
        const task: TaskSchema = {
            uuid,
            ...newTask,
        };

        return c.json(task, 200);
    } catch (e) {
        console.error(e);
        return c.json(
            {
                message: 'Internal Server Error',
                stackTrace: e instanceof Error ? e.stack : undefined,
            },
            500
        );
    }
};