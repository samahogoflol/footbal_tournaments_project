'use client';

import { useEffect, useState, useMemo } from 'react';
import { Camera, Save, Lock, Trophy, History, Star, Check } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { PredictionCard } from '@/src/components/PredictionCard';
import Link from 'next/link';

export default function ProfilePage() {
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isSavingNickname, setIsSavingNickname] = useState(false);
  const [nicknameSaved, setNicknameSaved] = useState(false);

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [tournaments, setTournaments] = useState<any[]>([]);
  const [tournamentStats, setTournamentStats] = useState<Record<string, any>>({});

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email ?? '');
        setUserId(user.id);

        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        setNickname(profile?.username ?? '');

        const { data: historyData, error: historyError } = await supabase
          .from('predictions')
          .select(`
            id,
            predicted_home_score,
            predicted_away_score,
            points_awarded,
            updated_at,
            matches (
              home_team,
              away_team,
              home_code,
              away_code,
              match_date,
              match_time,
              home_score,
              away_score,
              status
            )
          `)
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })

        if (!historyError && historyData) {
          const sorted = [...historyData].sort((a, b) => {
            const matchA = a.matches as any;
            const matchB = b.matches as any;
            if (!matchA || !matchB) return 0;

            const [dayA, monthA] = matchA.match_date.split('.').map(Number);
            const [dayB, monthB] = matchB.match_date.split('.').map(Number);
            const [hA, mA] = matchA.match_time.split(':').map(Number);
            const [hB, mB] = matchB.match_time.split(':').map(Number);

            const dateA = new Date(2026, monthA - 1, dayA, hA, mA).getTime();
            const dateB = new Date(2026, monthB - 1, dayB, hB, mB).getTime();

            return dateB - dateA;
          });
          setHistory(sorted.slice(0, 3)); 
        }

        const { data: tournamentsList } = await supabase
          .from('tournaments')
          .select('*')
          .order('name');

        if (tournamentsList) setTournaments(tournamentsList);

        const { data: statsList } = await supabase
          .from('tournament_user_statistics')
          .select('tournament_id, total_points, tournament_rank')
          .eq('user_id', user.id);

        if (statsList) {
          const statsMap: Record<string, any> = {};
          statsList.forEach(stat => {
            statsMap[stat.tournament_id] = stat;
          });
          setTournamentStats(statsMap);
        }
      }
      setLoadingHistory(false);
    };

    fetchUserAndData();
  }, [supabase]);

  const handleSaveNickname = async () => {
    if (!userId || !nickname.trim()) return;
    setIsSavingNickname(true);

    const { error } = await supabase
      .from('profiles')
      .update({ username: nickname.trim() })
      .eq('id', userId);

    if (!error) {
      setNicknameSaved(true);
      setTimeout(() => setNicknameSaved(false), 2000);
    }
    setIsSavingNickname(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setPasswordStatus('idle');

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error("Помилка оновлення пароля:", error.message);
      setPasswordStatus('error');
    } else {
      setPasswordStatus('success');
      setNewPassword('');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordStatus('idle');
      }, 2000);
    }
    setIsChangingPassword(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 px-4 pt-6 pb-12">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-8">Особистий кабінет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* ЛІВА КОЛОНКА */}
        <div className="lg:col-span-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl flex flex-col items-center">
          <div className="relative mb-6 group cursor-pointer">
            <div className="w-32 h-32 bg-zinc-800 rounded-full border-4 border-zinc-800 shadow-inner flex items-center justify-center overflow-hidden transition-all group-hover:border-green-500/50">
              <Camera size={40} className="text-zinc-600 group-hover:text-green-400 transition-colors" />
            </div>
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Змінити</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-zinc-800 border border-zinc-700 text-xs font-bold px-2 py-1 rounded-lg text-zinc-400 shadow-lg">
              Згодом
            </div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Ваш Нікнейм</label>
              <div className="flex gap-2">
                <input
                  placeholder="Введіть Ваш нікнейм/Ім'я"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-green-500 outline-none transition-colors"
                />
                <button
                  onClick={handleSaveNickname}
                  disabled={isSavingNickname || !nickname.trim()}
                  className={`p-3 rounded-xl transition-colors border shrink-0 ${
                    nicknameSaved
                      ? 'bg-green-500 text-zinc-950 border-green-500'
                      : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-zinc-950 border-green-500/20'
                  } disabled:opacity-50`}
                >
                  {nicknameSaved ? <Check size={20} /> : <Save size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Ваша Пошта</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-500 outline-none"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800/50">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors font-medium text-sm"
              >
                <Lock size={16} className="text-zinc-400" />
                Змінити пароль
              </button>
            </div>
          </div>
        </div>

        {/* ПРАВА КОЛОНКА */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-3xl border border-zinc-800 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-green-500/5">
              <Trophy size={200} />
            </div>

            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
              <Star size={16} className="text-green-500" />
              Переглянути статистику по турнірам
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {tournaments.map((t) => {
                const stats = tournamentStats[t.id];
                const points = stats?.total_points || 0;
                const rank = stats?.tournament_rank || '—';
                const isUpcoming = t.status === 'upcoming';

                const CardContent = (
                  <>
                    <span className="text-xs font-bold text-zinc-500 uppercase flex justify-between items-center mb-3">
                      {t.name}
                      {isUpcoming && <Lock size={14} className="text-zinc-600" />}
                    </span>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-4xl font-black text-white">{points}</span>
                      <span className="text-sm font-medium text-zinc-400 mb-1">балів</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase flex justify-between items-center bg-zinc-950 p-2 rounded-lg border border-zinc-800/50">
                      <span>Місце в рейтингу:</span>
                      <span className={`text-sm ${rank !== '—' ? 'text-green-400' : 'text-zinc-600'}`}>
                        {rank !== '—' ? `#${rank}` : '—'}
                      </span>
                    </div>
                  </>
                );

                if (isUpcoming) {
                  return (
                    <div key={t.id} className="bg-zinc-950/30 border border-zinc-800/30 p-5 rounded-2xl opacity-50 cursor-not-allowed">
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <Link
                    key={t.id}
                    href={`/profile/statistics/${t.id}`}
                    className="block bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl hover:border-green-500/50 hover:bg-zinc-900 transition-all group cursor-pointer"
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl flex-1">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} />
              Історія прогнозів
            </h2>

            <div className="space-y-3">
              {loadingHistory ? (
                <div className="text-center text-zinc-500 py-4">Завантаження...</div>
              ) : history.length === 0 ? (
                <div className="text-center text-zinc-500 py-4">У вас ще немає прогнозів.</div>
              ) : (
                history.map((item) => (
                  <PredictionCard key={item.id} item={item} />
                ))
              )}

              {history.length > 0 && (
                <Link
                  href="/profile/predictions-history"
                  className="block w-fit m-auto border border-zinc-700 px-4 py-2 mt-4 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-center"
                >
                  Вся історія прогнозів
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* МОДАЛКА ЗМІНИ ПАРОЛЯ */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2 text-center">Зміна пароля</h2>
            <p className="text-zinc-500 text-sm mb-6 text-center">Введіть новий пароль для вашого акаунту</p>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="password"
                placeholder="Новий пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-zinc-700 focus:border-green-500 outline-none transition-colors"
                required
                minLength={6}
                disabled={isChangingPassword}
              />

              {passwordStatus === 'success' && (
                <div className="p-3 rounded-lg text-sm text-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Пароль успішно змінено!
                </div>
              )}
              {passwordStatus === 'error' && (
                <div className="p-3 rounded-lg text-sm text-center bg-red-500/10 text-red-400 border border-red-500/20">
                  Помилка. Спробуй ще раз.
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setNewPassword(''); setPasswordStatus('idle'); }}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 font-medium transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword || newPassword.length < 6}
                  className="flex-1 py-3 rounded-xl bg-green-500 text-zinc-950 font-bold hover:bg-green-400 disabled:opacity-50 transition-colors"
                >
                  {isChangingPassword ? 'Збереження...' : 'Зберегти'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}