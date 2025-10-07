import React, { useEffect, useState } from 'react';
import { loadFavorites, saveFavorites } from '../lib/storage';

export default function Favorites({ current, onSelect }: { current: string; onSelect: (c: string) => void }) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(loadFavorites());
  }, []);

  function toggle() {
    const updated = favs.includes(current)
      ? favs.filter(f => f !== current)
      : [...favs, current];
    setFavs(updated);
    saveFavorites(updated);
  }

  return (
    <div className="favorites">
      <button onClick={toggle}>
        {favs.includes(current) ? '★ Remove Favorite' : '☆ Add Favorite'}
      </button>
      {favs.length > 0 && (
        <ul aria-label="Favorite cities">
          {favs.map(f => (
            <li key={f}>
              <button onClick={() => onSelect(f)}>{f}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}