'use client';

import { ChevronDown } from 'lucide-react';

interface Team {
  name: string;
  logo_url?: string | null;
}

interface TeamSelectProps {
  teams: Team[];
  value: string;
  onChange: (name: string) => void;
  excludeNames?: string[];
  disabled?: boolean;
  placeholder?: string;
}

export default function TeamSelect({
  teams,
  value,
  onChange,
  excludeNames = [],
  disabled = false,
  placeholder = 'Обери команду',
}: TeamSelectProps) {
  const options = teams.filter((team) => team.name === value || !excludeNames.includes(team.name));

  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-zinc-100 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
