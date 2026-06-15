// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true); // true = Вхід, false = Реєстрація
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // ЛОГІКА ВХОДУ
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;
        
        // Якщо успішно - кидаємо на список турнірів
        router.push('/tournaments');
        router.refresh(); // Оновлюємо стан Next.js

      } else {
        // ЛОГІКА РЕЄСТРАЦІЇ
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // ВАЖЛИВО: Оскільки ми вимкнули Confirm Email, юзер одразу логіниться.
        // Нам треба створити йому запис у таблиці profiles
        if (signUpData.user) {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: signUpData.user.id,
            username: email.split('@')[0], // Тимчасовий нікнейм з пошти
          });
          
          if (profileError) console.error("Помилка створення профілю:", profileError);
        }

        router.push('/tournaments');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Сталася помилка при авторизації');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4 animate-fade-in">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-zinc-100 mb-2">
            {isLogin ? 'З поверненням!' : 'Новий гравець'}
          </h1>
          <p className="text-zinc-400 text-sm">
            {isLogin ? 'Увійди, щоб зробити свої прогнози' : 'Зареєструйся для участі в турнірах'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-zinc-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl py-3 pl-11 pr-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                placeholder="tvoy@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-zinc-500" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl py-3 pl-11 pr-4 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                placeholder="Мінімум 6 символів"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-3.5 rounded-xl transition-all mt-2"
          >
            {loading ? 'Зачекайте...' : (isLogin ? 'Увійти' : 'Створити акаунт')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
          </button>
        </div>
      </div>

      <Link href="/tournaments" className="mt-8 text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
        Повернутися на головну
      </Link>
    </div>
  );
}