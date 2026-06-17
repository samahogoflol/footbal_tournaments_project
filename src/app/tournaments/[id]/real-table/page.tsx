import { createClient } from "@/src/utils/utils/supabase";

export const dynamic = 'force-dynamic';

interface Team {
  id: number;
  name: string;
  group_letter: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  points: number;
}

export default async function TablePage() {
  const supabase = await createClient();

  const { data: teamsData, error } = await supabase
    .from('teams')
    .select('*');

  if (error) {
    console.error('Помилка завантаження команд:', error);
  }

  const teams: Team[] = teamsData || [];

  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const groups: Record<string, Team[]> = {};
  
  groupLetters.forEach(letter => {
    groups[letter] = [];
  });

  teams.forEach(team => {
    const letter = team.group_letter.toUpperCase();
    if (groups[letter]) {
      groups[letter].push(team);
    }
  });

  groupLetters.forEach(letter => {
    groups[letter].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      
      const diffA = a.goals_for - a.goals_against;
      const diffB = b.goals_for - b.goals_against;
      if (diffB !== diffA) return diffB - diffA;
      
      return b.goals_for - a.goals_for;
    });
  });

  const thirdPlacedTeams: (Team & { originalGroup: string })[] = [];
  
  groupLetters.forEach(letter => {
    if (groups[letter].length >= 3) {
      thirdPlacedTeams.push({
        ...groups[letter][2],
        originalGroup: letter
      });
    }
  });

  thirdPlacedTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goals_for - a.goals_against;
    const diffB = b.goals_for - b.goals_against;
    if (diffB !== diffA) return diffB - diffA;
    return b.goals_for - a.goals_for;
  });

  return (
    <div className="flex flex-col h-full bg-gray-900 px-3 pb-10">
      <div className="mb-6 mt-5">
        <h2 className="text-2xl font-bold text-zinc-100 mb-1">Турнірна таблиця</h2>
        <p className="text-sm text-zinc-400">Груповий етап змагання</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {groupLetters.map((letter) => (
          <div key={letter} className="bg-zinc-800/20 border border-zinc-800/80 rounded-xl p-4">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 px-1">Група {letter}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead>
                  <tr className="text-xs uppercase text-zinc-500 border-b border-zinc-800/60 pb-2">
                    <th className="py-2 w-8 text-center"></th>
                    <th className="py-2">Команда</th>
                    <th className="py-2 w-8 text-center" title="Ігри">І</th>
                    <th className="py-2 w-12 text-center" title="Різниця голів">РГ</th>
                    <th className="py-2 w-8 text-center text-zinc-200 font-bold" title="Очки">О</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {groups[letter].length > 0 ? (
                    groups[letter].map((team, index) => {
                      const goalDifference = team.goals_for - team.goals_against;
                      const displayDiff = goalDifference > 0 ? `+${goalDifference}` : goalDifference;
                      
                      // Визначаємо зону (1-2 місце, 3 місце)
                      const isPromotionZone = index < 2;
                      const isThirdPlace = index === 2;

                      let positionStyle = 'text-zinc-500';
                      if (isPromotionZone) positionStyle = 'text-emerald-400';
                      else if (isThirdPlace) positionStyle = 'text-amber-400';

                      return (
                        <tr key={team.id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className={`py-2.5 text-center font-bold ${positionStyle}`}>
                            {index + 1}
                          </td>
                          <td className="py-2.5 font-medium text-zinc-200 truncate max-w-[120px]">
                            {team.name}
                          </td>
                          <td className="py-2.5 text-center text-zinc-400">{team.played}</td>
                          <td className={`py-2.5 text-center text-xs ${goalDifference > 0 ? 'text-emerald-500/80' : goalDifference < 0 ? 'text-red-500/80' : 'text-zinc-500'}`}>
                            {displayDiff}
                          </td>
                          <td className="py-2.5 text-center font-bold text-zinc-100">{team.points}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-zinc-600 text-xs">
                        Дані відсутні
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {thirdPlacedTeams.length > 0 && (
        <div className="mt-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-100 mb-1">Рейтинг третіх місць</h2>
            <p className="text-sm text-zinc-400">Найкращі 8 команд проходять до плей-оф</p>
          </div>

          <div className="bg-zinc-800/20 border border-zinc-800/80 rounded-xl p-4 max-w-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead>
                  <tr className="text-xs uppercase text-zinc-500 border-b border-zinc-800/60 pb-2">
                    <th className="py-2 w-8 text-center"></th>
                    <th className="py-2">Команда</th>
                    <th className="py-2 w-12 text-center" title="Група">Гр</th>
                    <th className="py-2 w-8 text-center" title="Ігри">І</th>
                    <th className="py-2 w-12 text-center" title="Різниця голів">РГ</th>
                    <th className="py-2 w-8 text-center text-zinc-200 font-bold" title="Очки">О</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {thirdPlacedTeams.map((team, index) => {
                    const goalDifference = team.goals_for - team.goals_against;
                    const displayDiff = goalDifference > 0 ? `+${goalDifference}` : goalDifference;

                    const isAdvancing = index < 8;

                    return (
                      <tr key={team.id} className={`hover:bg-zinc-800/30 transition-colors ${!isAdvancing ? 'opacity-60' : ''}`}>
                        <td className={`py-2.5 text-center font-bold ${isAdvancing ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {index + 1}
                        </td>
                        <td className="py-2.5 font-medium text-zinc-200">
                          {team.name}
                        </td>
                        <td className="py-2.5 text-center font-bold text-zinc-500">
                          {team.originalGroup}
                        </td>
                        <td className="py-2.5 text-center text-zinc-400">{team.played}</td>
                        <td className={`py-2.5 text-center text-xs ${goalDifference > 0 ? 'text-emerald-500/80' : goalDifference < 0 ? 'text-red-500/80' : 'text-zinc-500'}`}>
                          {displayDiff}
                        </td>
                        <td className="py-2.5 text-center font-bold text-zinc-100">{team.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}