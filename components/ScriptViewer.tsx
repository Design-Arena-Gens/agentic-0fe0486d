'use client';

import { Fragment } from 'react';
import { GeneratedScript } from '@/lib/types';

type ScriptViewerProps = {
  script: GeneratedScript | null;
};

export function ScriptViewer({ script }: ScriptViewerProps) {
  if (!script) {
    return (
      <div className="flex h-full min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-sm text-slate-500">
        Script will appear here after generation.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <header className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-50">
          Hook & CTA
        </h3>
        <p className="rounded-xl bg-primary/10 p-4 text-sm text-primary">
          {script.hook}
        </p>
        <p className="rounded-xl bg-slate-800/40 p-4 text-sm text-slate-200">
          {script.callToAction}
        </p>
      </header>
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-50">
          Narrative Flow
        </h3>
        <div className="grid gap-4">
          {script.narrative.map((segment, index) => (
            <div
              key={`${segment.label}-${index}`}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>{segment.label}</span>
                <span>Beat {index + 1}</span>
              </div>
              <p className="mt-2 text-sm text-slate-100">
                {segment.content}
              </p>
              {segment.beats && (
                <div className="mt-3 text-xs text-slate-400">
                  <span className="font-medium text-slate-200">
                    Beats:
                  </span>{' '}
                  {segment.beats.join(' • ')}
                </div>
              )}
              {segment.bRollIdeas && (
                <div className="mt-3 text-xs text-slate-400">
                  <span className="font-medium text-slate-200">
                    B-roll:
                  </span>{' '}
                  {segment.bRollIdeas.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-50">
          Outro
        </h3>
        <p className="rounded-xl bg-slate-900/80 p-4 text-sm text-slate-100">
          {script.outro}
        </p>
      </section>
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-50">
          Publishing Toolkit
        </h3>
        <div className="flex flex-wrap gap-2">
          {script.titleIdeas.map((title) => (
            <span
              key={title}
              className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {title}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {script.hashtags.map((tag) => (
            <Fragment key={tag}>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                #{tag.replace(/^#/, '')}
              </span>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
