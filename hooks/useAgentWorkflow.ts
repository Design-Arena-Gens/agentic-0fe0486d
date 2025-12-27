'use client';

import { useCallback, useState } from 'react';
import type {
  AgentRunResult,
  GeneratedAsset,
  GeneratedScript,
  TrendingShort
} from '@/lib/types';

export const useAgentWorkflow = () => {
  const [trending, setTrending] = useState<TrendingShort[]>([]);
  const [selected, setSelected] = useState<TrendingShort | null>(null);
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [asset, setAsset] = useState<GeneratedAsset | null>(null);
  const [upload, setUpload] = useState<AgentRunResult['upload']>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAgent = useCallback(
    async (payload: {
      regionCode: string;
      targetAudience: string;
      creativeAngle: string;
      topic?: string;
      runUpload: boolean;
    }) => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.error ?? 'Agent run failed');
        }
        const result = (await response.json()) as AgentRunResult;
        setTrending(result.trending);
        setSelected(result.trending[0] ?? null);
        setScript(result.script);
        setAsset(result.assets[0] ?? null);
        setUpload(result.upload);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    trending,
    selected,
    script,
    asset,
    upload,
    loading,
    error,
    runAgent,
    setSelected
  };
};
