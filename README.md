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
- Tailwind

## How to run

1. Setup `.env` with `$ cp .env.example .env` and replace OpenAI values
2. Install dependencies: `$ npm i`
3. Setup SQLite database: `$ npx prisma migrate dev`
4. Start dev server: `$ npm run dev`
5. Go to http://localhost:3000

## Areas of improvement

- [ ] Support edits on non-OpenAI images (URLs instead of base64)
- [ ] Image gallery infinite scroll
- [ ] Better grid for gallery
- [ ] Better image generation model once available
- [ ] Better loading states
- [ ] Error handling
