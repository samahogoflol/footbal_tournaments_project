import { supabase } from '@/src/lib/supabase';
import MatchesClientBoard from './MatchesClientBoard';

export default async function GroupStagePage({ params }: { params: { id: string } }) {
  const tournamentId = params.id;

  // Серверний запит: Next.js автоматично покаже loading.tsx, поки чекає на цей await
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true });

  if (error) {
    console.error("Помилка завантаження матчів з бази:", error);
  }

  return (
    // Передаємо готові дані у наш майбутній клієнтський компонент
    <MatchesClientBoard 
      initialMatches={matches || []} 
      tournamentId={tournamentId} 
    />
  );
}