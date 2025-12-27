'use client';

import Image from 'next/image';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { StatPill } from './StatPill';
import type { TrendingShort } from '@/lib/types';

type TrendingCardProps = {
  item: TrendingShort;
  selected?: boolean;
  onSelect?: (item: TrendingShort) => void;
};

export function TrendingCard({
  item,
  selected,
  onSelect
}: TrendingCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={`group flex w-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-left transition duration-200 hover:border-primary hover:bg-slate-900 ${selected ? 'border-primary bg-slate-900' : ''}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          <ArrowTrendingUpIcon className="h-3.5 w-3.5" />
          trending
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-slate-100 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-slate-400">{item.channelTitle}</p>
        <div className="flex flex-wrap items-center gap-2">
          <StatPill label="Views" value={item.viewCount.toLocaleString()} />
          <StatPill
            label="Likes"
            value={item.likeCount.toLocaleString()}
            tone="muted"
          />
          <StatPill
            label="Comments"
            value={item.commentCount.toLocaleString()}
            tone="muted"
          />
        </div>
        <p className="text-xs text-slate-400 line-clamp-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300"
            >
              #{topic}
            </span>
          ))}
        </div>
        <div className="text-[11px] text-slate-500">
          Published{' '}
          {formatDistanceToNow(new Date(item.publishedAt), {
            addSuffix: true
          })}
        </div>
      </div>
    </button>
  );
}
