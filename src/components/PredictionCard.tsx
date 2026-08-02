import Link from "next/link";
import { getTeamLogo } from "../config/getTeamLogo";
import { formatMatchDateShort } from "../utils/matchTime";

interface PredictionCardProps {
  tournamentId: string;

  item: {
    predicted_home_score: number;
    predicted_away_score: number;
    points_awarded: number | null;

    matches: {
      id: number;
      match_date: string;
      match_time: string;
      home_team: string;
      home_code: string;
      away_team: string;
      away_code: string;
      status: string;
      home_score: number | null;
      away_score: number | null;
    };
  };
}

export const PredictionCard = ({
  item,
  tournamentId,
}: PredictionCardProps) => {
  return (
    <Link
      href={`/tournaments/${tournamentId}/matches/${item.matches.id}`}
      className="flex flex-col sm:flex-row justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-zinc-800 gap-4 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors">
      <div className="flex items-center gap-4 w-full sm:w-1/2">
        <div className="text-xs text-white font-bold w-12 text-center">
          {formatMatchDateShort(item.matches.match_date)} {item.matches.match_time}
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-sm font-bold text-zinc-300">
            {item.matches.home_team}
          </span>

          <img
            src={getTeamLogo(tournamentId, item.matches.home_code)}
            className="w-6 h-4 rounded-sm object-cover"
            alt={item.matches.home_team}
          />
        </div>

        <div className="text-zinc-600 font-bold text-xs">VS</div>

        <div className="flex items-center gap-2 flex-1 justify-start">
          <img
            src={getTeamLogo(tournamentId, item.matches.away_code)}
            className="w-6 h-4 rounded-sm object-cover"
            alt={item.matches.away_team}
          />

          <span className="text-sm font-bold text-zinc-300">
            {item.matches.away_team}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
            Прогноз
          </span>

          <span className="bg-zinc-800 text-white font-bold px-3 py-1 rounded-lg text-sm border border-zinc-700">
            {item.predicted_home_score} : {item.predicted_away_score}
          </span>
        </div>

        {item.matches.status === "finished" ? (
          <>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
                Рахунок
              </span>

              <span className="text-white font-bold px-2 py-1 text-sm">
                {item.matches.home_score} : {item.matches.away_score}
              </span>
            </div>

            <div className="flex flex-col items-center w-12">
              <span className="text-[10px] text-zinc-500 uppercase font-bold mb-1">
                Бали
              </span>

              <span
                className={`font-black text-sm px-2 py-1 rounded-md w-full text-center ${
                  item.points_awarded === 3
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : item.points_awarded === 1
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                }`}
              >
                +{item.points_awarded || 0}
              </span>
            </div>
          </>
        ) : (
          <div className="text-xs font-bold text-zinc-500 uppercase px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900">
            Очікується
          </div>
        )}
      </div>
    </Link>
  );
};