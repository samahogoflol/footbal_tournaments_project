import { useMemo, useState } from 'react';
import { createBrowserSupabaseClient } from '@/src/utils/supabase-browser';

interface UseBonusPredictionsProps {
  userId?: string;
  bonusDeadline: string | null;
}

export function useBonusPredictions({ userId, bonusDeadline }: UseBonusPredictionsProps) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [savingQuestionId, setSavingQuestionId] = useState<number | null>(null);

  const isLocked = useMemo(() => {
    if (!bonusDeadline) return true;
    return new Date().getTime() >= new Date(bonusDeadline).getTime();
  }, [bonusDeadline]);

  const saveAnswer = async (
    questionId: number,
    rows: { position: number; answer: string }[]
  ) => {
    if (!userId) {
      alert('⚠️ Потрібно авторизуватись, щоб робити бонусні прогнози');
      return false;
    }

    if (isLocked) {
      alert('⚠️ Прийом бонусних прогнозів закрито');
      return false;
    }

    setSavingQuestionId(questionId);

    try {
      const payload = rows.map((row) => ({
        user_id: userId,
        question_id: questionId,
        position: row.position,
        answer: row.answer,
      }));

      const { error } = await supabase
        .from('bonus_predictions')
        .upsert(payload, { onConflict: 'user_id,question_id,position' });

      if (error) throw error;

      alert('Бонусний прогноз збережено!');
      return true;
    } catch (error: any) {
      console.error('Supabase error:', error);

      if (error?.message?.includes('row-level security') || error?.code === '42501') {
        alert('⚠️ Прийом бонусних прогнозів закрито');
      } else {
        alert(`⚠️ Помилка: ${error?.message || 'Невідома помилка'}`);
      }
      return false;
    } finally {
      setSavingQuestionId(null);
    }
  };

  return { isLocked, savingQuestionId, saveAnswer };
}
