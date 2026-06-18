'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace('#', ''));
    const query = new URLSearchParams(window.location.search);

    const error = hash.get('error') || query.get('error');
    const errorDescription = hash.get('error_description') || query.get('error_description');

    if (error) {
      setSessionError(errorDescription?.replace(/\+/g, ' ') || 'Посилання недійсне або застаріло');
      return;
    }

    const code = query.get('code');
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) setSessionError('Не вдалось активувати сесію');
        else setSessionReady(true);
      });
    } else {
      setSessionReady(true);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setTimeout(() => router.push('/auth/login'), 2000);
    }
    setIsSaving(false);
  };

  if (sessionError) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md bg-zinc-900 p-10 rounded-2xl border border-zinc-800 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Посилання застаріло</h1>
          <p className="text-zinc-400 text-sm mb-6">{sessionError}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full bg-green-500 text-black font-bold py-4 rounded-xl transition-transform active:scale-95"
          >
            Запросити нове посилання
          </button>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950">
        <p className="text-zinc-500">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-zinc-950 px-4">
      <form onSubmit={handleUpdate} className="w-full max-w-md bg-zinc-900 p-10 rounded-2xl border border-zinc-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Новий пароль</h1>

        <input
          type="password"
          placeholder="Введіть новий пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-5 bg-zinc-800 rounded-xl text-white border border-zinc-700 focus:border-green-500 outline-none transition-colors"
          required
          minLength={6}
        />

        {status === 'success' && (
          <div className="p-3 mb-4 rounded-lg text-sm text-center bg-emerald-500/10 text-emerald-400">
            Пароль змінено! Перенаправлення...
          </div>
        )}
        {status === 'error' && (
          <div className="p-3 mb-4 rounded-lg text-sm text-center bg-red-500/10 text-red-400">
            Помилка. Спробуй ще раз або запроси нове посилання.
          </div>
        )}

        <button
          type="submit"
          disabled={isSaving || password.length < 6}
          className="w-full bg-green-500 text-black font-bold py-4 rounded-xl transition-transform active:scale-95 disabled:opacity-50"
        >
          {isSaving ? 'Збереження...' : 'Зберегти пароль'}
        </button>
      </form>
    </div>
  );
}