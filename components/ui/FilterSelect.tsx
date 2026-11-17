'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

/**
 * Single-select filter control that works from 320px viewports up.
 * The menu is anchored to the trigger width so it never pushes the page
 * sideways on small screens.
 */
export default function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const selected = options.find((option) => option.value === value);
  const displayLabel = selected?.label ?? (value || 'All');
  const isActive = value !== '';

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-full min-w-0">
        <ListboxButton
          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-md border px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isActive ? 'border-accent bg-accent/10' : 'border-deep/30 bg-white hover:border-deep/60'
          }`}
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-[10px] leading-tight tracking-wider uppercase font-futuraBold text-deep/60">
              {label}
            </span>
            <span className="w-full text-sm truncate text-deep">{displayLabel}</span>
          </span>
          <ChevronDownIcon className="flex-none w-4 h-4 text-deep/50" aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute inset-x-0 z-40 mt-1 max-h-64 py-1 overflow-auto text-sm bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-100 ease-in data-[closed]:opacity-0"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value || '__all'}
              value={option.value}
              className={({ focus }) =>
                `relative flex items-center justify-between gap-2 px-3 py-2 cursor-pointer select-none ${
                  focus ? 'bg-gray-100 text-accent' : 'text-deep'
                }`
              }
            >
              {({ selected: isSelected }) => (
                <>
                  <span className={`block truncate ${isSelected ? 'font-futuraBold' : 'font-normal'}`}>
                    {option.label}
                  </span>
                  {isSelected ? <CheckIcon className="flex-none w-4 h-4 text-accent" aria-hidden="true" /> : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
