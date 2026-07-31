'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface RoundSelectorProps {
  currentRound: number;
  totalRounds?: number;
}

export default function RoundSelector({ currentRound, totalRounds = 38 }: RoundSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRound = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('round', newRound);
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative inline-block w-full md:w-64 mb-6">
      <select
        value={currentRound}
        onChange={handleRoundChange}
        className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-zinc-100 font-bold py-4 pl-5 pr-12 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors shadow-lg cursor-pointer"
      >
        {rounds.map((round) => (
          <option key={round} value={round}>
            Тур {round}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
        <ChevronDown size={20} />
      </div>
    </div>
  );
}