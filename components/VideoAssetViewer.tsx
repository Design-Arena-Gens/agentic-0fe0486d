'use client';

import { GeneratedAsset } from '@/lib/types';

type VideoAssetViewerProps = {
  asset: GeneratedAsset | null;
  onDownload?: () => void;
};

export function VideoAssetViewer({
  asset,
  onDownload
}: VideoAssetViewerProps) {
  if (!asset) {
    return (
      <div className="flex h-full min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-sm text-slate-500">
        Generated video preview will appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          src={asset.url}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>
          Format: {asset.format.toUpperCase()} • Duration:{' '}
          {asset.duration ?? 45}s
        </span>
        <button
          type="button"
          onClick={onDownload}
          className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/20"
        >
          Download
        </button>
      </div>
    </div>
  );
}
