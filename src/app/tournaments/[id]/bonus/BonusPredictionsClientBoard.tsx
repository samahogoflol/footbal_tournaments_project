'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  Crosshair,
  Star,
  HelpCircle,
  LayoutList,
  Save,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/src/utils/supabase-browser';
import { useBonusPredictions } from '@/src/utils/customHooks/useBonusPredictions';
import TeamSelect from '@/src/components/TeamSelect';
import YesNoToggle from '@/src/components/YesNoToggle';

type Team = { name: string; logo_url: string | null };

type BonusQuestion = {
  id: number;
  question_type: string;
  question_text: string;
  points_per_hit: number;
  points_exact: number | null;
  sort_order: number;
};

type PredictionRow = { question_id: number; position: number; answer: string };

interface BonusPredictionsClientBoardProps {
  tournamentId: string;
  tournamentName: string;
  questions: BonusQuestion[];
  teams: Team[];
  bonusDeadline: string | null;
}

type QuestionKind = 'team' | 'text' | 'boolean' | 'ranked';

const QUESTION_META: Record<
  string,
  {
    icon: LucideIcon;
    color: string;
    bg: string;
    kind: QuestionKind;
    count?: number;
    direction?: 'top' | 'bottom';
  }
> = {
  winner: {
    icon: Trophy,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    kind: 'team',
  },
  top_scorer: {
    icon: Crosshair,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    kind: 'text',
  },
  player_of_season: {
    icon: Star,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    kind: 'text',
  },
  goals_record: {
    icon: HelpCircle,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    kind: 'boolean',
  },
  shakhtar_playoff: {
    icon: Star,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    kind: 'boolean',
  },
  top8: {
    icon: LayoutList,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    kind: 'ranked',
    count: 8,
  },
  top5: {
    icon: LayoutList,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    kind: 'ranked',
    count: 5,
  },
  bottom3: {
    icon: LayoutList,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    kind: 'ranked',
    count: 3,
    direction: 'bottom',
  },
};

