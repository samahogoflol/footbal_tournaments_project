// цей запит в проді на sql запустити, коли додам матчі на 27 рік.

// select id, tournament_id, match_date, match_time, status,
//   (to_date(match_date || '.2026', 'DD.MM.YYYY') + match_time::time) as parsed_kickoff,
//   now() as db_now
// from matches
// where status = 'scheduled'
//   and (to_date(match_date || '.2026', 'DD.MM.YYYY') + match_time::time) <= now();

