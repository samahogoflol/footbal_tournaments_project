import { createClient } from '@/src/utils/supabase';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';
import LeagueMatchesClientBoard from './LeagueMatchesClientBoard';

export default async function LeagueMatchesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = await params;
  const supabase = await createClient();
  const config = TOURNAMENTS_CONFIG[tournamentId];

  const [{ data: matches }, { data: teams }] = await Promise.all([
    supabase
      .from('matches')
      .select('*')
      .eq('tournament_id', tournamentId)
      .order('round', { ascending: true })
      .order('match_date', { ascending: true })
      .order('match_time', { ascending: true }),
    supabase
      .from('teams')
      .select('name, logo_url')
      .eq('tournament_id', tournamentId)
  ]);

  // { 'Арсенал': '/logos/apl/arsenal.svg', ... }
  const logoMap: Record<string, string> = {};
  (teams || []).forEach(t => { logoMap[t.name] = t.logo_url });

  console.log('teams:', teams);
    console.log('logoMap:', logoMap);

  return (
    <LeagueMatchesClientBoard
      initialMatches={matches || []}
      tournamentId={tournamentId}
      rounds={config?.leagueRounds ?? []}
      logoMap={logoMap}
    />
  );
}