const formatDeadline = (iso: string) =>
  new Date(iso).toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function BonusPredictionsClientBoard({
  tournamentId,
  tournamentName,
  questions,
  teams,
  bonusDeadline,
}: BonusPredictionsClientBoardProps) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [predictionsByQuestion, setPredictionsByQuestion] = useState<Record<number, PredictionRow[]>>({});

  const { isLocked, savingQuestionId, saveAnswer } = useBonusPredictions({
    userId: userId ?? undefined,
    bonusDeadline,
  });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (user && questions.length > 0) {
        const { data } = await supabase
          .from('bonus_predictions')
          .select('question_id, position, answer')
          .eq('user_id', user.id)
          .in('question_id', questions.map((q) => q.id));

        if (data) {
          const grouped: Record<number, PredictionRow[]> = {};
          data.forEach((row) => {
            if (!grouped[row.question_id]) grouped[row.question_id] = [];
            grouped[row.question_id].push(row);
          });
          Object.values(grouped).forEach((rows) => rows.sort((a, b) => a.position - b.position));
          setPredictionsByQuestion(grouped);
        }
      }

      setLoadingUser(false);
    };

    load();
  }, [supabase, questions]);

  return (
    <div className="flex flex-col h-full animate-fade-in bg-zinc-950 px-3 pt-4 pb-4">
      <Link
        href={`/tournaments/${tournamentId}`}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors w-fit mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm tracking-wide">До турніру</span>
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700 shadow-md">
          <Sparkles className="text-purple-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Бонусні прогнози</h2>
          <p className="text-sm text-zinc-400">{tournamentName}</p>
        </div>
      </div>

      {bonusDeadline ? (
        <div
          className={`mb-6 p-4 rounded-xl border text-sm font-medium ${
            isLocked
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-zinc-800/40 border-zinc-700/50 text-zinc-300'
          }`}
        >
          {isLocked
            ? 'Прийом бонусних прогнозів закрито.'
            : `Прийом прогнозів до ${formatDeadline(bonusDeadline)} (Київ)`}
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl border bg-zinc-800/40 border-zinc-700/50 text-zinc-400 text-sm font-medium">
          Прийом бонусних прогнозів ще не відкрито.
        </div>
      )}

      {!loadingUser && !userId && (
        <div className="mb-6 p-4 rounded-xl border bg-yellow-500/10 border-yellow-500/20 text-yellow-400 text-sm font-medium">
          Увійдіть в акаунт, щоб зробити бонусні прогнози.
        </div>
      )}

      {loadingUser ? (
        <div className="text-center text-zinc-500 py-12">Завантаження...</div>
      ) : questions.length === 0 ? (
        <div className="text-center text-zinc-500 py-12">Бонусні питання для цього турніру ще не додані.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map((question) => (
            <BonusQuestionCard
              key={question.id}
              question={question}
              teams={teams}
              existingRows={predictionsByQuestion[question.id] ?? []}
              isLocked={isLocked || !userId}
              isSaving={savingQuestionId === question.id}
              onSave={(rows) => saveAnswer(question.id, rows)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BonusQuestionCardProps {
  question: BonusQuestion;
  teams: Team[];
  existingRows: PredictionRow[];
  isLocked: boolean;
  isSaving: boolean;
  onSave: (rows: { position: number; answer: string }[]) => void;
}

function BonusQuestionCard({ question, teams, existingRows, isLocked, isSaving, onSave }: BonusQuestionCardProps) {
  const meta = QUESTION_META[question.question_type];

  const singleInitial = existingRows[0]?.answer ?? '';
  const [textValue, setTextValue] = useState(singleInitial);
  const [teamValue, setTeamValue] = useState(singleInitial);
  const [boolValue, setBoolValue] = useState<'yes' | 'no' | null>(
    singleInitial === 'yes' || singleInitial === 'no' ? singleInitial : null
  );

  const rankedCount = meta?.count ?? 0;
  const [rankedValues, setRankedValues] = useState<string[]>(() => {
    const values = Array.from({ length: rankedCount }, () => '');
    existingRows.forEach((row) => {
      if (row.position >= 1 && row.position <= rankedCount) values[row.position - 1] = row.answer;
    });
    return values;
  });

  if (!meta) return null;

  const Icon = meta.icon;
  const pointsLabel =
    meta.kind === 'ranked'
      ? `+${question.points_per_hit} / +${question.points_exact ?? 0} бал`
      : `+${question.points_per_hit} балів`;

  const canSave = (() => {
    if (meta.kind === 'team') return teamValue.trim().length > 0;
    if (meta.kind === 'text') return textValue.trim().length > 0;
    if (meta.kind === 'boolean') return boolValue !== null;
    if (meta.kind === 'ranked') {
      const filled = rankedValues.every((v) => v.trim().length > 0);
      const unique = new Set(rankedValues).size === rankedValues.length;
      return filled && unique;
    }
    return false;
  })();

  const handleSave = () => {
    if (meta.kind === 'team') onSave([{ position: 0, answer: teamValue }]);
    else if (meta.kind === 'text') onSave([{ position: 0, answer: textValue.trim() }]);
    else if (meta.kind === 'boolean') onSave([{ position: 0, answer: boolValue as string }]);
    else if (meta.kind === 'ranked') onSave(rankedValues.map((answer, i) => ({ position: i + 1, answer })));
  };

  const noTeamsYet = (meta.kind === 'team' || meta.kind === 'ranked') && teams.length === 0;

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg border shrink-0 ${meta.bg}`}>
            <Icon className={meta.color} size={20} />
          </div>
          <span className="text-zinc-100 font-semibold text-sm leading-relaxed pt-1">{question.question_text}</span>
        </div>
        <span className={`shrink-0 text-xs font-black ${meta.color}`}>{pointsLabel}</span>
      </div>

      {noTeamsYet ? (
        <p className="text-zinc-500 text-sm">Команди турніру ще не додані.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {meta.kind === 'team' && (
            <TeamSelect teams={teams} value={teamValue} onChange={setTeamValue} disabled={isLocked} />
          )}

          {meta.kind === 'text' && (
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              disabled={isLocked}
              placeholder="Введіть відповідь"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-green-500 outline-none transition-colors disabled:opacity-50"
            />
          )}

          {meta.kind === 'boolean' && (
            <YesNoToggle value={boolValue} onChange={setBoolValue} disabled={isLocked} />
          )}

          {meta.kind === 'ranked' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rankedValues.map((value, i) => {
                const place =
                  meta.direction === 'bottom' ? teams.length - rankedCount + i + 1 : i + 1;
                return (
                <div key={i}>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">
                    {place} місце
                  </label>
                  <TeamSelect
                    teams={teams}
                    value={value}
                    onChange={(name) => {
                      setRankedValues((prev) => {
                        const next = [...prev];
                        next[i] = name;
                        return next;
                      });
                    }}
                    excludeNames={rankedValues.filter((_, idx) => idx !== i)}
                    disabled={isLocked}
                  />
                </div>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isLocked || isSaving || !canSave}
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-zinc-950 border border-green-500/20 font-bold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-500/10 disabled:hover:text-green-500"
          >
            <Save size={16} />
            {isSaving ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      )}
    </div>
  );
}
