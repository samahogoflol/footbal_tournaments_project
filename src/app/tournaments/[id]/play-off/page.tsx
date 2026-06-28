import { supabase } from '@/src/lib/supabase';
import PlayOffClientBoard from './PlayOffClientBoard';

export default async function PlayOffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = await params;

  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .gte('round', 4)
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true });

  if (error) {
    console.error("Помилка завантаження матчів плей-офф:", error);
  }

  return (
    <PlayOffClientBoard
      initialMatches={matches || []}
      tournamentId={tournamentId}
    />
  );
}