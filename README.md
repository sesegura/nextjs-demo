# NextJS Demo

Here we have a simple app inspired by [Sora](https://sora.com/). Consists on
an image generation via prompts, which saves them into a simple Prisma SQLite DB
so they can later be re-mixed.

## Stack

- React 19
- Next 15
- Prisma
- OpenAI
- ShadCN

## How to run

1. Setup `.env` with `$ cp .env.example .env` and replace OpenAI values
2. Install dependencies: `$ npm i`
3. Setup SQLite database: `$ npx prisma migrate dev`
4. Start dev server: `$ npm run dev`
5. Go to http://localhost:3000
