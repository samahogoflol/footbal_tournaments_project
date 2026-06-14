// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Trophy, Users, FileText, HelpCircle, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    // { href: '/tournaments', label: 'Список турнірів', icon: Trophy },
    { href: '/users', label: 'Зареєстровані учасники', icon: Users },
    { href: '/leaderboards', label: 'Турнірна таблиця', icon: Trophy },
    { href: 'static/rules', label: 'Правила', icon: ShieldCheck },
    // { href: '/faq', label: 'FAQ', icon: HelpCircle },
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

        <Link href="/" className="shrink-0 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-full flex items-center justify-center shadow-inner text-white font-black text-sm group-hover:scale-105 transition-transform">
            FT
          </div>
        </Link>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Темна бокова панель */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <span className="text-lg font-bold text-zinc-100">Навігація</span>
          <button
            onClick={toggleMenu}
            className="p-2 text-zinc-400 rounded-md hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2">
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
      </div>
    </>
  );
}