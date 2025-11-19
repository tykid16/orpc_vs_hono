# orpc_vs_hono

Hono + Zod + OpenAPI を使用したタスク管理 API のデモプロジェクト

## 🚀 セットアップ

### インストール

```bash
bun install
```

### 開発サーバー起動

```bash
bun dev
```

サーバーは `http://localhost:8787` で起動します。

### デプロイ

```bash
bun run deploy
```

## 📚 API ドキュメント

### Swagger UI

`http://localhost:8787/api/doc` でインタラクティブな API ドキュメントにアクセスできます。

**認証情報:**
- Username: `user`
- Password: `pass`

### OpenAPI 仕様

`http://localhost:8787/api/specification` で OpenAPI 仕様を JSON 形式で取得できます。

## 🔐 認証

### Tasks API - Bearer 認証

`/api/tasks` 配下のすべてのエンドポイントは Bearer トークン認証が必要です。

**トークン:** `token`

**使用例:**

```bash
curl -H "Authorization: Bearer token" http://localhost:8787/api/tasks
```

### Swagger UI - Basic 認証

Swagger UI へのアクセスには Basic 認証が必要です。

- Username: `user`
- Password: `pass`

## 📝 API エンドポイント

### タスク一覧取得

```bash
GET /api/tasks

# 例
curl -H "Authorization: Bearer token" http://localhost:8787/api/tasks?pretty
```

**レスポンス:**

```json
[
  {
    "uuid": "12345678-e29b-41d4-a716-123456789000",
    "title": "Buy Groceries",
    "description": "Purchase milk, eggs, and bread from the store",
    "completed": false,
    "priority": 2
  }
]
```

### タスク作成

```bash
POST /api/tasks

# 例
curl -X POST \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "priority": 3,
    "completed": false
  }' \
  http://localhost:8787/api/tasks?pretty
```

**リクエストボディ:**

```json
{
  "title": "string",
  "description": "string",
  "priority": 1-5 (デフォルト: 3),
  "completed": boolean (デフォルト: false)
}
```

**レスポンス:**

```json
{
  "uuid": "generated-uuid",
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": 3
}
```

## 🛠️ 技術スタック

- **[Hono](https://hono.dev/)** - 高速な Web フレームワーク
- **[@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)** - Zod スキーマから OpenAPI 仕様を自動生成
- **[Zod](https://zod.dev/)** - TypeScript-first なスキーマバリデーション
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - エッジコンピューティングプラットフォーム

## 📁 プロジェクト構造

```
src/
├── index.ts              # アプリケーションのエントリーポイント
├── api/
│   ├── index.ts          # API ルーターと Swagger UI の設定
│   └── tasks/
│       ├── index.ts      # タスク API ルーター
│       ├── getTasks.ts   # タスク一覧取得エンドポイント
│       └── createTasks.ts # タスク作成エンドポイント
└── models/
    ├── index.ts          # モデルのエクスポート
    ├── task.ts           # タスクスキーマ定義
    └── error.ts          # エラーレスポンススキーマ
```

## 🔧 型生成

Cloudflare Workers の設定に基づいて型を生成・同期する場合:

```bash
bun run cf-typegen
```

生成された型を使用する場合：

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
