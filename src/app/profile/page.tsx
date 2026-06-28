// 'use client';

// import { useEffect, useState } from 'react';
// import { Camera, Save, Lock, Trophy, History, Medal, Star } from 'lucide-react';
// import { createBrowserClient } from '@supabase/ssr';

// export default function ProfilePage() {
//   const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   const [nickname, setNickname] = useState('');
//   const [email, setEmail] = useState("");

//   const mockHistory = [
//     { id: 1, home: 'Німеччина', away: 'Шотландія', homeCode: 'de', awayCode: 'gb-sct', predHome: 2, predAway: 1, realHome: 2, realAway: 1, points: 3, date: '14.06.2024', status: 'finished' },
//     { id: 2, home: 'Угорщина', away: 'Швейцарія', homeCode: 'hu', awayCode: 'ch', predHome: 1, predAway: 1, realHome: 1, realAway: 3, points: 0, date: '15.06.2024', status: 'finished' },
//     { id: 3, home: 'Іспанія', away: 'Хорватія', homeCode: 'es', awayCode: 'hr', predHome: 2, predAway: 0, realHome: null, realAway: null, points: null, date: '15.06.2024', status: 'upcoming' },
//   ];

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if(user) {
//         setEmail(user.email ?? "");
//       }
//     }
//     fetchUser()
//   },[supabase])

//   return (
//     <div className="flex flex-col min-h-screen bg-zinc-950 px-4 pt-6 pb-12">
//       <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-8">Особистий кабінет</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

//         <div className="lg:col-span-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl flex flex-col items-center">
          
//           <div className="relative mb-6 group cursor-pointer">
//             <div className="w-32 h-32 bg-zinc-800 rounded-full border-4 border-zinc-800 shadow-inner flex items-center justify-center overflow-hidden transition-all group-hover:border-green-500/50">
//               <Camera size={40} className="text-zinc-600 group-hover:text-green-400 transition-colors" />
//             </div>
//             <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
//               <span className="text-xs font-bold text-white uppercase tracking-wider">Змінити</span>
//             </div>
//             <div className="absolute -bottom-2 -right-2 bg-zinc-800 border border-zinc-700 text-xs font-bold px-2 py-1 rounded-lg text-zinc-400 shadow-lg">
//               Згодом
//             </div>
//           </div>

//           <div className="w-full space-y-4">

//             <div>
//               <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Ваш Нікнейм</label>
//               <div className="flex gap-2">
//                 <input 
//                   placeholder="Введіть Ваш нікнейм/Ім'я"
//                   type="text" 
//                   value={nickname}
//                   onChange={(e) => setNickname(e.target.value)}
//                   className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-green-500 outline-none transition-colors"
//                 />
//                 <button className="bg-green-500/10 text-green-500 p-3 rounded-xl hover:bg-green-500 hover:text-zinc-950 transition-colors border border-green-500/20">
//                   <Save size={20} />
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Ваша Пошта</label>
//               <div className="flex gap-2">
//                 <input 
//                   type="email" 
//                   value={email}
//                   disabled
//                   className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-green-500 outline-none transition-colors"
//                 />
//               </div>
//             </div>

//             <div className="pt-4 border-t border-zinc-800/50">
//               <button className="w-full flex items-center justify-center gap-2 p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors font-medium text-sm">
//                 <Lock size={16} className="text-zinc-400" />
//                 Змінити пароль
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-2 flex flex-col gap-6">
//           <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-3xl border border-zinc-800 p-6 shadow-2xl relative overflow-hidden">
//             <div className="absolute -right-10 -top-10 text-green-500/5">
//               <Trophy size={200} />
//             </div>
            
//             <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
//               <Star size={16} className="text-green-500" /> 
//               Переглянути статистику по турнірам
//             </h2>
            
//             <div className="grid grid-cols-2 gap-4 relative z-10">
//               <div className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl">
//                 <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">ЧС - 2026</span>
//                 <div className="flex items-end gap-2">
//                   <span className="text-4xl font-black text-white">45</span>
//                   <span className="text-sm font-medium text-zinc-400 mb-1">балів</span>
//                 </div>
//               </div>
//               <div className="bg-zinc-950/50 border border-zinc-800/50 p-5 rounded-2xl">
//                 <span className="text-xs font-bold text-zinc-500 uppercase block mb-1">ЛЧ 26-27</span>
//                 <div className="flex items-end gap-2">
//                   <span className="text-4xl font-black text-white">0</span>
//                   <span className="text-sm font-medium text-zinc-400 mb-1">балів</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 shadow-2xl flex-1">
//             <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
//               <History size={16} />
//               Історія прогнозів
//             </h2>
            
//             <div className="space-y-3">
//               {mockHistory.map((item) => (
//                 <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-zinc-800 gap-4">
//                   {/* Інфо про матч */}
//                   <div className="flex items-center gap-4 w-full sm:w-1/2">
//                     <div className="text-xs text-zinc-600 font-bold hidden sm:block w-12 text-center">{item.date}</div>
//                     <div className="flex items-center gap-2 flex-1 justify-end">
//                       <span className="text-sm font-bold text-zinc-300">{item.home}</span>
//                       <img src={`https://flagcdn.com/w40/${item.homeCode}.png`} className="w-6 h-4 rounded-sm object-cover" alt="flag" />
//                     </div>
//                     <div className="text-zinc-600 font-bold text-xs">VS</div>
//                     <div className="flex items-center gap-2 flex-1 justify-start">
//                       <img src={`https://flagcdn.com/w40/${item.awayCode}.png`} className="w-6 h-4 rounded-sm object-cover" alt="flag" />
//                       <span className="text-sm font-bold text-zinc-300">{item.away}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
//                     <div className="flex flex-col items-center">
//                       <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Прогноз</span>
//                       <span className="bg-zinc-800 text-white font-bold px-3 py-1 rounded-lg text-sm border border-zinc-700">
//                         {item.predHome} : {item.predAway}
//                       </span>
//                     </div>
                    
//                     {item.status === 'finished' ? (
//                       <>
//                         <div className="flex flex-col items-center">
//                           <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Рахунок</span>
//                           <span className="text-white font-bold px-2 py-1 text-sm">
//                             {item.realHome} : {item.realAway}
//                           </span>
//                         </div>
//                         <div className="flex flex-col items-center w-12">
//                           <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Бали</span>
//                           <span className={`font-black text-sm px-2 py-1 rounded-md w-full text-center ${
//                             item.points === 3 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
//                             item.points === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
//                             'bg-zinc-800 text-zinc-500 border border-zinc-700'
//                           }`}>
//                             +{item.points}
//                           </span>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-xs font-bold text-zinc-500 uppercase px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900">
//                         Очікується
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               ))}
//               <button className=' block m-auto border border-white px-3 rounded text-zinc-400'>Вся історія прогнозів</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ProfilePage() {
  return (
    <div className="text-white">
      Сторінка розробляється...
    </div>
  )
}