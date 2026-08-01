import { createClient } from '@/src/utils/supabase';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns';
import { notFound } from 'next/navigation';
import BonusPredictionsClientBoard from './BonusPredictionsClientBoard';

export default async function BonusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: tournamentId } = await params;
  const config = TOURNAMENTS_CONFIG[tournamentId];
  if (!config || !config.hasBonus) notFound();

  const supabase = await createClient();

  const [{ data: questions }, { data: teams }, { data: tournament }] = await Promise.all([
    supabase
      .from('bonus_questions')
      .select('*')
      .eq('tournament_id', tournamentId)
      .order('sort_order', { ascending: true }),
    supabase
      .from('teams')
      .select('name, logo_url')
      .eq('tournament_id', tournamentId)
      .order('name', { ascending: true }),
    supabase
      .from('tournaments')
      .select('bonus_deadline')
      .eq('id', tournamentId)
      .single(),
  ]);

  return (
    <BonusPredictionsClientBoard
      tournamentId={tournamentId}
      tournamentName={config.name}
      questions={questions || []}
      teams={teams || []}
      bonusDeadline={tournament?.bonus_deadline ?? null}
    />
  );
}
