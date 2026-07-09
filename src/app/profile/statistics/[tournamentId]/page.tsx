'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowLeft, Trophy, Target, CheckCircle, Percent, TrendingUp, Hash } from 'lucide-react';
import Link from 'next/link';

export default function TournamentStatisticsPage() {
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournamentStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user && tournamentId) {
        const { data, error } = await supabase
          .from('tournament_user_statistics')
          .select('*')
          .eq('user_id', user.id)
          .eq('tournament_id', tournamentId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Помилка завантаження статистики:', error);
        } else {
          setStats(data);
        }
      }
      setLoading(false);
    };

    fetchTournamentStats();
  }, [tournamentId, supabase]);

  if (loading) return (
    <div className="flex h-full items-center justify-center text-zinc-500 bg-zinc-950">
      Завантаження...
    </div>
  );

  if (!stats) return (
    <div className="flex flex-col h-full bg-zinc-950 px-4 pt-6 pb-12">
      <Link href={`/tournaments/${tournamentId}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Назад</span>
      </Link>
      <div className="flex flex-col items-center justify-center flex-1 gap-3 text-zinc-600 mt-20">
        <Trophy size={40} />
        <p className="text-sm">Ще немає статистики — зроби свій перший прогноз!</p>
      </div>
    </div>
  );

  const statCards = [
    {
      label: 'Місце в турнірі',
      value: `#${stats.tournament_rank}`,
      icon: Hash,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
      large: true,
    },
    {
      label: 'Загальні очки',
      value: stats.total_points,
      icon: Trophy,
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/20',
      large: true,
    },
    {
      label: 'Всього прогнозів',
      value: stats.total_predictions,
      icon: Target,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Точні рахунки',
      value: stats.exact_predictions,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Вгадані результати',
      value: stats.correct_outcomes,
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      label: '% точних рахунків',
      value: `${stats.exact_percentage}%`,
      icon: Percent,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: '% вгаданих результатів',
      value: `${stats.outcome_percentage}%`,
      icon: Percent,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-950 px-4 pt-6 pb-12">

      <Link href={`/tournaments/${tournamentId}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Назад до турніру</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-zinc-100 tracking-tight">Моя статистика</h1>
        <p className="text-sm text-zinc-500 mt-1">Чемпіонат Світу 2026</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {statCards.filter(c => c.large).map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`flex flex-col items-center justify-center p-5 rounded-2xl border ${card.bg} gap-2`}>
              <Icon size={22} className={card.color} />
              <span className={`text-3xl font-black ${card.color}`}>{card.value}</span>
              <span className="text-xs text-zinc-500 text-center font-medium">{card.label}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statCards.filter(c => !c.large).map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-800 bg-zinc-900 gap-2">
              <Icon size={18} className={card.color} />
              <span className={`text-2xl font-black ${card.color}`}>{card.value}</span>
              <span className="text-xs text-zinc-500 text-center font-medium">{card.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}