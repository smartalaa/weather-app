import React from 'react';
import { toUnit } from '../lib/format';

export default function CurrentPanel({ data, unit }: { data: any; unit: 'metric' | 'imperial' }) {
  const temp = toUnit(data.temperatureC, unit);
  const feels = toUnit(data.feelsLikeC, unit);
  return (
    <section className="current" aria-labelledby="current-heading">
      <h2 id="current-heading">{data.locationName}</h2>
      <div className="current-main">
        <div className="temp">{temp.value.toFixed(1)}°{temp.symbol}</div>
        <div className="desc">
          <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} />
          <span>{data.description}</span>
        </div>
      </div>
      <ul className="stats">
        <li>Feels: {feels.value.toFixed(1)}°{feels.symbol}</li>
        <li>Humidity: {data.humidityPct}%</li>
        <li>Wind: {data.windSpeedMps.toFixed(1)} m/s</li>
      </ul>
    </section>
  );
}