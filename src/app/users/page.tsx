'use client';

import { useState } from 'react';
import { Search, UserCircle2 } from 'lucide-react';

const MOCK_USERS = [
  { id: 2, name: 'Денис', username: '@denistz300' },
  { id: 3, name: 'Олесь', username: '@ztrxss' }, 
  { id: 4, name: 'Антон', username: '@dadadbada' },
  { id: 5, name: 'Віталій', username: '@redutsxg' },
  { id: 6, name: 'Без імені', username: '@nazaru4o' },
  { id: 7, name: 'Никита', username: '@sorevain8' },
  { id: 8, name: 'vovachka ...', username: '@Vovachikkk' },
  { id: 9, name: 'Макс Гапон', username: '' },
  { id: 10, name: 'Сергій', username: '@T_E_S_S_T_E_A' },
  { id: 11, name: 'Tima', username: '@Kumalwl21' },
  { id: 12, name: 'Микита Філіпʼєв', username: '@krikzz' },
  { id: 13, name: 'Anatoliy', username: '@Fatych_fatych' },
  { id: 14, name: '_ssanechikk_', username: '@sayndre17' },
  { id: 15, name: 'Без імені', username: '@kost1akkk' },
  { id: 16, name: 'Тарас', username: '@Turkishfly' },
  { id: 17, name: 'Славен', username: '@SlavenPoltava' },
  { id: 18, name: 'Ivan Dbv', username: '' },
  { id: 19, name: 'Serdiuk Sergiy', username: '' },
  { id: 20, name: 'Олександр', username: '' },
  { id: 21, name: 'Andri', username: '' },
  { id: 22, name: 'Тарас Глівінский', username: '@tar_qwerty12345678' },
  { id: 24, name: 'VLAD_5', username: '@vladislav_58' },
  { id: 25, name: 'Anatolij', username: '@TolTop4i' },
  { id: 26, name: 'Tarasevich 15', username: '@Tarasevich1' },
  { id: 27, name: 'Aewyxz', username: '@awaeks' },
  { id: 28, name: 'Volodymyr', username: '@v1554' },
  { id: 29, name: 'Олег', username: '@oleeeg0' },
  { id: 30, name: 'Макс FM База', username: '' },
  { id: 31, name: 'Kirill', username: '@someonekrc' },
  { id: 32, name: 'Сергій', username: '' },
  { id: 33, name: 'Kalinin SERGant', username: '@SERGant_ZSU' },
  { id: 34, name: 'Тарас Глівінський', username: '@tar_qwerty123456789' }, 
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = MOCK_USERS.filter((user) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(query);
    const usernameMatch = user.username.toLowerCase().includes(query);
    return nameMatch || usernameMatch;
  });

  return (
    <div className="flex flex-col h-full animate-fade-in bg-gray-900 px-3">
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-100 mb-1 mt-5">Учасники турніру</h2>
        <p className="text-sm text-zinc-400">
          Зареєстровано: <span className="text-green-400 font-bold">{MOCK_USERS.length}</span>
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-zinc-500" />
        </div>
        <input
          type="text"
          placeholder="Пошук за іменем або тегом..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-800/50 border border-zinc-700 text-zinc-100 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="flex items-center gap-4 bg-zinc-800/30 border border-zinc-800/50 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <UserCircle2 size={40} className="text-zinc-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-zinc-200 text-base">
                  {user.name}
                </span>
                {user.username && (
                  <span className="text-sm text-blue-400">
                    {user.username}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-zinc-500">За запитом "{searchQuery}" нікого не знайдено 🕵️‍♂️</p>
          </div>
        )}
      </div>

    </div>
  );
}