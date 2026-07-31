import { Suspense } from 'react';
import LeaderboardPage from './LeaderboardPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-zinc-500 text-center py-12">Завантаження...</div>}>
      <LeaderboardPage />
    </Suspense>
  );
}