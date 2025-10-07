import React, { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (c: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) {
          onSearch(value.trim());
          setValue('');
        }
      }}
      className="search-bar"
      aria-label="City search"
    >
      <input
        type="text"
        placeholder="Search city..."
        value={value}
        onChange={e => setValue(e.target.value)}
        aria-label="City name"
      />
      <button type="submit">Go</button>
    </form>
  );
}