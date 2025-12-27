'use client';

import { useState } from 'react';
import { useAgentWorkflow } from '@/hooks/useAgentWorkflow';
import { TrendingCard } from './TrendingCard';
import { ScriptViewer } from './ScriptViewer';
import { VideoAssetViewer } from './VideoAssetViewer';
import { StatPill } from './StatPill';

export function AgentControlPanel() {
  const {
    trending,
    selected,
    script,
    asset,
    upload,
    loading,
    runAgent,
    error,
    setSelected
  } = useAgentWorkflow();
  const [regionCode, setRegionCode] = useState('US');
  const [targetAudience, setTargetAudience] = useState(
    'Gen Z crypto-curious viewers'
  );
  const [creativeAngle, setCreativeAngle] = useState(
    'High-energy storytelling with surprising twist and data-backed insights'
  );
  const [topic, setTopic] = useState('AI crypto opportunities');
  const [autoUpload, setAutoUpload] = useState(false);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <header className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-100">
            Agent Mission Control
          </h2>
          <p className="text-sm text-slate-400">
            Configure the autonomous workflow: trending intelligence →
            script engine → media generation → YouTube deploy.
          </p>
        </header>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            void runAgent({
              regionCode,
              targetAudience,
              creativeAngle,
              topic,
              runUpload: autoUpload
            });
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Region
            </span>
            <input
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              value={regionCode}
              maxLength={2}
              onChange={(event) =>
                setRegionCode(event.target.value.toUpperCase())
              }
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Focus Topic
            </span>
            <input
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Optional — e.g. Web3 AI productivity"
            />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Target Audience
            </span>
            <input
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              value={targetAudience}
              onChange={(event) => setTargetAudience(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Creative Angle
            </span>
            <textarea
              className="min-h-[80px] rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              value={creativeAngle}
              onChange={(event) => setCreativeAngle(event.target.value)}
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary"
              checked={autoUpload}
              onChange={(event) => setAutoUpload(event.target.checked)}
            />
            Auto-upload finished short to YouTube
          </label>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {loading ? 'Agent Running…' : 'Run Autonomous Agent'}
            </button>
          </div>
        </form>
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}
      </section>

      <section className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">
            Trending Shorts Intelligence
          </h3>
          <div className="flex gap-2">
            <StatPill
              label="Candidates"
              value={trending.length.toString()}
              tone="accent"
            />
            {selected && (
              <StatPill label="Selected" value={selected.title} />
            )}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trending.map((item) => (
            <TrendingCard
              key={item.id}
              item={item}
              selected={selected?.id === item.id}
              onSelect={setSelected}
            />
          ))}
          {!trending.length && !loading && (
            <div className="col-span-3">
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center text-sm text-slate-500">
                Run the agent to populate trending signals.
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">
              Script Engine Output
            </h3>
          </div>
          <ScriptViewer script={script} />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-100">
              Generated Media
            </h3>
          </div>
          <VideoAssetViewer
            asset={asset}
            onDownload={() => {
              if (asset) {
                const link = document.createElement('a');
                link.href = asset.url;
                link.download = `${asset.id}.mp4`;
                link.click();
              }
            }}
          />
          {upload && (
            <div className="rounded-xl border border-emerald-600/30 bg-emerald-600/10 p-4 text-sm text-emerald-200">
              Uploaded:{' '}
              <a
                href={upload.url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {upload.title}
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
