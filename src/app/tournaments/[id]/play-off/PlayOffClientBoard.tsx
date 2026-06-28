'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarDays } from 'lucide-react';

interface MatchesClientBoardProps {
  initialMatches: any[];
  tournamentId: string;
}

const ROUNDS = [
  { value: 4, label: '1/16' },
  { value: 5, label: '1/8' },
  { value: 6, label: '1/4' },
  { value: 7, label: '1/2' },
  { value: 8, label: 'Фінал' },
];

function parseMatchDateTime(dateStr: string, timeStr: string): number {
  if (!dateStr || !timeStr) return 0;

  const [day, month] = dateStr.split('.').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  return new Date(2026, (month || 1) - 1, day || 1, hours || 0, minutes || 0).getTime();
}

export default function PlayOffClientBoard({ initialMatches, tournamentId }: MatchesClientBoardProps) {

  const sortedMatches = [...initialMatches].sort(
    (a, b) => parseMatchDateTime(a.match_date, a.match_time) - parseMatchDateTime(b.match_date, b.match_time)
  );

  const availableRounds = new Set(sortedMatches.map((match) => match.round));

  const [activeRound, setActiveRound] = useState<number>(() => {
    if (typeof window === 'undefined') return 4;
    const saved = parseInt(sessionStorage.getItem(`matches-round-${tournamentId}`) || '4');
    return availableRounds.has(saved) ? saved : 4;
  });

  const filteredMatches = sortedMatches.filter((match) => match.round === activeRound);
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
          <h2 className="text-2xl font-bold text-zinc-100">Плей-офф</h2>
          <p className="text-sm text-zinc-400">
            Обери стадію для перегляду матчів
          </p>
        </div>
      </div>

      <div className="flex p-1 mb-6 bg-zinc-900/80 rounded-xl border border-zinc-800">
        {ROUNDS.map(({ value, label }) => {
          const isAvailable = availableRounds.has(value);
          const isActive = activeRound === value;

          return (
            <button
              key={value}
              onClick={() => isAvailable && setActiveRound(value)}
              disabled={!isAvailable}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-800 text-green-400 shadow-sm border border-zinc-700'
                  : isAvailable
                  ? 'text-zinc-500 hover:text-zinc-300'
                  : 'text-zinc-700 cursor-not-allowed'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filteredMatches.map((match) => (
          <Link
            key={match.id}
            href={`/tournaments/${tournamentId}/matches/${match.id}`}
            onClick={handleMatchClick}
            className="flex items-stretch justify-between p-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl shadow-sm hover:bg-zinc-800/50 transition-colors group"
          >

            <div className="flex flex-col items-center gap-2 w-[35%]">
              <img
                src={`https://flagcdn.com/w40/${match.home_code}.png`}
                alt={match.home_team}
                className="w-10 h-auto rounded-[3px] shadow-sm object-cover"
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
                    {match.match_date}
                  </span>
                  <span className="text-zinc-100 font-black text-lg leading-none">
                    {match.match_time}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 w-[35%]">
              <img
                src={`https://flagcdn.com/w40/${match.away_code}.png`}
                alt={match.away_team}
                className="w-10 h-auto rounded-[3px] shadow-sm object-cover"
                loading="lazy"
              />
              <span className="text-zinc-200 font-bold text-[11px] uppercase tracking-wider text-center leading-tight">
                {match.away_team}
              </span>
            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}