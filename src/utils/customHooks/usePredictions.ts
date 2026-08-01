import { useState, useMemo } from 'react';
import { createBrowserSupabaseClient } from '@/src/utils/supabase-browser';

interface UsePredictionProps {
  matchId: number;
  userId?: string;
  matchStatus: string;
  matchDate: string;
  matchTime: string;
  initialHomeScore?: string;
  initialAwayScore?: string;
  onSuccess?: () => void;
}

const parseMatchTime = (date: string, time: string): number => {
  const [day, month] = date.split('.').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const matchDateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00+03:00`;
  return new Date(matchDateStr).getTime();
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function usePrediction({
  matchId,
  userId,
  matchStatus,
  matchDate,
  matchTime,
  initialHomeScore = '',
  initialAwayScore = '',
  onSuccess
}: UsePredictionProps) {

  const [homeScore, setHomeScore] = useState(initialHomeScore);
  const [awayScore, setAwayScore] = useState(initialAwayScore);
  const [isSaving, setIsSaving] = useState(false);

  const supabase = useMemo(() => createBrowserSupabaseClient(), []);

  const matchTimestamp = useMemo(
    () => parseMatchTime(matchDate, matchTime),
    [matchDate, matchTime]
  );

  const isTooFarAway = useMemo(() => {
    const now = new Date().getTime();
    return matchTimestamp - now > SEVEN_DAYS_MS;
  }, [matchTimestamp]);

  const isLocked = useMemo(() => {
    if (matchStatus === 'live' || matchStatus === 'finished') return true;
    if (isTooFarAway) return true;
    return new Date().getTime() >= matchTimestamp;
  }, [matchStatus, matchTimestamp, isTooFarAway]);

  const handleSavePrediction = async () => {
    if (!userId) {
      alert('⚠️ Потрібно авторизуватись для того, щоб робити прогнози');
      return;
    }

    if (matchStatus === 'finished') {
      alert('⚠️ Матч вже завершився — прогнози більше не приймаються');
      return;
    }

    if (matchStatus === 'live') {
      alert('⚠️ Матч вже почався — прогнози більше не приймаються');
      return;
    }

    if (isTooFarAway) {
      alert('⚠️ Прогнози на цей матч ще не відкриті. Повертайся за 7 днів до матчу');
      return;
    }

    if (new Date().getTime() >= matchTimestamp) {
      alert('⚠️ Час матчу настав — прийом прогнозів закрито');
      return;
    }

    const home = parseInt(homeScore);
    const away = parseInt(awayScore);

    if (isNaN(home) || isNaN(away)) {
      alert('Введіть коректний рахунок');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('predictions')
        .upsert({
          user_id: userId,
          match_id: matchId,
          predicted_home_score: home,
          predicted_away_score: away
        }, { onConflict: 'user_id,match_id' });

      if (error) throw error;

      alert('Прогноз успішно збережено!');
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error('Supabase error:', error);

      if (error?.message?.includes('row-level security') || error?.code === '42501') {
        alert('⚠️ Прийом прогнозів на цей матч закрито');
      } else {
        alert(`⚠️ Помилка: ${error?.message || 'Невідома помилка'}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    homeScore,
    setHomeScore,
    awayScore,
    setAwayScore,
    isSaving,
    isLocked,
    isTooFarAway,
    handleSavePrediction
  };
}