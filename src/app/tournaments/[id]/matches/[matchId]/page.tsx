import Link from 'next/link';
import { ArrowLeft, Clock, Users, Lock, AlertCircle } from 'lucide-react';
import { createClient } from '@/src/utils/supabase';
import PredictionForm from '@/src/components/PredictionForm';
import { TOURNAMENTS_CONFIG } from '@/src/config/tournametns'; 

export default async function MatchPredictionPage({
  params,
}: {
  params: Promise<{ id: string; matchId: string }>;
}) {
  const resolvedParams = await params;
  const tournamentId = resolvedParams.id;
  const matchIdString = resolvedParams.matchId;
  const numericMatchId = parseInt(matchIdString, 10);

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: match }, { data: teams }] = await Promise.all([
    supabase
      .from('matches')
      .select('*')
      .eq('id', numericMatchId)
      .single(),
    supabase
      .from('teams')
      .select('name, logo_url')
      .eq('tournament_id', tournamentId)
  ]);

  if (!match) {
    return <div className="p-6 text-center text-red-400 bg-zinc-950 h-full flex items-center justify-center">Матч не знайдено</div>;
  }

  // логотипи з БД якщо є, інакше прапори
  const logoMap: Record<string, string> = {};
  (teams || []).forEach(t => { logoMap[t.name] = t.logo_url });

  const getLogo = (teamName: string, code: string) => {
    if (logoMap[teamName]) return logoMap[teamName];
    return `https://flagcdn.com/w160/${code}.png`;
  };

  const { data: rawPredictions } = await supabase
    .from('predictions')
    .select('id, user_id, predicted_home_score, predicted_away_score, points_awarded, profiles (username)')
    .eq('match_id', numericMatchId)
    .order('id', { ascending: false });

  let userPrediction = null;
  if (user) {
    const { data: predData } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', user.id)
      .eq('match_id', numericMatchId)
      .single();
    userPrediction = predData;
  }

  const isMatchLive = match.status === 'live';
  const isMatchFinished = match.status === 'finished';

  const isTimePassed = (date: string, time: string) => {
    const nowInKievStr = new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' });
    const nowInKiev = new Date(nowInKievStr).getTime();
    const matchTimeObj = new Date(`${date}T${time}:00`).getTime();
    return nowInKiev >= matchTimeObj;
  };

  const isMatchStartedByTime = isTimePassed(match.match_date, match.match_time);
  const isLocked = isMatchLive || isMatchFinished || isMatchStartedByTime;

  const allPredictions = (rawPredictions || []).map((pred) => {
    const isMyPrediction = user && pred.user_id === user.id;
    if (!isLocked && !isMyPrediction) {
      return { ...pred, predicted_home_score: null, predicted_away_score: null };
    }
    return pred;
  });

  const config = TOURNAMENTS_CONFIG[tournamentId];

  let backHref = '';
  if (config?.hasGroupStage && config?.hasPlayOff) {
    const minPlayOff = config?.playOffRounds?.[0]?.value ?? 4;
    backHref = match.round >= minPlayOff
      ? `/tournaments/${tournamentId}/play-off`
      : `/tournaments/${tournamentId}/group-stage`;
  } else {
    backHref = `/tournaments/${tournamentId}/matches`;
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 px-4 pt-6 pb-12">
      <Link href={backHref} className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">До списку матчів</span>
      </Link>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 mb-6 shadow-2xl">
        <div className="flex justify-center items-center gap-3 mb-8">
          <Clock size={18} className="text-zinc-500" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{match.match_date} • {match.match_time}</span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-3 w-1/3">
            <img
              src={getLogo(match.home_team, match.home_code)}
              className="w-16 h-16 object-contain"
              alt={match.home_team}
            />
            <span className="text-zinc-100 font-bold text-sm uppercase text-center">{match.home_team}</span>
          </div>

          <div className="text-center w-1/3 flex justify-center items-center">
            {isMatchFinished || isMatchLive ? (
              <div className="text-3xl font-black text-green-400 bg-green-500/10 px-4 py-2 rounded-2xl border border-green-500/20 tracking-wider flex items-center whitespace-nowrap gap-2">
                {match.home_score} <span className="text-green-500/50">:</span> {match.away_score}
              </div>
            ) : (
              <div className="text-3xl font-black text-zinc-700">VS</div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 w-1/3">
            <img
              src={getLogo(match.away_team, match.away_code)}
              className="w-16 h-16 object-contain"
              alt={match.away_team}
            />
            <span className="text-zinc-100 font-bold text-sm uppercase text-center">{match.away_team}</span>
          </div>
        </div>
      </div>

      <PredictionForm
        matchId={numericMatchId}
        userId={user?.id}
        matchStatus={match.status}
        matchDate={match.match_date}
        matchTime={match.match_time}
        initialHomeScore={userPrediction?.predicted_home_score?.toString() || ''}
        initialAwayScore={userPrediction?.predicted_away_score?.toString() || ''}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-400">
          <Users size={16} />
          <h3 className="text-xs font-bold uppercase tracking-wider">Прогнози ліги ({allPredictions.length})</h3>
        </div>
        <div className="space-y-2">
          {allPredictions.length > 0 ? allPredictions.map((pred) => {
            const profile = Array.isArray(pred.profiles) ? pred.profiles[0] : pred.profiles;
            const isHidden = pred.predicted_home_score === null || pred.predicted_away_score === null;

            return (
              <div key={pred.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <span className="text-zinc-400 text-sm truncate mr-4">{profile?.username || 'Анонімний гравець'}</span>
                <div className="flex items-center gap-4 shrink-0">
                  {isHidden ? (
                    <div className="flex items-center gap-1.5 text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-xl border border-zinc-800">
                      <Lock size={14} />
                      <span className="text-xs font-medium">Приховано</span>
                    </div>
                  ) : (
                    <span className="font-black text-white text-lg tabular-nums">
                      {pred.predicted_home_score} : {pred.predicted_away_score}
                    </span>
                  )}
                  {isMatchFinished && !isHidden && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg min-w-[35px] text-center ${
                      (pred.points_awarded ?? 0) > 0
                        ? 'text-green-400 bg-green-500/10 border border-green-500/20'
                        : 'text-zinc-500 bg-zinc-800'
                    }`}>
                      {(pred.points_awarded ?? 0) > 0 ? `+${pred.points_awarded}` : '0'}
                    </span>
                  )}
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-8 text-zinc-600 flex flex-col items-center gap-2">
              <AlertCircle size={24} />
              <p className="text-sm">Прогнозів ще немає. Будь першим!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}