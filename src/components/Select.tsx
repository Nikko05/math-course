'use client'
import React from 'react';

type SelectOption = {
  value: string;
  level: string;
};

type SelectProps = {
  selectData: {
    label: string;
    name: string;
    id: string;
    optionsAmount: number;
    options: Array<SelectOption>;
  };
  value?: string;
  onChange?: (value: string) => void;
};

export default function Select({
  selectData: { name, id, options, label },
  value = '',
  onChange,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className='pr-3'>
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}
        className={`border-2 rounded-md px-3 py-1 ${value ? 'opacity-100' : 'opacity-60'}`}
      >
        {options.map(({ value: optionValue, level }) => (
          <option key={optionValue} value={optionValue}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};