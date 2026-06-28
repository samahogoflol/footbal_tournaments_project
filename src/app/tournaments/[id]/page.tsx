"use client"

import {use} from "react"
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Trophy, Table, ChevronRight, Lock } from 'lucide-react';

export default function TournamentHubPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tournamentId = resolvedParams.id; 

  const hubSections = [
    {
      title: "Розклад та матчі",
      items: [
        {
          title: "Групова стадія",
          description: "Усі матчі 1, 2 та 3 раундів",
          href: `/tournaments/${tournamentId}/group-stage`,
          icon: CalendarDays,
          color: "text-green-400",
          bgColor: "bg-green-500/10 border-green-500/20",
          status: "active"
        },
        {
          title: "Плей-оф",
          description: "Матчі на виліт (починаючи з 1/16 фіналу)",
          href: `/tournaments/${tournamentId}/play-off`,
          icon: Trophy,
          color: "text-green-400",
          bgColor: "bg-green-500/10 border-green-500/20",
          status: "active"
        }
      ]
    },
    {
      title: "Статистика турніру",
      items: [
        {
          title: "Реальна турнірна таблиця",
          description: "Офіційне становище команд у групах",
          href: `/tournaments/${tournamentId}/real-table`,
          icon: Table,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          status: "active"
        },
        {
          title: "Турнірна таблиця прогнозистів",
          description: "Позиція в таблиці учасників турніру",
          href: `/leaderboards`,
          icon: Table,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          status: "active"
        }
      ]
    },

  ];

  return (
    <div className="flex flex-col h-full animate-fade-in bg-zinc-950 px-3 pt-4 pb-4">
      
      <Link 
        href="/tournaments" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors w-fit mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm tracking-wide">До списку турнірів</span>
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-zinc-100 tracking-tight mb-2">
          Чемпіонат Світу 2026
        </h2>
      </div>
      <div className="flex flex-col gap-8">
        {hubSections.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">
              {section.title}
            </h3>
            
            <div className="flex flex-col gap-3">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = item.status === "active";

                const Card = (
                  <div className={`flex items-center p-4 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 shadow-lg shadow-black/20 group" 
                      : "bg-zinc-900/50 border-zinc-800/50 opacity-70"
                  }`}>
                    
                    <div className={`p-3 rounded-xl border shrink-0 ${item.bgColor} ${isActive ? 'group-hover:scale-110 transition-transform' : ''}`}>
                      <Icon size={24} className={item.color} />
                    </div>

                    <div className="flex flex-col ml-4 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-base md:text-lg truncate ${isActive ? "text-zinc-100" : "text-zinc-400"}`}>
                          {item.title}
                        </span>
                        {!isActive && (
                          <Lock size={14} className="text-zinc-500" />
                        )}
                      </div>
                      <span className="text-xs md:text-sm text-zinc-500 truncate mt-0.5">
                        {item.description}
                      </span>
                    </div>

                    {isActive && (
                      <div className="shrink-0 ml-2 text-zinc-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all">
                        <ChevronRight size={20} />
                      </div>
                    )}
                  </div>
                );

                if (isActive) {
                  return (
                    <Link key={itemIdx} href={item.href} className="block outline-none focus:ring-2 focus:ring-green-500/50 rounded-2xl">
                      {Card}
                    </Link>
                  );
                }

                return (
                  <div key={itemIdx}>
                    {Card}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}