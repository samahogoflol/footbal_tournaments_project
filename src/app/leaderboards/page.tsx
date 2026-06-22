'use client';

import { useState, useEffect } from 'react';
import { Search, Trophy, Medal } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, total_points');

        if (error) {
          console.error('Помилка завантаження профілів:', error);
          return;
        }

        if (data) {
          const formattedData = data.map(profile => ({
            id: profile.id,
            email: profile.email || 'Невідомий учасник',
            points: profile.total_points || 0
          }));
          
          setUsers(formattedData);
        }
      } catch (err) {
        console.error('Критична помилка:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  // Сортуємо від найбільшої кількості балів до найменшої
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  let currentRank = 1;
  let previousPoints = sortedUsers.length > 0 ? sortedUsers[0].points : -1;

  // Визначаємо місця (якщо бали однакові - місце однакове)
  const rankedUsers = sortedUsers.map((user, index) => {
    if (user.points < previousPoints) {
      currentRank = index + 1;
      previousPoints = user.points;
    }
    
    return {
      ...user,
      rank: currentRank,
    };
  });

  // Фільтрація за пошуком
  const filteredUsers = rankedUsers.filter((user) => {
    return user.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50 shadow-yellow-500/20';
      case 2:
        return 'bg-slate-300/20 text-slate-300 border-slate-300/50 shadow-slate-400/10';
      case 3:
        return 'bg-amber-600/20 text-amber-500 border-amber-700/50 shadow-amber-900/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">
      
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
          <Trophy className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Турнірна таблиця</h2>
          <p className="text-sm text-zinc-400">
            Оновлено: <span className="text-zinc-300">щойно</span>
          </p>
        </div>
      </div>

      <div className="relative mb-6 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-zinc-500 group-focus-within:text-green-400 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Знайти себе за поштою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-800/80 border border-zinc-700 text-zinc-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-500 shadow-md shadow-black/20"
        />
      </div>

      {/* Таблиця (Список карток) */}
      <div className="flex flex-col gap-2.5">
        {loading ? (
          <div className="text-center py-12 text-zinc-500 animate-pulse font-medium">
            Завантаження результатів...
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className={`flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/50 p-3.5 rounded-xl hover:bg-zinc-700/40 transition-all shadow-sm shadow-black/20 ${user.rank <= 3 ? 'border-l-2' : ''}`}
              style={{ borderLeftColor: user.rank === 1 ? '#eab308' : user.rank === 2 ? '#cbd5e1' : user.rank === 3 ? '#d97706' : '' }}
            >
              
              {/* Позиція (Рейтинг) */}
              <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border font-black text-lg ${getRankStyle(user.rank)}`}>
                {user.rank <= 3 ? <Medal size={20} /> : user.rank}
              </div>

              {/* Інформація про гравця */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-zinc-100 text-sm md:text-base truncate tracking-wide">
                  {user.email}
                </span>
              </div>

              {/* Бали */}
              <div className="shrink-0 text-right bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-700 flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-black text-green-400 text-lg leading-none">
                  {user.points}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 leading-none">
                  балів
                </span>
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