'use client';

import { useState } from 'react';
import { UserCircle2, Mail, Trophy } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string | number;
  full_name: string | null;
  username: string | null;
  email: string | null;
  total_points: number | null;
}

interface UsersListClientProps {
  initialUsers: User[];
}


export default function UsersListClient({ initialUsers }: UsersListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = initialUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col h-full bg-gray-900 px-3 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-1 mt-5">Учасники турніру</h2>
        <p className="text-sm text-zinc-400">
          Всього гравців: <span className="text-green-400 font-bold">{initialUsers.length}</span>
        </p>
      </div>

      <input
        type="text"
        placeholder="Пошук по імені, ніку або пошті..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-zinc-800/50 border border-zinc-700 text-zinc-100 rounded-xl py-3 px-4 mb-6 focus:outline-none focus:border-green-500"
      />

      <div className="flex flex-col gap-3">
        {filteredUsers.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <div className="flex items-center justify-between bg-zinc-800/30 border border-zinc-800/50 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <UserCircle2 size={40} className="text-zinc-600" />
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-200">{user.full_name || 'Без імені'}</span>
                  <span className="text-sm text-blue-400">{user.username || '—'}</span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <Mail size={11} /> {user.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 font-bold">
                <Trophy size={18} />
                <span>{user.total_points || 0}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}