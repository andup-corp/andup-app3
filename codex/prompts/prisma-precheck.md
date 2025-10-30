目的：
PrismaでDBにテーブルを作る前提をすべて確認したい。特に「prisma/schema.prisma がある」「.env に POSTGRES_URL がある」「Vercel で Postgres を1つ作っている」という3つをチェックしたい。

やってほしいこと：
1. 前提として必要なファイルと環境を一覧で出す（prisma/schema.prisma, .env, POSTGRES_URL, Vercel Postgres）。
2. それぞれの作り方を1〜2行で書く。
3. 最後に実行するコマンドとして `npx prisma format` → `npx prisma db push` を出す。
4. よくあるエラー3つと直し方も出す。

出力形式：
- 箇条書き
- 最後にコマンドを ```bash``` で囲んで出す
