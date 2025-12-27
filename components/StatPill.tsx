'use client';

import clsx from 'clsx';

type StatPillProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: 'default' | 'accent' | 'muted';
};

export function StatPill({
  label,
  value,
  icon,
  tone = 'default'
}: StatPillProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide',
        tone === 'default' && 'border-slate-700 bg-slate-900 text-slate-200',
        tone === 'accent' && 'border-primary bg-primary/10 text-primary',
        tone === 'muted' && 'border-slate-800 bg-slate-950 text-slate-400'
      )}
    >
      {icon}
      <span>{label}</span>
      <span className="text-slate-100">{value}</span>
    </div>
  );
}
