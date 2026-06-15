'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Save, Clock, Users, ShieldAlert, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export default function MatchPredictionPage() { 
  const params = useParams(); 
  const tournamentId = params?.id as string;
  const matchId = params?.matchId as string;

  const [match, setMatch] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [homeScore, setHomeScore] = useState<string>('');
  const [awayScore, setAwayScore] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      if (!matchId) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setCurrentUser(user);

        const numericMatchId = parseInt(matchId, 10);
        
        const { data: matchData, error: matchError } = await supabase
          .from('matches')
          .select('*')
          .eq('id', numericMatchId)
          .single();

        if (matchError) {
          console.error("Деталі помилки бази даних:", matchError);
          setLoading(false);
          return;
        }

        if (matchData) {
          setMatch(matchData);

          if (user) {
            const { data: predData } = await supabase
              .from('predictions')
              .select('*')
              .eq('user_id', user.id)
              .eq('match_id', numericMatchId)
              .single();

            if (predData) {
              setHasPrediction(true);
              setHomeScore(predData.predicted_home_score.toString());
              setAwayScore(predData.predicted_away_score.toString());
            } else if (matchData.status === 'finished') {
              setHomeScore(matchData.home_score?.toString() || '');
              setAwayScore(matchData.away_score?.toString() || '');
            }
          } else if (matchData.status === 'finished') {
            setHomeScore(matchData.home_score?.toString() || '');
            setAwayScore(matchData.away_score?.toString() || '');
          }
        }
      } catch (err) {
        console.error("Критична помилка у loadData:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [matchId]);

  const handleSavePrediction = async () => {
    if (!currentUser) {
      alert('Будь ласка, увійдіть в акаунт!');
      return;
    }

    setIsSaving(true);

    try {
      // Використовуємо .upsert()
      // Supabase сам зрозуміє, що треба оновити, якщо унікальний ключ (user_id + match_id) вже існує
      const { error } = await supabase
        .from('predictions')
        .upsert({
          user_id: currentUser.id,
          match_id: parseInt(matchId, 10),
          predicted_home_score: parseInt(homeScore),
          predicted_away_score: parseInt(awayScore)
        }, {
          onConflict: 'user_id, match_id' // Це вказує на унікальний індекс, який викликав помилку
        });

      if (error) throw error;

      setHasPrediction(true);
      alert('Прогноз успішно збережено!');
    } catch (error: any) {
      console.error('Дані прогнозу перед помилкою:', {
        user_id: currentUser?.id,
        match_id: parseInt(matchId, 10),
        home: parseInt(homeScore),
        away: parseInt(awayScore)
      });
      console.error('Помилка від Supabase:', error);
      alert('Помилка в консолі (F12)');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="flex h-full items-center justify-center text-zinc-500 animate-pulse bg-zinc-950">Завантаження матчу...</div>;
  }

  if (!match) {
    return <div className="p-6 text-center text-red-400 bg-zinc-950 h-full">Матч не знайдено</div>;
  }

  const isPredictionLocked = match.status !== 'scheduled';

  return (
    <div className="flex flex-col h-full animate-fade-in bg-zinc-950 px-3 pt-4 pb-8">
      <Link 
        href={`/tournaments/${tournamentId}/group-stage`} 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors w-fit mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm">До списку матчів</span>
      </Link>

      {/* Решта коду без змін */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6 shadow-lg">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Clock size={16} className="text-zinc-500" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            {match.match_date} • {match.match_time}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-3 w-[40%]">
            <img src={`https://flagcdn.com/w80/${match.home_code}.png`} alt={match.home_team} className="w-16 md:w-20 h-auto rounded-md shadow-md object-cover" />
            <span className="text-zinc-100 font-black text-sm md:text-base uppercase tracking-wider text-center">{match.home_team}</span>
          </div>

          <div className="w-[20%] text-center flex flex-col items-center justify-center">
            {match.status === 'finished' ? (
              <div className="text-2xl md:text-3xl font-black text-green-400 tracking-wider bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-xl whitespace-nowrap">
                {match.home_score} : {match.away_score}
              </div>
            ) : match.status === 'live' ? (
              <div className="text-xs font-bold text-red-500 uppercase bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md animate-pulse">Матч йде</div>
            ) : (
              <div className="text-2xl font-black text-zinc-700">VS</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 w-[40%]">
            <img src={`https://flagcdn.com/w80/${match.away_code}.png`} alt={match.away_team} className="w-16 md:w-20 h-auto rounded-md shadow-md object-cover" />
            <span className="text-zinc-100 font-black text-sm md:text-base uppercase tracking-wider text-center">{match.away_team}</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/80 p-5 mb-8">
        <h3 className="text-center text-sm font-bold text-zinc-400 uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
          {isPredictionLocked && <Lock size={14} className="text-amber-500" />}
          {isPredictionLocked ? 'Прогноз (Прийом закрито)' : 'Твій прогноз'}
        </h3>
        
        <div className="flex justify-center items-center gap-4 mb-6">
          <input type="number" min="0" max="20" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} disabled={isPredictionLocked} className="w-20 h-20 bg-zinc-950 border-2 border-zinc-800 disabled:opacity-50 disabled:bg-zinc-900 rounded-xl text-center text-4xl font-black text-zinc-100 focus:border-green-500 focus:ring-0 outline-none transition-colors" placeholder="-" />
          <span className="text-xl font-bold text-zinc-600">:</span>
          <input type="number" min="0" max="20" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} disabled={isPredictionLocked} className="w-20 h-20 bg-zinc-950 border-2 border-zinc-800 disabled:opacity-50 disabled:bg-zinc-900 rounded-xl text-center text-4xl font-black text-zinc-100 focus:border-green-500 focus:ring-0 outline-none transition-colors" placeholder="-" />
        </div>

        {isPredictionLocked ? (
          <div className="w-full flex items-center justify-center gap-2 bg-zinc-800 text-zinc-500 font-bold py-4 rounded-xl border border-zinc-700/50 cursor-not-allowed">
            <Lock size={20} /> Прийом прогнозів завершено
          </div>
        ) : (
          <button 
            onClick={handleSavePrediction}
            disabled={homeScore === '' || awayScore === '' || isSaving}
            className={`w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-colors ${hasPrediction ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'}`}
          >
            {isSaving ? 'Збереження...' : hasPrediction ? 'Оновити прогноз' : 'Зберегти прогноз'}
          </button>
        )}
      </div>
    </div>
  );
}