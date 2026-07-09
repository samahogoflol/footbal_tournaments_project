'use client';

import { useEffect, useState } from 'react';
import { History, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { PredictionCard } from '@/src/components/PredictionCard';

export default function PredictionsHistoryPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchAllHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if(user) {
        const { data, error } = await supabase
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
            .order('id', { ascending: false });

        if (!error && data) {
            const sorted = [...data].sort((a, b) => {
                const matchA = a.matches as any;
                const matchB = b.matches as any;

                if (!matchA || !matchB) return 0;

                const [dayA, monthA] = matchA.match_date.split('.').map(Number);
                const [dayB, monthB] = matchB.match_date.split('.').map(Number);
                const [hA, mA] = matchA.match_time.split(':').map(Number);
                const [hB, mB] = matchB.match_time.split(':').map(Number);

                const dateA = new Date(2026, monthA - 1, dayA, hA, mA).getTime();
                const dateB = new Date(2026, monthB - 1, dayB, hB, mB).getTime();

                return dateB - dateA; // Від нових до старих
            });

  setHistory(sorted);
}
      }
      setLoadingHistory(false);
    }
    
    fetchAllHistory();
  }, [supabase]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 px-4 pt-6 pb-12">
      
      <div className="flex items-center gap-4 mb-8 max-w-3xl mx-auto w-full">
        <Link href="/profile" className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Вся історія прогнозів</h1>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl max-w-3xl mx-auto w-full">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <History size={16} />
          Ваші прогнози
        </h2>
        
        <div className="space-y-3">
          {loadingHistory ? (
            <div className="text-center text-zinc-500 py-4">Завантаження історії...</div>
          ) : history.length === 0 ? (
            <div className="text-center text-zinc-500 py-4">У вас ще немає прогнозів.</div>
          ) : (
            history.map((item) => (
              <PredictionCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}