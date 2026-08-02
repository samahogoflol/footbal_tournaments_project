'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { formatMatchDateShort } from '@/src/utils/matchTime';

interface Round {
  value: number;
  label: string;
}

interface LeagueMatchesClientBoardProps {
  initialMatches: any[];
  tournamentId: string;
  rounds: Round[];
  logoMap: Record<string, string>;
}

export default function LeagueMatchesClientBoard({ initialMatches, tournamentId, rounds, logoMap }: LeagueMatchesClientBoardProps) {

  const defaultRound = rounds[0]?.value ?? 1;

  const [activeRound, setActiveRound] = useState<number>(() => {
    if (typeof window === 'undefined') return defaultRound;
    const saved = parseInt(sessionStorage.getItem(`matches-round-${tournamentId}`) || String(defaultRound));
    return rounds.some(r => r.value === saved) ? saved : defaultRound;
  });

  const filteredMatches = initialMatches.filter((match) => match.round === activeRound);
  const scrollKey = `matches-scroll-${tournamentId}`;

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(scrollKey);
    if (savedScroll) {
      window.scrollTo({ top: parseInt(savedScroll), behavior: 'instant' });
      sessionStorage.removeItem(scrollKey);
      sessionStorage.removeItem(`matches-round-${tournamentId}`);
    }
  }, []);

  const handleMatchClick = () => {
    sessionStorage.setItem(scrollKey, window.scrollY.toString());
    sessionStorage.setItem(`matches-round-${tournamentId}`, activeRound.toString());
  };

  const canGoPrev = activeRound > (rounds[0]?.value ?? 1);
  const canGoNext = activeRound < (rounds[rounds.length - 1]?.value ?? 38);

  const handlePrev = () => {
    if (canGoPrev) setActiveRound(r => r - 1);
  };

  const handleNext = () => {
    if (canGoNext) setActiveRound(r => r + 1);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in bg-zinc-950 px-3 pt-4 pb-8">

      <Link
        href={`/tournaments/${tournamentId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors w-fit mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm tracking-wide">Назад до турніру</span>
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shadow-md">
          <CalendarDays className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Матчі</h2>
          <p className="text-sm text-zinc-400">Обери тур для перегляду матчів</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 bg-zinc-900/80 rounded-xl border border-zinc-800 p-1">
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`p-2.5 rounded-lg transition-all ${
            canGoPrev ? 'text-zinc-300 hover:text-green-400 hover:bg-zinc-800' : 'text-zinc-700 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm font-bold text-green-400">
          {activeRound} Тур
        </span>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`p-2.5 rounded-lg transition-all ${
            canGoNext ? 'text-zinc-300 hover:text-green-400 hover:bg-zinc-800' : 'text-zinc-700 cursor-not-allowed'
          }`}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-16 text-zinc-600 text-sm">
            Матчів у цьому турі ще немає
          </div>
        ) : (
          filteredMatches.map((match) => (
            <Link
              key={match.id}
              href={`/tournaments/${tournamentId}/matches/${match.id}`}
              onClick={handleMatchClick}
              className="flex items-stretch justify-between p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl shadow-sm hover:bg-zinc-800/50 transition-colors group"
            >
              <div className="flex flex-col items-center gap-2 w-[35%]">
                <img
                  src={logoMap[match.home_team] ?? '/logos/placeholder.svg'}
                  alt={match.home_team}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
                <span className="text-zinc-200 font-bold text-[11px] uppercase tracking-wider text-center leading-tight">
                  {match.home_team}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center w-[35%] px-1">
                {match.status === 'finished' ? (
                  <div className="text-2xl font-black text-green-400 tracking-widest flex items-center justify-center bg-green-500/10 px-4 py-1.5 rounded-lg border border-green-500/20 w-full">
                    {match.home_score} : {match.away_score}
                  </div>
                ) : (
                  <div className="flex flex-col items-center bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 w-full group-hover:border-zinc-700 transition-colors">
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-0.5 whitespace-nowrap">
                      {formatMatchDateShort(match.match_date)}
                    </span>
                    <span className="text-zinc-100 font-black text-lg leading-none">
                      {match.match_time}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 w-[35%]">
                <img
                  src={logoMap[match.away_team] ?? '/logos/placeholder.svg'}
                  alt={match.away_team}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
                <span className="text-zinc-200 font-bold text-[11px] uppercase tracking-wider text-center leading-tight">
                  {match.away_team}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
}