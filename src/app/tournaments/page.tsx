import Link from 'next/link';
import { Trophy, Users, Calendar, ChevronRight, Globe } from 'lucide-react';

const TOURNAMENTS = [
  {
    id: 'wc2026',
    name: 'Чемпіонат Світу 2026',
    status: 'completed', 
    participants: 34,
    date: '11 Червня - 19 Липня 2026',
    description: 'Головна футбольна подія чотириріччя. Змагайся з іншими учасниками за реальні призи, та звання найкращого прогнозиста турніру!',
    color: 'from-green-600 to-emerald-900',
    icon: Globe,
  },
  {
    id: 'ucl2026',
    name: 'Ліга Чемпіонів 26/27',
    status: 'upcoming',
    participants: 0,
    date: 'Вересень 2026',
    description: 'Новий сезон найпрестижнішого клубного турніру Європи. Реєстрація відкриється пізніше.',
    color: 'from-blue-600 to-indigo-900',
    icon: Trophy,
  },
  {
    id: 'apl2026',
    name: 'АПЛ 2026-2027',
    status: 'upcoming',
    participants: 0,
    date: 'Серпень 2026',
    description: 'Новий сезон найкращої ліги світу. Реєстрація відкриється 14.08.',
    color: 'from-blue-600 to-indigo-900',
    icon: Trophy,
  }
];

export default function TournamentsPage() {
  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">

      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow-md">
          <Trophy className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Список турнірів</h2>
          <p className="text-sm text-zinc-400">
            Обери змагання для участі
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {TOURNAMENTS.map((tournament) => {
          const isActive = tournament.status === 'active';
          const isCompleted = tournament.status === 'completed';
          const isUpcoming = tournament.status === 'upcoming';
          const isClickable = isActive || isCompleted;

          const Icon = tournament.icon;

          let cardStyle = '';
          if (isActive) cardStyle = 'bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-700/40 hover:border-zinc-600 shadow-lg shadow-black/20';
          else if (isCompleted) cardStyle = 'bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-700/40 hover:border-zinc-600 shadow-md shadow-black/20 opacity-90 hover:opacity-100';
          else cardStyle = 'bg-zinc-800/20 border-zinc-800/50 opacity-75';

          const CardContent = (
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${cardStyle}`}>
              
              <div className={`h-2 w-full bg-gradient-to-r ${tournament.color} ${isCompleted ? 'opacity-50' : ''}`} />

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-zinc-900/50 border border-zinc-700/50 ${isClickable ? 'text-zinc-100' : 'text-zinc-500'}`}>
                    <Icon size={24} />
                  </div>
                  
                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Активний
                    </span>
                  )}
                  {isCompleted && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
                      Завершено
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                      Незабаром
                    </span>
                  )}
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isClickable ? 'text-zinc-100' : 'text-zinc-400'}`}>
                  {tournament.name}
                </h3>
                <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
                  {tournament.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                    <Calendar size={16} className="text-zinc-500" />
                    <span className="text-xs font-medium truncate">{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                    <Users size={16} className={isActive ? "text-blue-400" : isCompleted ? "text-amber-400" : "text-zinc-500"} />
                    <span className="text-xs font-medium truncate">
                      {isClickable ? `${tournament.participants} учасників` : 'Очікується'}
                    </span>
                  </div>
                </div>

                <div className={`flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                  isActive ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 
                  isCompleted ? 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600' : 
                  'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}>
                  {isActive && (
                    <span className="flex items-center gap-2">
                      Перейти до турніру <ChevronRight size={18} />
                    </span>
                  )}
                  {isCompleted && (
                    <span className="flex items-center gap-2">
                      Переглянути результати <ChevronRight size={18} />
                    </span>
                  )}
                  {isUpcoming && 'Очікуйте анонсу'}
                </div>
              </div>
            </div>
          );

          return isClickable ? (
            <Link key={tournament.id} href={`/tournaments/${tournament.id}`} className="block group">
              {CardContent}
            </Link>
          ) : (
            <div key={tournament.id}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}