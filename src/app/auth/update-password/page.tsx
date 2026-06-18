'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/src/utils/supabase-browser';

export default function UpdatePasswordPage() {
  const supabase = createBrowserSupabaseClient();
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

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

  return (
    <div className="flex h-full items-center justify-center bg-zinc-950 py-10 px-5">
      <form onSubmit={handleUpdate} className="w-full max-w-md bg-zinc-900 p-10 rounded-2xl border border-zinc-800 ">
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