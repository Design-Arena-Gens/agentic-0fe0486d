# Shortwave Agent

Autonomous Next.js agent that scouts trending YouTube Shorts, synthesises a fresh script, generates an AI-produced video asset, and optionally uploads the finished short straight to your channel.

## Features

- Trending Shorts intelligence layer powered by the YouTube Data API
- Script engine using OpenAI Responses API with JSON-mode output
- AI media generation via Replicate (configurable model + voice)
- Optional direct upload to YouTube with OAuth2 refresh-token flow
- Vercel Blob persistence for generated assets
- Sleek Tailwind + Framer Motion interface with live status indicators

## Quickstart

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to launch the mission control dashboard.

### Required Environment Variables

Set these secrets locally (e.g. via `.env.local`) and in Vercel before deploying:

- `OPENAI_API_KEY` – used for script + copy generation
- `YOUTUBE_API_KEY` – used for trending discovery
- `REPLICATE_API_TOKEN` – used for video synthesis
- `REPLICATE_SHORTS_MODEL_VERSION` *(optional)* – overrides default model
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_REDIRECT_URI` *(optional; defaults to OAuth playground)*
- `BLOB_READ_WRITE_TOKEN` *(if using Vercel Blob outside Vercel runtime)*

## Available Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm start` – run production server
- `npm run lint` – lint with Next.js config
- `npm test` – Jest + Testing Library

## Deployment

1. Ensure environment variables are configured in Vercel.
2. `npm run build` to verify locally.
3. Deploy with `vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-0fe0486d`.

## Architecture

- **Next.js App Router** for UI + API routes
- **Zod** for payload validation
- **Google APIs** SDK for direct channel uploads
- **Vercel Blob** for storing generated mp4 assets
- **Tailwind CSS** for styling, **Headless UI** for primitives

## Notes

- Auto upload requires YouTube API quota + Shorts eligibility.
- Replicate polling interval and duration limits are configurable.
- Extend `lib/agent.ts` to plug in additional creative steps (thumbnails, subtitles, social drip, etc.).
