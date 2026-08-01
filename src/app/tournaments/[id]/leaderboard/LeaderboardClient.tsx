'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Trophy, Medal, CalendarClock } from 'lucide-react';

interface User {
  id: string;
  username: string;
  points: number;
  rank?: number;
}

interface LeaderboardClientProps {
  users: User[];
  tournamentId: string;
  tournamentName: string;
}

export default function LeaderboardClient({ users, tournamentId, tournamentName }: LeaderboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const rankedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => b.points - a.points);
    return sorted.map((user, index) => {
      if (index === 0) return { ...user, rank: 1 };
      const prev = sorted[index - 1];
      const rank = user.points < prev.points
        ? index + 1
        : sorted.findIndex(u => u.points === user.points) + 1;
      return { ...user, rank };
    });
  }, [users]);

  const filteredUsers = useMemo(
    () => rankedUsers.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [rankedUsers, searchQuery]
  );

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 2: return 'bg-slate-300/20 text-slate-300 border-slate-300/50';
      case 3: return 'bg-amber-600/20 text-amber-500 border-amber-700/50';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const isEmpty = users.length === 0;

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">

      <Link
        href={`/tournaments/${tournamentId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors w-fit mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm tracking-wide">Назад до турніру</span>
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
          <Trophy className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Турнірна таблиця</h2>
          <p className="text-sm text-zinc-400">{tournamentName}</p>
        </div>
      </div>

      {!isEmpty && (
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-500 group-focus-within:text-green-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Знайти себе за ніком..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800/80 border border-zinc-700 text-zinc-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-500 shadow-md shadow-black/20"
          />
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {isEmpty ? (
          <div className="text-center py-16 bg-zinc-800/20 rounded-xl border border-zinc-800 border-dashed flex flex-col items-center">
            <CalendarClock size={48} className="text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-zinc-300 mb-1">Даних ще немає</h3>
            <p className="text-zinc-500 text-sm">Таблиця з'явиться після перших прогнозів</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/50 p-3.5 rounded-xl hover:bg-zinc-700/40 transition-all shadow-sm shadow-black/20 ${user.rank! <= 3 ? 'border-l-2' : ''}`}
              style={{ borderLeftColor: user.rank === 1 ? '#eab308' : user.rank === 2 ? '#cbd5e1' : user.rank === 3 ? '#d97706' : '' }}
            >
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border font-black text-lg ${getRankStyle(user.rank!)}`}>
                {user.rank! <= 3 ? <Medal size={20} /> : user.rank}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-zinc-100 text-sm md:text-base truncate tracking-wide">
                  {user.username}
                </span>
              </div>

              <div className="shrink-0 text-right bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-700 flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-black text-green-400 text-lg leading-none">{user.points}</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 leading-none">балів</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-zinc-800/20 rounded-xl border border-zinc-800 border-dashed">
            <span className="text-4xl mb-3 block">🏆</span>
            <p className="text-zinc-400 font-medium">За запитом "{searchQuery}" <br/> учасників не знайдено</p>
          </div>
        )}
      </div>

    </div>
  );
}