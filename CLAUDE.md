# CLAUDE.md

このファイルは、このリポジトリでコードを作業する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## 開発コマンド

- `npm run dev` - Turbopackを使用した高速な開発サーバーの起動
- `npm run build` - 本番用アプリケーションのビルド
- `npm start` - 本番サーバーの起動
- `npm run lint` - ESLintによるコード品質チェック

## プロジェクトアーキテクチャ

これはApp RouterアーキテクチャとTypeScript、Tailwind CSSを使用したNext.js 15アプリケーションです。典型的なNext.js構造に従っています。

### 主要技術
- **Next.js 15** with App Router（Pages Routerではない）
- **React 19** with TypeScript
- **Tailwind CSS 4** スタイリング用
- **ESLint** Next.js設定付き

### 認証システム
アプリはRailsライクなAPIバックエンドを使用したカスタム認証システムを実装しています：

- **AuthClientクラス** (`src/lib/auth.ts`): 認証API呼び出しを処理
- **トークンベース認証**: localStorageに保存された`access-token`、`client`、`uid`ヘッダーを使用
- **APIエンドポイント**: 
  - POST `/auth` 新規登録用
  - POST `/auth/sign_in` サインイン用
  - DELETE `/auth/sign_out` サインアウト用
- **ベースAPI URL**: `NEXT_PUBLIC_API_URL`環境変数で設定可能（デフォルト: `http://localhost:3000`）

### コンポーネントアーキテクチャ
- **認証コンポーネント** `src/components/auth/`内:
  - `SigninForm.tsx` - ローディング状態とエラーハンドリング付きの再利用可能なサインインフォーム
  - `SignupForm.tsx` - パスワード確認バリデーション付きの新規登録フォーム
- **認証ページ** `src/app/auth/`内:
  - フォームをラップしてナビゲーションを処理するページコンポーネント
- すべての認証コンポーネントはUIテキストに日本語を使用
- フォームには適切なローディング状態、エラーハンドリング、フォームバリデーションが含まれる

### スタイリングパターン
- 一貫したオレンジ/赤のグラデーションテーマでTailwind CSSを使用
- 認証フロー全体でカスタムの料理テーマアイコンと絵文字
- 認証ページでのグラデーション背景とカードベースレイアウト
- モバイルファーストアプローチによるレスポンシブデザイン

### パスエイリアス
- `@/*` は `./src/*` にマップされクリーンなインポートを可能にする

### TypeScript設定
- strictモード有効
- Next.jsプラグインが統合済み
- ES2017ターゲットで最新のモジュール解決