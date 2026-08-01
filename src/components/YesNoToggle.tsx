'use client';

interface YesNoToggleProps {
  value: 'yes' | 'no' | null;
  onChange: (value: 'yes' | 'no') => void;
  disabled?: boolean;
}

export default function YesNoToggle({ value, onChange, disabled = false }: YesNoToggleProps) {
  const baseClasses = 'flex-1 py-3 rounded-xl font-bold text-sm transition-colors border disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('yes')}
        className={`${baseClasses} ${
          value === 'yes'
            ? 'bg-green-500/10 text-green-400 border-green-500/50'
            : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-600'
        }`}
      >
        Так
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange('no')}
        className={`${baseClasses} ${
          value === 'no'
            ? 'bg-red-500/10 text-red-400 border-red-500/50'
            : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-600'
        }`}
      >
        Ні
      </button>
    </div>
  );
}
