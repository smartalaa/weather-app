import express from 'express';
import fetch from 'node-fetch';
import { LRUCache } from 'lru-cache';

const app = express();
const PORT = process.env.PORT || 8787;
const OWM_KEY = process.env.OWM_KEY!;
if (!OWM_KEY) {
  console.error('Missing OWM_KEY environment variable');
  process.exit(1);
}

const cache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5 // 5 minutes
});

async function fetchJSON(url: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upstream error ${res.status}: ${text}`);
    }
    return res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

function kelvinToC(k: number) { return k - 273.15; }

function normalize(current: any, forecast: any) {
  const currentNorm = {
    locationName: current.name,
    lat: current.coord.lat,
    lon: current.coord.lon,
    timestamp: current.dt * 1000,
    timezoneOffset: forecast.timezone_offset * 1000,
    temperatureC: kelvinToC(current.main.temp),
    feelsLikeC: kelvinToC(current.main.feels_like),
    humidityPct: current.main.humidity,
    windSpeedMps: current.wind.speed,
    windDeg: current.wind.deg,
    description: current.weather[0].description,
    icon: current.weather[0].icon
  };

  const daily = forecast.daily.slice(0,7).map((d: any) => ({
    date: new Date(d.dt * 1000).toISOString().split('T')[0],
    minTempC: kelvinToC(d.temp.min),
    maxTempC: kelvinToC(d.temp.max),
    description: d.weather[0].description,
    icon: d.weather[0].icon
  }));

  return {
    current: currentNorm,
    daily,
    fetchedAt: Date.now(),
    source: 'openweather'
  };
}

app.get('/api/weather', async (req, res) => {
  try {
    const city = (req.query.city as string || '').trim();
    if (!city) return res.status(400).json({ error: 'city required' });

    const cacheKey = `weather:${city.toLowerCase()}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.set('X-Cache', 'HIT').json(cached);
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OWM_KEY}`;
    const current = await fetchJSON(currentUrl) as any;

    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${current.coord.lat}&lon=${current.coord.lon}&appid=${OWM_KEY}`;
    const forecast = await fetchJSON(oneCallUrl) as any;

    const normalized = normalize(current, forecast);
    cache.set(cacheKey, normalized);

    res.set('Cache-Control', 'public, max-age=60');
    res.set('X-Cache', 'MISS');
    res.json(normalized);
  } catch (e: any) {
    console.error(e);
    if (/city not found/i.test(e.message)) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.status(500).json({ error: 'Internal error', detail: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy listening on :${PORT}`);
});