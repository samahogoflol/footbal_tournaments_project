'use client';

import { useState } from 'react';
import { Search, Trophy, Medal } from 'lucide-react';

const RAW_RESULTS = [
  { id: 1, name: 'Денис', username: '@denistz300', points: 3 },
  { id: 2, name: 'Олесь', username: '@ztrxss', points: 8 },
  { id: 3, name: 'Віталій', username: '@redutsxg', points: 3 },
  { id: 4, name: 'Без імені', username: '@nazaru4o', points: 5 },
  { id: 5, name: 'Никита', username: '@sorevain', points: 1 },
  { id: 6, name: 'vovachka ...', username: '@Vovachikkk', points: 1 },
  { id: 7, name: 'Макс Гапон', username: '', points: 5 },
  { id: 8, name: 'Сергій', username: '@T_E_S_S_T_E_A', points: 3 },
  { id: 9, name: 'Микита Філіпʼєв', username: '@krikzz', points: 3 },
  { id: 10, name: 'Anatoliy', username: '@Fatych_fatych', points: 2 },
  { id: 11, name: '_ssanechikk_', username: '@sayndre17', points: 2 },
  { id: 12, name: 'Без імені', username: '@kost1akkk', points: 3 },
  { id: 13, name: 'Тарас', username: '@Turkishfly', points: 1 },
  { id: 14, name: 'Славен', username: '@SlavenPoltava', points: 5 },
  { id: 15, name: 'Ivan Dbv', username: '', points: 8 },
  { id: 16, name: 'Serdiuk Sergiy', username: '', points: 4 },
  { id: 17, name: 'Олександр', username: '', points: 1 },
  { id: 18, name: 'Volodymyr', username: '@v15543', points: 3 },
  { id: 19, name: 'Aewyxz', username: '@awaeks7', points: 5 },
  { id: 20, name: 'Kumalwl21', username: '@Kumalwl21', points: 5 },
  { id: 21, name: 'Tarasevich 15', username: '@Tarasevich15', points: 2 },
  { id: 22, name: 'Сергій', username: '', points: 2 },
  { id: 23, name: 'VLAD_5', username: '@vladislav_585', points: 8 },
  { id: 24, name: 'Kalinin SERGant', username: '@SERGant_ZSU', points: 1 },
  { id: 25, name: 'Макс FM База', username: '', points: 1 },
  { id: 26, name: 'Kirill', username: '@someonekrch', points: 2 },
  { id: 27, name: 'Тарас глівінський', username: '@tar_qwerty123456789', points: 1 },
  { id: 28, name: 'Антон', username: '@dadadbada', points: 1 },
];

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedUsers = [...RAW_RESULTS].sort((a, b) => b.points - a.points);

  let currentRank = 1;
  let previousPoints = sortedUsers.length > 0 ? sortedUsers[0].points : -1;

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

  const filteredUsers = rankedUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(query);
    const usernameMatch = user.username.toLowerCase().includes(query);
    return nameMatch || usernameMatch;
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
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4 ">
      
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
          placeholder="Знайти себе в таблиці..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-800/80 border border-zinc-700 text-zinc-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-500 shadow-md shadow-black/20"
        />
      </div>

      {/* Таблиця (Список карток) */}
      <div className="flex flex-col gap-2.5">
        {filteredUsers.length > 0 ? (
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
                  {user.name}
                </span>
                {user.username && (
                  <span className="text-xs text-blue-400 font-medium opacity-90 truncate mt-0.5">
                    {user.username}
                  </span>
                )}
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