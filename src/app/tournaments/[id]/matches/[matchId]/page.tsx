'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Users, Lock, Trophy, AlertCircle } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export default function MatchPredictionPage() { 
  const params = useParams(); 
  const tournamentId = params?.id as string;
  const matchId = params?.matchId as string;

  const [allPredictions, setAllPredictions] = useState<any[]>([]);
  const [match, setMatch] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [homeScore, setHomeScore] = useState<string>('');
  const [awayScore, setAwayScore] = useState<string>('');

  // Функція для перевірки, чи настав час матчу (для блокування інпутів)
  const isTimePassed = (date: string, time: string) => {
    const matchTime = new Date(`${date}T${time}:00`);
    const now = new Date();
    return now >= matchTime;
  };

  async function fetchAllPredictions(numericMatchId: number) {
    const { data } = await supabase
      .from('predictions')
      .select('id, predicted_home_score, predicted_away_score, points_awarded, profiles (email)')
      .eq('match_id', numericMatchId)
      .order('id', { ascending: false });
      
    if (data) setAllPredictions(data);
  }

  useEffect(() => {
    async function loadData() {
      if (!matchId) return;
      const numericMatchId = parseInt(matchId, 10);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setCurrentUser(user);

        const { data: matchData } = await supabase
          .from('matches')
          .select('*')
          .eq('id', numericMatchId)
          .single();

        if (matchData) {
          setMatch(matchData);
          
          await fetchAllPredictions(numericMatchId);

          if (user) {
            const { data: predData } = await supabase
              .from('predictions')
              .select('*')
              .eq('user_id', user.id)
              .eq('match_id', matchData.id)
              .single();

            if (predData) {
              setHomeScore(predData.predicted_home_score.toString());
              setAwayScore(predData.predicted_away_score.toString());
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [matchId]);

  const handleSavePrediction = async () => {
  if (!currentUser || !match) return;

  if (isTimePassed(match.match_date, match.match_time)) {
    alert('⚠️ Прийом прогнозів закрито: час матчу настав!');
    return;
  }

  const home = parseInt(homeScore);
  const away = parseInt(awayScore);

  if (isNaN(home) || isNaN(away)) {
    alert('Введіть коректний рахунок');
    return;
  }
  if (isMatchFinished) {
  alert('⚠️ Матч завершено — прогнози більше не приймаються!');
  return;
}

  setIsSaving(true);
  try {
    const { error } = await supabase
      .from('predictions')
      .upsert({
        user_id: currentUser.id,
        match_id: parseInt(matchId, 10),
        predicted_home_score: home,
        predicted_away_score: away
      }, { onConflict: 'user_id,match_id' });

    if (error) throw error;

    await fetchAllPredictions(parseInt(matchId, 10));
    alert('Прогноз успішно збережено!');
  } catch (error: any) {
    console.error('Supabase error:', error);
    alert(`⚠️ Помилка: ${error?.message || 'Невідома помилка'}`);
  } finally {
    setIsSaving(false);
  }
};

  if (loading) return <div className="flex h-full items-center justify-center text-zinc-500 bg-zinc-950">Завантаження...</div>;
  if (!match) return <div className="p-6 text-center text-red-400 bg-zinc-950">Матч не знайдено</div>;
  
  // Перевірка, чи є реальний результат матчу (щоб показати рахунок і бали)
  const isMatchFinished = match.status === 'finished' || (match.home_score !== null && match.home_score !== undefined);

  const isLocked = isTimePassed(match.match_date, match.match_time) || isMatchFinished;

  return (
    <div className="flex flex-col h-full bg-zinc-950 px-4 pt-6 pb-12">
      <Link href={`/tournaments/${tournamentId}/group-stage`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="text-sm font-medium">До списку матчів</span>
      </Link>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 mb-6 shadow-2xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <Clock size={18} className="text-zinc-500" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{match.match_date} • {match.match_time}</span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-3 w-1/3">
            <img src={`https://flagcdn.com/w160/${match.home_code}.png`} className="w-20 h-12 object-cover rounded-lg shadow-lg" alt={match.home_team} />
            <span className="text-zinc-100 font-bold text-sm uppercase text-center">{match.home_team}</span>
          </div>

          <div className="text-center w-1/3 flex justify-center items-center">
            {isMatchFinished ? (
              <div className="text-3xl font-black text-green-400 bg-green-500/10 px-4 py-2 rounded-2xl border border-green-500/20 tracking-wider flex items-center whitespace-nowrap gap-2">
                {match.home_score} <span className="text-green-500/50">:</span> {match.away_score}
              </div>
            ) : (
              <div className="text-3xl font-black text-zinc-700">VS</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 w-1/3">
            <img src={`https://flagcdn.com/w160/${match.away_code}.png`} className="w-20 h-12 object-cover rounded-lg shadow-lg" alt={match.away_team} />
            <span className="text-zinc-100 font-bold text-sm uppercase text-center">{match.away_team}</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 mb-8">
        <h3 className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          {isLocked ? <Lock size={14} /> : <Trophy size={14} />}
          {isLocked ? 'Прийом прогнозів закрито' : 'Ваш прогноз'}
        </h3>
        
        <div className="flex justify-center items-center gap-6 mb-8">
          <input type="number" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} disabled={isLocked} className="w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-2xl text-center text-5xl font-black text-white focus:border-green-500 outline-none transition-all" placeholder="0" />
          <span className="text-2xl text-zinc-700 font-bold">:</span>
          <input type="number" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} disabled={isLocked} className="w-24 h-24 bg-zinc-950 border border-zinc-800 rounded-2xl text-center text-5xl font-black text-white focus:border-green-500 outline-none transition-all" placeholder="0" />
        </div>

        {!isLocked && (
          <button 
            onClick={handleSavePrediction}
            disabled={homeScore === '' || awayScore === '' || isSaving}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-900/20"
          >
            {isSaving ? 'Збереження...' : 'Підтвердити прогноз'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Users size={16} />
          <h3 className="text-xs font-bold uppercase tracking-wider">Прогнози ліги ({allPredictions.length})</h3>
        </div>
        <div className="space-y-2">
          {allPredictions.length > 0 ? allPredictions.map((pred) => (
            <div key={pred.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <span className="text-zinc-400 text-sm truncate mr-4">{pred.profiles?.email}</span>
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-black text-white text-lg tabular-nums">{pred.predicted_home_score} : {pred.predicted_away_score}</span>
                
                {/* Відображення балів, якщо матч ДІЙСНО завершено */}
                {isMatchFinished && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg min-w-[35px] text-center ${
                    (pred.points_awarded ?? 0) > 0 
                      ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
                      : 'text-zinc-500 bg-zinc-800'
                  }`}>
                    {(pred.points_awarded ?? 0) > 0 ? `+${pred.points_awarded}` : '0'}
                  </span>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-zinc-600 flex flex-col items-center gap-2">
              <AlertCircle size={24} />
              <p className="text-sm">Прогнозів ще немає. Будь першим!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}