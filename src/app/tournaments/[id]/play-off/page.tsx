import { createClient } from '@/src/utils/supabase';
import PlayOffClientBoard from './PlayOffClientBoard';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';

export default async function PlayOffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = await params;
  const supabase = await createClient();
  const config = TOURNAMENTS_CONFIG[tournamentId];
  const minPlayOffRound = config?.playOffRounds?.[0]?.value ?? 4;

  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .eq('tournament_id', tournamentId)
    .gte('round', minPlayOffRound) 
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true });

  if (error) {
    console.error("Помилка завантаження матчів плей-офф:", error);
  }

  return (
    <PlayOffClientBoard
      initialMatches={matches || []}
      tournamentId={tournamentId}
      rounds={config?.playOffRounds || []}
    />
  );
}