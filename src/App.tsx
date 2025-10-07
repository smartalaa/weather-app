import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentPanel from './components/CurrentPanel';
import DailyForecast from './components/DailyForecast';
import UnitToggle from './components/UnitToggle';
import Favorites from './components/Favorites';

export default function App() {
  const [city, setCity] = useState('London');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const { data, loading, error, refetch, stale } = useWeather(city);

  return (
    <div className="app">
      <header>
        <h1>Weather Dashboard</h1>
        <div className="controls">
          <SearchBar onSearch={c => setCity(c)} />
          <UnitToggle value={unit} onChange={setUnit} />
          <button onClick={() => refetch()}>Refresh</button>
        </div>
        <Favorites current={city} onSelect={setCity} />
        {stale && <div className="badge stale">Showing cached data</div>}
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {data && !loading && !error && (
          <>
            <CurrentPanel data={data.current} unit={unit} />
            <DailyForecast daily={data.daily} unit={unit} />
          </>
        )}
      </main>
      <footer>
        <small>Data from OpenWeatherMap. Built for demo purposes.</small>
      </footer>
    </div>
  );
}