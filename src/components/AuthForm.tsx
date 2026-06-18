'use client';

import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'registration';
  action: (formData: FormData) => Promise<{ error?: string } | void | never>;
  onResetPassword?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export default function AuthForm({ type, action, onResetPassword }: AuthFormProps) {
  const isLogin = type === 'login';
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastEmail, setLastEmail] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setResetStatus({ type: null, message: '' });

    try {
      if (onResetPassword) {
        const res = await onResetPassword(resetEmail);
        if (res.success) {
          setResetStatus({ type: 'success', message: 'Посилання для оновлення паролю надіслано на вашу пошту!' });
          setResetEmail('');
        } else {
          setResetStatus({ type: 'error', message: res.error || 'Щось пішло не так.' });
        }
      } else {
        setResetStatus({ type: 'success', message: 'Запит надіслано! (Підключіть Supabase auth.resetPasswordForEmail)' });
      }
    } catch (err) {
      setResetStatus({ type: 'error', message: 'Сталася помилка при відправці.' });
    } finally {
      setIsSending(false);
    }
  };

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setAuthError(null); 
    
    setLastEmail(formData.get('email') as string || '');

    const result = await action(formData);

    if (result?.error) {
      setAuthError(result.error);
      setIsSubmitting(false); 
    }
  };

  return (
    <>
      <form action={clientAction} className="w-full max-w-md bg-zinc-900 p-10 rounded-2xl border border-zinc-800 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {isLogin ? 'Вхід' : 'Реєстрація'}
        </h1>
        
        {authError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center font-medium animate-fadeIn">
            {authError}
          </div>
        )}
        
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          defaultValue={lastEmail} 
          className="w-full p-4 mb-5 bg-zinc-800 rounded-xl text-white text-base border border-zinc-700 focus:border-green-500 outline-none transition-colors" 
          required 
        />
        
        <div className="relative mb-2">
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Пароль" 
            className="w-full p-4 pr-12 bg-zinc-800 rounded-xl text-white text-base border border-zinc-700 focus:border-green-500 outline-none transition-colors" 
            required 
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-center mb-6 h-5">
          {isLogin && (
            <button 
              type="button" 
              onClick={() => { setIsModalOpen(true); setResetStatus({ type: null, message: '' }); }}
              className="text-sm text-zinc-400 hover:text-white transition-colors focus:outline-none"
            >
              Забули пароль?
            </button>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full font-bold py-4 rounded-xl text-base transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100 ${isLogin ? 'bg-green-500 text-black' : 'bg-blue-500 text-white'}`}
        >
          {isSubmitting 
            ? 'Зачекайте...' 
            : isLogin ? 'Увійти' : 'Створити акаунт'}
        </button>

        <p className="text-zinc-400 text-sm mt-6 text-center">
          {isLogin ? 'Немає акаунту? ' : 'Вже маєте акаунт? '}
          <a href={isLogin ? 'registration' : '/auth/login'} className="text-white font-medium hover:underline">
            {isLogin ? 'Зареєструватися' : 'Увійти'}
          </a>
        </p>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative">

            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-3 text-center">Відновлення пароля</h2>
            <p className="text-zinc-400 text-sm mb-6 text-center">
              Введіть ваш Email, і ми надішлемо вам посилання для зміни пароля.
            </p>

            <form onSubmit={handleResetSubmit} className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-4 bg-zinc-800 rounded-xl text-white text-base border border-zinc-700 focus:border-green-500 outline-none transition-colors" 
                required 
                disabled={isSending}
              />

              {resetStatus.type && (
                <div className={`p-3 rounded-lg text-sm text-center ${resetStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {resetStatus.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full font-bold py-4 rounded-xl text-base bg-green-500 text-black transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100"
              >
                {isSending ? 'Надсилання...' : 'Надіслати'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}