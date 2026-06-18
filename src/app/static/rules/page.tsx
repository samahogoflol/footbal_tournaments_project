import { ShieldCheck, Target, CheckCircle2, Clock, MessageSquareText } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3 pt-4 pb-4">
      
      <div className="mb-8 flex items-center gap-3">
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

      <div className="flex flex-col gap-4">
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
              Залишайте свій прогноз виключно в коментарях під постомдо відповідного матчу 
              в нашому <a href="https://t.me/santiago_munez_football" target='_blank' className='text-blue-400 font-medium'>Telegram-каналі.</a>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}