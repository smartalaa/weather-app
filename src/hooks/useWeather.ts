import { useEffect, useState, useCallback } from 'react';
import { loadCache, saveCache } from '../lib/storage';

interface WeatherBundle {
  current: any;
  daily: any[];
  fetchedAt: number;
}

const STALE_TTL = 1000 * 60 * 5;

export function useWeather(city: string) {
  const [data, setData] = useState<WeatherBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (force = false) => {
    setError(null);
    const cacheKey = `weather:${city.toLowerCase()}`;
    const cached = loadCache<WeatherBundle>(cacheKey);
    const isFresh = cached && (Date.now() - cached.fetchedAt) < STALE_TTL;

    if (cached && isFresh && !force) {
      setData(cached);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) {
        throw new Error((await res.json()).error || 'Fetch error');
      }
      const json = await res.json();
      saveCache(cacheKey, json);
      setData(json);
    } catch (e: any) {
      if (cached) {
        // show stale
        setData(cached);
      }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stale = data ? (Date.now() - data.fetchedAt) > STALE_TTL : false;

  return {
    data, loading, error, stale,
    refetch: () => fetchData(true)
  };
}