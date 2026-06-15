import { supabase } from './supabase';
import { MATCHES_DATA } from '../data/group-stage/matches';

export async function migrateMatches() {
  for (const match of MATCHES_DATA) {
    const { error } = await supabase.from('matches').insert({
      home_team: match.home.name,
      away_team: match.away.name,
      home_code: match.home.code,
      away_code: match.away.code,
      match_date: match.date,
      match_time: match.time,
      round: match.round,
      status: match.status
    });
    
    if (error) console.error("Помилка при завантаженні матчу:", error);
  }
  console.log("Всі матчі успішно завантажені!");
}