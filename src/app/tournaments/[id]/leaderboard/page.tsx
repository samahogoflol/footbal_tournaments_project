import { createClient } from '@/src/utils/supabase';
import LeaderboardClient from './LeaderboardClient';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';

export default async function LeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  
  const { id: tournamentId } = await params;
  const config = TOURNAMENTS_CONFIG[tournamentId];

  const { data: stats } = await supabase
    .from('tournament_user_statistics')
    .select('user_id, total_points')
    .eq('tournament_id', tournamentId)
    .order('total_points', { ascending: false });

  const userIds = (stats || []).map((item) => item.user_id);
  const { data: profiles } = userIds.length
    ? await supabase.from('profiles_public').select('id, username').in('id', userIds)
    : { data: [] };

  const usernameById = new Map((profiles || []).map((p) => [p.id, p.username]));

  const users = (stats || []).map((item, index) => ({
    id: item.user_id || `user-${index}`,
    username: usernameById.get(item.user_id) || 'Анонімний гравець',
    points: item.total_points || 0,
  }));

  return <LeaderboardClient 
    users={users} 
    tournamentId={tournamentId} 
    tournamentName={config?.name ?? ''} 
    />;
}