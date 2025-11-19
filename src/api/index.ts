import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { tasksApi } from './tasks';
import { basicAuth } from 'hono/basic-auth';
import { bearerAuth } from 'hono/bearer-auth';
import { Hono } from 'hono';

export const api = new OpenAPIHono();

// tasksApi に認証を適用するためのラッパー
const protectedTasksApi = new Hono()
    .use(
        '/*',
        bearerAuth({
            token: 'token', // デモ用なので固定
        })
    )
    .route('/', tasksApi);

api
    .route('/tasks', protectedTasksApi)
    .doc('/specification', {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
        },
    })
    .use('/doc/*', async (c, next) => {
        const auth = basicAuth({
            username: 'user', // 本来は環境変数等でちゃんと値を設定
            password: 'pass', // 今回は固定
        });
        return auth(c, next);
    })
    .get(
        '/doc',
        swaggerUI({
            url: '/api/specification',
        })
    );