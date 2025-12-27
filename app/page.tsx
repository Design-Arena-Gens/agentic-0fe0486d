import { AgentControlPanel } from '@/components/AgentControlPanel';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16">
        <header className="flex flex-col gap-6 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Autonomous shorts creative suite
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Trend-surfing agent that scripts, produces, and ships YouTube
            Shorts for you.
          </h1>
          <p className="text-base text-slate-300 md:text-lg">
            Shortwave Agent monitors hot-performing shorts, reverse-engineers
            their structure, generates a fresh script, builds AI-driven visuals
            + voiceover, then deploys directly to your channel. Zero editing
            timelines, zero manual uploads.
          </p>
        </header>
        <AgentControlPanel />
      </div>
    </main>
  );
}
