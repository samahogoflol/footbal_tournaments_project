import { supabase } from '@/src/lib/supabase';
import MatchesClientBoard from './MatchesClientBoard';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';

export default async function GroupStagePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const tournamentId = resolvedParams.id;

  const config = TOURNAMENTS_CONFIG[tournamentId];
  const maxGroupRound = (config?.groupStageRounds?.at(-1)?.value ?? 3) + 1;

  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .eq('tournament_id', tournamentId)
    .lt('round', maxGroupRound) 
    .order('match_date', { ascending: true })
    .order('match_time', { ascending: true });

  if (error) {
    console.error("Помилка завантаження матчів з бази:", error);
  }

  return (
    <MatchesClientBoard
      initialMatches={matches || []}
      tournamentId={tournamentId}
      rounds={config?.groupStageRounds ?? []}
    />
  );
}