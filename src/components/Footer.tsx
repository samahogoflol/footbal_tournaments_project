import Link from 'next/link';
import { Mail } from 'lucide-react';
import { TelegramIcon } from './UI/TelegramIcon';

export default function Footer() {
  const navLinks = [
    // { href: '/tournaments', label: 'Список турнірів' },
    { href: '/users', label: 'Зареєстровані учасники' },
    { href: '/leaderboards', label: 'Турнірна таблиця' },
    { href: '/rules', label: 'Правила' },
    // { href: '/faq', label: 'FAQ' },
  ];

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
      <div className="px-6 py-8">
        
        <div className="flex flex-col items-center gap-2 mb-8">
          <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-[11px] mb-3">
            Навігація
          </h3>
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-green-400 transition-colors text-sm font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-zinc-800 pt-8">
          <h3 className="font-bold text-zinc-500 uppercase tracking-widest text-[11px] mb-1">
            Зв'язок з нами
          </h3>
          
          <div className="flex items-center gap-8 mt-2">
            <a
              href="https://t.me/santiago_munez_football"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <div className="p-3.5 bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all border border-zinc-700">
                <TelegramIcon/>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Telegram</span>
            </a>
            
            <a
              href="mailto:support@yourproject.com"
              className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <div className="p-3.5 bg-zinc-800 rounded-full group-hover:bg-zinc-700 transition-all border border-zinc-700">
                <Mail size={22} className="text-zinc-300" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Пропозиції</span>
            </a>
          </div>
        </div>

        <div className="text-center mt-10 text-[10px] font-medium text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Футбольний Турнір.
        </div>

      </div>
    </footer>
  );
}