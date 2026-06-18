interface AuthFormProps {
  type: 'login' | 'registration';
  action: (formData: FormData) => Promise<void>;
}

export default function AuthForm({ type, action }: AuthFormProps) {
  const isLogin = type === 'login';

  return (
    // Додаємо h-full та w-full для заповнення простору, max-w-md для комфортної ширини
    <form action={action} className="w-full max-w-md bg-zinc-900 p-10 rounded-2xl  border-zinc-800 ">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        {isLogin ? 'Вхід' : 'Реєстрація'}
      </h1>
      
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        className="w-full p-4 mb-5 bg-zinc-800 rounded-xl text-white text-base border border-zinc-700 focus:border-green-500 outline-none transition-colors" 
        required 
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Пароль" 
        className="w-full p-4 mb-8 bg-zinc-800 rounded-xl text-white text-base border border-zinc-700 focus:border-green-500 outline-none transition-colors" 
        required 
      />
      
      <button 
        type="submit" 
        className={`w-full font-bold py-4 rounded-xl text-base transition-transform active:scale-95 ${isLogin ? 'bg-green-500 text-black' : 'bg-blue-500 text-white'}`}
      >
        {isLogin ? 'Увійти' : 'Створити акаунт'}
      </button>

      <p className="text-zinc-400 text-sm mt-6 text-center">
        {isLogin ? 'Немає акаунту? ' : 'Вже маєте акаунт? '}
        <a href={isLogin ? '/registration' : '/login'} className="text-white font-medium hover:underline">
          {isLogin ? 'Зареєструватися' : 'Увійти'}
        </a>
      </p>
    </form>
  );
}