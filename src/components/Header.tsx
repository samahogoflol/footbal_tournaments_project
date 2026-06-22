'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { Menu, X, Trophy, Users, ShieldCheck, LogIn, LogOut, User as UserIcon, CalendarDays } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { logout } from '../app/actions/auth';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname(); 

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [pathname, supabase]); 

  const handleLogout = async () => {
    setIsOpen(false); 
    setUser(null); 
    await supabase.auth.signOut(); 
    await logout();   
  };

  const menuItems = [
    { href: '/tournaments', label: 'Турніри', icon: CalendarDays }, 
    { href: '/users', label: 'Зареєстровані учасники', icon: Users },
    { href: '/leaderboards', label: 'Турнірна таблиця', icon: Trophy },
    { href: '/static/rules', label: 'Правила', icon: ShieldCheck },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-zinc-900 border-b border-zinc-800 shadow-sm">
        <button
          onClick={toggleMenu}
          className="p-2 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-white focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>

        <Link href="/" className="flex-1 text-center px-2 truncate group">
          <h1 className="text-base font-bold text-zinc-100 uppercase tracking-wider group-hover:text-green-400 transition-colors">
            Футбольний Турнір
          </h1>
        </Link>

        {user ? (
          <Link href="/profile" className="shrink-0 group cursor-pointer">
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 text-green-400 shadow-inner group-hover:border-green-500 transition-colors">
              <UserIcon size={20} />
            </div>
          </Link>
        ) : (
          <Link href="/auth/login" className="shrink-0 group">
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 text-green-500 shadow-inner group-hover:bg-green-500 group-hover:text-white transition-all">
              <LogIn size={20} className="relative left-0.5" />
            </div>
          </Link>
        )}
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <span className="text-lg font-bold text-zinc-100">Навігація</span>
          <button
            onClick={toggleMenu}
            className="p-2 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="flex items-center gap-4 px-4 py-3 text-zinc-300 rounded-xl hover:bg-zinc-800 hover:text-green-400 transition-colors font-medium group"
              >
                <Icon size={20} className="text-zinc-500 group-hover:text-green-400 transition-colors" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="mt-auto p-4 border-t border-zinc-800">
            <div className="px-4 py-2 mb-2 text-xs text-zinc-500 truncate">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-4 px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors font-medium group"
            >
              <LogOut size={20} className="text-red-500/70 group-hover:text-red-400 transition-colors" />
              Вийти з акаунту
            </button>
          </div>
        )}
      </div>
    </>
  );
}