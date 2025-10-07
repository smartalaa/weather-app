import React from 'react';

export default function UnitToggle({ value, onChange }: { value: 'metric' | 'imperial'; onChange: (v: any) => void }) {
  return (
    <div className="unit-toggle" role="radiogroup" aria-label="Units">
      <label>
        <input
          type="radio"
          name="unit"
            value="metric"
            checked={value === 'metric'}
            onChange={() => onChange('metric')}
        /> °C
      </label>
      <label>
        <input
          type="radio"
          name="unit"
            value="imperial"
            checked={value === 'imperial'}
            onChange={() => onChange('imperial')}
        /> °F
      </label>
    </div>
  );
}