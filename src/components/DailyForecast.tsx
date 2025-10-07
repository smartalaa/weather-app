import React from 'react';
import { toUnit } from '../lib/format';

export default function DailyForecast({ daily, unit }: { daily: any[]; unit: 'metric' | 'imperial' }) {
  return (
    <section className="forecast" aria-labelledby="forecast-heading">
      <h2 id="forecast-heading">Next 7 Days</h2>
      <div className="forecast-grid">
        {daily.map(day => {
          const min = toUnit(day.minTempC, unit);
            const max = toUnit(day.maxTempC, unit);
          return (
            <div key={day.date} className="forecast-day">
              <div className="date">{day.date}</div>
              <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} />
              <div className="temps">
                <span className="max">{max.value.toFixed(0)}°{max.symbol}</span>
                <span className="min">{min.value.toFixed(0)}°{min.symbol}</span>
              </div>
              <div className="d-desc">{day.description}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}