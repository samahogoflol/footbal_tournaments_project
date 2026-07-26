'use client';

import { Lock, Trophy } from 'lucide-react';
import { usePrediction } from '../utils/customHooks/usePredictions';
import { useRouter } from 'next/navigation';

interface PredictionFormProps {
  matchId: number;
  userId?: string;
  matchStatus: string;
  matchDate: string;
  matchTime: string;
  initialHomeScore: string;
  initialAwayScore: string;
}

export default function PredictionForm({
  matchId,
  userId,
  matchStatus,
  matchDate,
  matchTime,
  initialHomeScore,
  initialAwayScore,
}: PredictionFormProps) {
  const router = useRouter();

  const {
    homeScore,
    setHomeScore,
    awayScore,
    setAwayScore,
    isSaving,
    isLocked,
    handleSavePrediction,
  } = usePrediction({
    matchId,
    userId,
    matchStatus,
    matchDate,
    matchTime,
    initialHomeScore,
    initialAwayScore,
    onSuccess: () => {
      router.refresh(); 
    },
  });

  return (
    <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 mb-8">
      <h3 className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
        {isLocked ? <Lock size={14} /> : <Trophy size={14} />}
        {matchStatus === 'live'
          ? 'Матч вже триває'
          : matchStatus === 'finished'
          ? 'Матч завершено'
          : isLocked
          ? 'Прийом прогнозів закрито'
          : 'Ваш прогноз'}
      </h3>

      <div className="flex justify-center items-center gap-6 mb-8">
        <input
          disabled={isLocked || !userId}
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          className="w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-2xl text-center text-5xl font-black text-white focus:border-green-500 outline-none transition-all disabled:opacity-50"
          placeholder="0"
        />
        <span className="text-2xl text-zinc-700 font-bold">:</span>
        <input
          disabled={isLocked || !userId}
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          className="w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-2xl text-center text-5xl font-black text-white focus:border-green-500 outline-none transition-all disabled:opacity-50"
          placeholder="0"
        />
      </div>

      {!isLocked && (
        <button
          onClick={handleSavePrediction}
          disabled={!userId ? false : homeScore === '' || awayScore === '' || isSaving}
          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-900/20"
        >
          {!userId ? 'Увійти, щоб зробити прогноз' : isSaving ? 'Збереження...' : 'Підтвердити прогноз'}
        </button>
      )}
    </div>
  );
}