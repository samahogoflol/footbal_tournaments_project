import { createClient } from '@/src/utils/supabase';
import LeaderboardClient from './LeaderboardClient';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';

export default async function LeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  
  const { id: tournamentId } = await params;
  const config = TOURNAMENTS_CONFIG[tournamentId];

  const { data } = await supabase
    .from('tournament_points')
    .select(`points, profiles ( id, username )`)
    .eq('tournament_id', tournamentId)
    .order('points', { ascending: false });

  const users = (data || []).map((item, index) => {
  const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
  return {
    id: profile?.id || `user-${index}`,
    username: profile?.username || 'Анонімний гравець',
    points: item.points || 0,
  };
});

  return <LeaderboardClient 
    users={users} 
    tournamentId={tournamentId} 
    tournamentName={config?.name ?? ''} 
    />;
}