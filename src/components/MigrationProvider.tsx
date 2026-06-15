
'use client';

import { useEffect } from 'react';
import { migrateMatches } from '../lib/migrate';

export default function MigrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    migrateMatches();
  }, []);

  return <>{children}</>;
}