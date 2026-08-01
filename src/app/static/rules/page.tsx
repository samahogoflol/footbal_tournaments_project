'use client';

import { useState } from 'react';
import { ShieldCheck, Target, CheckCircle2, Clock, MessageSquareText, Info, Trophy, Crosshair, HelpCircle, Star, LayoutList } from 'lucide-react';

type TournamentTab = 'wc2026' | 'cl2627' | 'apl2026';

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState<TournamentTab>('wc2026');

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">
      
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow-md">
          <ShieldCheck className="text-green-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Правила турніру</h2>
          <p className="text-sm text-zinc-400">Система підрахунку та умови</p>
        </div>
      </div>

      <div className="flex bg-zinc-800/60 p-1 rounded-xl mb-6 border border-zinc-700/50">
        {(['wc2026', 'cl2627', 'apl2026'] as TournamentTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab
                ? 'bg-zinc-700 text-zinc-100 shadow-sm shadow-black/20'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab === 'wc2026' ? 'ЧС 26' : tab === 'cl2627' ? 'ЛЧ 26-27' : 'АПЛ 26-27'}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">

        {activeTab === 'wc2026' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/50 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shrink-0">
                <Target className="text-yellow-500" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-yellow-500 mb-1">3 бали</span>
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
                <span className="text-lg font-black text-green-400 mb-1">1 бал</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  За вгаданий <span className="text-zinc-100 font-semibold">результат</span> (переможець або нічия), але з помилкою в точному рахунку.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-red-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0">
                <Clock className="text-red-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Дедлайн прийому</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Прогнози приймаються щонайменше за <span className="text-red-400 font-bold">5 хвилин</span> до стартового свистка. Коментарі залишені пізніше або відредаговані — не зараховуються.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-blue-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20 shrink-0">
                <MessageSquareText className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Як зробити прогноз</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Залишайте свій прогноз виключно в коментарях під постом до відповідного матчу в нашому{' '}
                  <a href="https://t.me/santiago_munez_football" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">
                    Telegram-каналі.
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cl2627' && (
          <div className="flex flex-col gap-4 animate-fade-in">

            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Базова система балів</div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/50 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shrink-0">
                <Target className="text-yellow-500" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-yellow-500 mb-1">3 бали</span>
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
                <span className="text-lg font-black text-green-400 mb-1">1 бал</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  За вгаданий <span className="text-zinc-100 font-semibold">результат</span> (переможець або нічия), але з помилкою в точному рахунку.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-red-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0">
                <Clock className="text-red-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Дедлайн прийому</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Прийом закривається автоматично по запланованому часу матчу на сайті.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-800/40 border border-blue-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20 shrink-0">
                <MessageSquareText className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Як зробити прогноз</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Обираєте потрібний матч, ставите свій прогноз, та він автоматично попадає до списку прогнозів. Його відразу можна побачити внизу, на тій самій сторнці, або в особистому кабінеті (Історія прогнозів)
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1 mt-2">Бонусні бали (Прийом прогнозів на бонусні бали приймається до 09.09.26 до 17:30 по Києвському часу )</div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-purple-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 shrink-0">
                <Trophy className="text-purple-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-purple-400 mb-1">+15 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадати <span className="text-zinc-100 font-semibold">переможця турніру.</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-orange-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-orange-500/10 rounded-lg border border-orange-500/20 shrink-0">
                <Crosshair className="text-orange-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-orange-400 mb-1">+10 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадати <span className="text-zinc-100 font-semibold">найкращого бомбардира турніру.</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-cyan-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shrink-0">
                <HelpCircle className="text-cyan-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-cyan-400 mb-1">+8 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Чи побʼється <span className="text-zinc-100 font-semibold">рекорд по голам за турнір?</span> Наразі він становить <span className="text-zinc-100 font-semibold">17 голів.</span> (Так/Ні)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-pink-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-pink-500/10 rounded-lg border border-pink-500/20 shrink-0">
                <Star className="text-pink-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-pink-400 mb-1">+6 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Чи пройде <span className="text-zinc-100 font-semibold">Донецький Шахтар</span> в стадію плей-оф (1/16 або вище)? (Так/Ні)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-emerald-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shrink-0">
                <LayoutList className="text-emerald-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-emerald-400 mb-1">+2 / +3 бали</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадай <span className="text-zinc-100 font-semibold">першу вісімку</span> — за кожну вгадану команду у вісімці <span className="text-emerald-400 font-bold">+2 бали</span>, за точне місце в рейтингу додатково <span className="text-emerald-400 font-bold">+1 бал.</span>
                </p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'apl2026' && (
          <div className="flex flex-col gap-4 animate-fade-in">

            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
              Базова система балів
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/50 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shrink-0">
                <Target className="text-yellow-500" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-yellow-500 mb-1">3 бали</span>
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
                <span className="text-lg font-black text-green-400 mb-1">1 бал</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  За вгаданий <span className="text-zinc-100 font-semibold">результат</span> (переможець або нічия), але з помилкою в точному рахунку.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-red-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 shrink-0">
                <Clock className="text-red-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Дедлайн прийому</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Прийом закривається автоматично по запланованому часу матчу на сайті.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4 bg-zinc-800/40 border border-blue-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20 shrink-0">
                <MessageSquareText className="text-blue-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-100 mb-1">Як зробити прогноз</span>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Обираєте потрібний матч, ставите свій прогноз, та він автоматично попадає до списку прогнозів. Його відразу можна побачити внизу, на тій самій сторнці, або в особистому кабінеті (Історія прогнозів)
                </p>
              </div>
            </div>
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1 mt-2">
              Бонусні бали (Прийом прогнозів на бонусні бали приймається до 21.08.26 до 21:30 по Києвському часу )
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-purple-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 shrink-0">
                <Trophy className="text-purple-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-purple-400 mb-1">+15 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадати <span className="text-zinc-100 font-semibold">переможця турніру.</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-orange-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-orange-500/10 rounded-lg border border-orange-500/20 shrink-0">
                <Crosshair className="text-orange-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-orange-400 mb-1">+10 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадати <span className="text-zinc-100 font-semibold">найкращого бомбардира турніру.</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-cyan-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shrink-0">
                <Star className="text-cyan-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-cyan-400 mb-1">+8 балів</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадати <span className="text-zinc-100 font-semibold">гравця сезону АПЛ 2026/27</span> (офіційна нагорода Premier League Player of the Season).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-emerald-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shrink-0">
                <LayoutList className="text-emerald-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-emerald-400 mb-1">+2 / +3 бали</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадай <span className="text-zinc-100 font-semibold">першу п'ятірку</span> — за кожну команду, що потрапить до топ-5, <span className="text-emerald-400 font-bold">+2 бали</span>, за точне місце в таблиці додатково <span className="text-emerald-400 font-bold">+1 бал.</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-zinc-800/40 border border-rose-900/30 p-5 rounded-2xl shadow-sm">
              <div className="p-2.5 bg-rose-500/10 rounded-lg border border-rose-500/20 shrink-0">
                <LayoutList className="text-rose-400" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-rose-400 mb-1">+2 / +3 бали</span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Вгадай <span className="text-zinc-100 font-semibold">останню трійку</span> — за кожну команду, що вилетить з АПЛ, <span className="text-rose-400 font-bold">+2 бали</span>, за точне місце в таблиці додатково <span className="text-rose-400 font-bold">+1 бал.</span>
                </p>
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}