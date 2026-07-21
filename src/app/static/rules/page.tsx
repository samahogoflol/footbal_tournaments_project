'use client';

import { useState } from 'react';
import { ShieldCheck, Target, CheckCircle2, Clock, MessageSquareText, Info } from 'lucide-react';

type TournamentTab = 'wc2026' | 'ucl2026';

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<TournamentTab>('wc2026');

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">
      
      {/* Заголовок */}
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow-md">
          <ShieldCheck className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Правила турніру</h2>
          <p className="text-sm text-zinc-400">
            Система підрахунку та умови
          </p>
        </div>
      </div>

      {/* Перемикач турнірів */}
      <div className="flex bg-zinc-800/60 p-1 rounded-xl mb-6 border border-zinc-700/50">
        <button
          onClick={() => setActiveTab('wc2026')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'wc2026' 
              ? 'bg-zinc-700 text-zinc-100 shadow-sm shadow-black/20' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          ЧС 2026
        </button>
        <button
          onClick={() => setActiveTab('ucl2026')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'ucl2026' 
              ? 'bg-zinc-700 text-zinc-100 shadow-sm shadow-black/20' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          ЛЧ 26/27
        </button>
      </div>

      {/* Контент правил */}
      <div className="flex flex-col gap-4">
        {activeTab === 'wc2026' ? (
          // ПРАВИЛА ЧС 2026
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/50 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shrink-0">
                <Target className="text-yellow-500" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-yellow-500 mb-1">
                  3 бали
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  За абсолютно <span className="text-zinc-100 font-semibold">точно вгаданий рахунок</span> матчу.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/50 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-green-500/10 rounded-lg border border-green-500/20 shrink-0">
                <CheckCircle2 className="text-green-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-green-400 mb-1">
                  1 бал
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  За вгаданий <span className="text-zinc-100 font-semibold">результат</span> (переможець матчу або нічия), але з помилкою в точному рахунку.
                </p>
              </div>
            </div>

            {/* Правило 3: Дедлайн */}
            <div className="flex items-start gap-4 bg-zinc-800/40 border border-red-900/30 p-5 rounded-2xl shadow-sm mt-2">
              <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0">
                <Clock className="text-red-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">
                  Дедлайн прийому
                </span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Прогнози приймаються щонайменше за <span className="text-red-400 font-bold">5 хвилин</span> до стартового свистка. Коментарі, залишені пізніше, або ті коментарі, які було відредаговано враховуватися не будуть.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-blue-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20 shrink-0">
                <MessageSquareText className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">
                  Як зробити прогноз
                </span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Залишайте свій прогноз виключно в коментарях під постом до відповідного матчу 
                  в нашому <a href="https://t.me/santiago_munez_football" target='_blank' rel="noopener noreferrer" className='text-blue-400 font-medium hover:underline'>Telegram-каналі.</a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-800/20 rounded-2xl border border-zinc-800 border-dashed flex flex-col items-center animate-fade-in">
            <div className="p-4 bg-zinc-800/50 rounded-full mb-4">
              <Info size={40} className="text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-300 mb-2">Правила в розробці</h3>
            <p className="text-zinc-500 text-sm max-w-[250px] mx-auto leading-relaxed">
              Регламент та система нарахування балів для Ліги Чемпіонів з'являться ближче до старту турніру.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}