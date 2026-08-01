'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Trophy, Medal, CalendarClock } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/src/utils/supabase-browser';

type TournamentTab = 'wc2026' | 'cl2627' | 'apl2026';

const TABS: { id: TournamentTab; label: string }[] = [
  { id: 'wc2026', label: 'ЧС 26' },
  { id: 'apl2026', label: 'АПЛ 26-27' },
  { id: 'cl2627', label: 'ЛЧ 26-27' },
];

export default function LeaderboardPage() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [activeTab, setActiveTab] = useState<TournamentTab>('wc2026');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      setUsers([]);

      try {
        const { data, error } = await supabase
          .from('tournament_points')
          .select(`points, profiles_public ( id, username )`)
          .eq('tournament_id', activeTab)
          .order('points', { ascending: false });

        if (error) {
          console.error('Помилка завантаження:', error);
          return;
        }

        if (data) {
          const formattedData = data.map((item, index) => {
            const profileInfo = Array.isArray(item.profiles_public) ? item.profiles_public[0] : item.profiles_public;
            return {
              id: profileInfo?.id || `user-${index}`,
              username: profileInfo?.username || 'Анонімний гравець',
              points: item.points || 0
            };
          });
          setUsers(formattedData);
        }
      } catch (err) {
        console.error('Критична помилка:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [activeTab, supabase]);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => b.points - a.points),
    [users]
  );

  const rankedUsers = useMemo(() => {
    return sortedUsers.map((user, index) => {
      if (index === 0) return { ...user, rank: 1 };
      const prevUser = sortedUsers[index - 1];
      const rank = user.points < prevUser.points
        ? index + 1
        : sortedUsers.findIndex(u => u.points === user.points) + 1;
      return { ...user, rank };
    });
  }, [sortedUsers]);

  const filteredUsers = useMemo(
    () => rankedUsers.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [rankedUsers, searchQuery]
  );

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50 shadow-yellow-500/20';
      case 2: return 'bg-slate-300/20 text-slate-300 border-slate-300/50 shadow-slate-400/10';
      case 3: return 'bg-amber-600/20 text-amber-500 border-amber-700/50 shadow-amber-900/20';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const isEmpty = !loading && users.length === 0;

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">

      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
          <Trophy className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Турнірна таблиця</h2>
          <p className="text-sm text-zinc-400">Оновлено: <span className="text-zinc-300">щойно</span></p>
        </div>
      </div>

      <div className="flex bg-zinc-800/60 p-1 rounded-xl mb-6 border border-zinc-700/50">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-zinc-700 text-zinc-100 shadow-sm shadow-black/20'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!isEmpty && !loading && (
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
        {loading ? (
          <div className="text-center py-12 text-zinc-500 animate-pulse font-medium">
            Завантаження результатів...
          </div>
        ) : isEmpty ? (
          <div className="text-center py-16 bg-zinc-800/20 rounded-xl border border-zinc-800 border-dashed flex flex-col items-center">
            <CalendarClock size={48} className="text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-zinc-300 mb-1">Даних ще немає</h3>
            <p className="text-zinc-500 text-sm">Таблиця лідерів з'явиться після перших прогнозів</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/50 p-3.5 rounded-xl hover:bg-zinc-700/40 transition-all shadow-sm shadow-black/20 ${user.rank <= 3 ? 'border-l-2' : ''}`}
              style={{ borderLeftColor: user.rank === 1 ? '#eab308' : user.rank === 2 ? '#cbd5e1' : user.rank === 3 ? '#d97706' : '' }}
            >
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border font-black text-lg ${getRankStyle(user.rank)}`}>
                {user.rank <= 3 ? <Medal size={20} /> : user.rank}
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