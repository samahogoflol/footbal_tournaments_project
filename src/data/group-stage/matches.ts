export interface Team {
  name: string;
  code: string; 
}

export interface Match {
  id: number;
  round: number;
  home: Team;
  away: Team;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'finished';
  homeScore: number | null;
  awayScore: number | null;
}

export const MATCHES_DATA: Match[] = [
  // ================= РАУНД 1 =================
  { id: 1, round: 1, home: { name: 'Мексика', code: 'mx' }, away: { name: 'Південна Африка', code: 'za' }, date: '11.06', time: '22:00', status: 'finished', homeScore: 2, awayScore: 0 },
  { id: 2, round: 1, home: { name: 'Чехія', code: 'cz' }, away: { name: 'Південна Корея', code: 'kr' }, date: '12.06', time: '05:00', status: 'finished', homeScore: 2, awayScore: 1 },
  { id: 3, round: 1, home: { name: 'Канада', code: 'ca' }, away: { name: 'Боснія', code: 'ba' }, date: '12.06', time: '22:00', status: 'finished', homeScore: 1, awayScore: 1 },
  { id: 4, round: 1, home: { name: 'США', code: 'us' }, away: { name: 'Парагвай', code: 'py' }, date: '13.06', time: '04:00', status: 'finished', homeScore: 4, awayScore: 1 },
  { id: 5, round: 1, home: { name: 'Катар', code: 'qa' }, away: { name: 'Швейцарія', code: 'ch' }, date: '13.06', time: '22:00', status: 'finished', homeScore: 1, awayScore: 1 },
  { id: 6, round: 1, home: { name: 'Бразилія', code: 'br' }, away: { name: 'Марокко', code: 'ma' }, date: '14.06', time: '01:00', status: 'finished', homeScore: 1, awayScore: 1 },
  { id: 7, round: 1, home: { name: 'Гаїті', code: 'ht' }, away: { name: 'Шотландія', code: 'gb-sct' }, date: '14.06', time: '04:00', status: 'finished', homeScore: 0, awayScore: 1 },
  { id: 8, round: 1, home: { name: 'Австралія', code: 'au' }, away: { name: 'Туреччина', code: 'tr' }, date: '14.06', time: '07:00', status: 'finished', homeScore: 2, awayScore: 0 },
  { id: 9, round: 1, home: { name: 'Німеччина', code: 'de' }, away: { name: 'Кюрасао', code: 'cw' }, date: '14.06', time: '20:00', status: 'finished', homeScore: 7, awayScore: 1 },
  { id: 10, round: 1, home: { name: 'Нідерланди', code: 'nl' }, away: { name: 'Японія', code: 'jp' }, date: '14.06', time: '23:00', status: 'finished', homeScore: 2, awayScore: 2 },
  { id: 11, round: 1, home: { name: 'Кот-д\'Івуар', code: 'ci' }, away: { name: 'Еквадор', code: 'ec' }, date: '15.06', time: '02:00', status: 'finished', homeScore: 1, awayScore: 0 },
  { id: 12, round: 1, home: { name: 'Швеція', code: 'se' }, away: { name: 'Туніс', code: 'tn' }, date: '15.06', time: '05:00', status: 'finished', homeScore: 4, awayScore: 1 },
  { id: 13, round: 1, home: { name: 'Іспанія', code: 'es' }, away: { name: 'Кабо Верде', code: 'cv' }, date: '15.06', time: '19:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 14, round: 1, home: { name: 'Бельгія', code: 'be' }, away: { name: 'Єгипет', code: 'eg' }, date: '15.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 15, round: 1, home: { name: 'Саудівська Аравія', code: 'sa' }, away: { name: 'Уругвай', code: 'uy' }, date: '16.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 16, round: 1, home: { name: 'Іран', code: 'ir' }, away: { name: 'Нова Зеландія', code: 'nz' }, date: '16.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 17, round: 1, home: { name: 'Франція', code: 'fr' }, away: { name: 'Сенегал', code: 'sn' }, date: '16.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 18, round: 1, home: { name: 'Ірак', code: 'iq' }, away: { name: 'Норвегія', code: 'no' }, date: '17.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 19, round: 1, home: { name: 'Аргентина', code: 'ar' }, away: { name: 'Алжир', code: 'dz' }, date: '17.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 20, round: 1, home: { name: 'Австрія', code: 'at' }, away: { name: 'Йорданія', code: 'jo' }, date: '17.06', time: '07:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 21, round: 1, home: { name: 'Португалія', code: 'pt' }, away: { name: 'Конго', code: 'cd' }, date: '17.06', time: '20:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 22, round: 1, home: { name: 'Англія', code: 'gb-eng' }, away: { name: 'Хорватія', code: 'hr' }, date: '17.06', time: '23:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 23, round: 1, home: { name: 'Гана', code: 'gh' }, away: { name: 'Панама', code: 'pa' }, date: '18.06', time: '02:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 24, round: 1, home: { name: 'Узбекистан', code: 'uz' }, away: { name: 'Колумбія', code: 'co' }, date: '18.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },

  // ================= РАУНД 2 =================
  { id: 25, round: 2, home: { name: 'Чехія', code: 'cz' }, away: { name: 'Південна Африка', code: 'za' }, date: '18.06', time: '19:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 26, round: 2, home: { name: 'Швейцарія', code: 'ch' }, away: { name: 'Боснія', code: 'ba' }, date: '18.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 27, round: 2, home: { name: 'Канада', code: 'ca' }, away: { name: 'Катар', code: 'qa' }, date: '19.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 28, round: 2, home: { name: 'Мексика', code: 'mx' }, away: { name: 'Південна Корея', code: 'kr' }, date: '19.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 29, round: 2, home: { name: 'США', code: 'us' }, away: { name: 'Австралія', code: 'au' }, date: '19.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 30, round: 2, home: { name: 'Шотландія', code: 'gb-sct' }, away: { name: 'Марокко', code: 'ma' }, date: '20.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 31, round: 2, home: { name: 'Бразилія', code: 'br' }, away: { name: 'Гаїті', code: 'ht' }, date: '20.06', time: '03:30', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 32, round: 2, home: { name: 'Туреччина', code: 'tr' }, away: { name: 'Парагвай', code: 'py' }, date: '20.06', time: '06:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 33, round: 2, home: { name: 'Нідерланди', code: 'nl' }, away: { name: 'Швеція', code: 'se' }, date: '20.06', time: '20:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 34, round: 2, home: { name: 'Німеччина', code: 'de' }, away: { name: 'Кот-д\'Івуар', code: 'ci' }, date: '20.06', time: '23:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 35, round: 2, home: { name: 'Еквадор', code: 'ec' }, away: { name: 'Кюрасао', code: 'cw' }, date: '21.06', time: '06:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 36, round: 2, home: { name: 'Туніс', code: 'tn' }, away: { name: 'Японія', code: 'jp' }, date: '21.06', time: '07:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 37, round: 2, home: { name: 'Іспанія', code: 'es' }, away: { name: 'Саудівська Аравія', code: 'sa' }, date: '21.06', time: '19:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 38, round: 2, home: { name: 'Бельгія', code: 'be' }, away: { name: 'Іран', code: 'ir' }, date: '21.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 39, round: 2, home: { name: 'Уругвай', code: 'uy' }, away: { name: 'Кабо Верде', code: 'cv' }, date: '22.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 40, round: 2, home: { name: 'Нова Зеландія', code: 'nz' }, away: { name: 'Єгипет', code: 'eg' }, date: '22.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 41, round: 2, home: { name: 'Аргентина', code: 'ar' }, away: { name: 'Австрія', code: 'at' }, date: '22.06', time: '20:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 42, round: 2, home: { name: 'Франція', code: 'fr' }, away: { name: 'Ірак', code: 'iq' }, date: '23.06', time: '00:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 43, round: 2, home: { name: 'Норвегія', code: 'no' }, away: { name: 'Сенегал', code: 'sn' }, date: '23.06', time: '03:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 44, round: 2, home: { name: 'Йорданія', code: 'jo' }, away: { name: 'Алжир', code: 'dz' }, date: '23.06', time: '06:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 45, round: 2, home: { name: 'Португалія', code: 'pt' }, away: { name: 'Узбекистан', code: 'uz' }, date: '23.06', time: '20:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 46, round: 2, home: { name: 'Англія', code: 'gb-eng' }, away: { name: 'Гана', code: 'gh' }, date: '23.06', time: '23:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 47, round: 2, home: { name: 'Панама', code: 'pa' }, away: { name: 'Хорватія', code: 'hr' }, date: '24.06', time: '02:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 48, round: 2, home: { name: 'Колумбія', code: 'co' }, away: { name: 'Конго', code: 'cd' }, date: '24.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },

  // ================= РАУНД 3 =================
  { id: 49, round: 3, home: { name: 'Боснія', code: 'ba' }, away: { name: 'Катар', code: 'qa' }, date: '24.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 50, round: 3, home: { name: 'Швейцарія', code: 'ch' }, away: { name: 'Канада', code: 'ca' }, date: '24.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 51, round: 3, home: { name: 'Марокко', code: 'ma' }, away: { name: 'Гаїті', code: 'ht' }, date: '25.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 52, round: 3, home: { name: 'Шотландія', code: 'gb-sct' }, away: { name: 'Бразилія', code: 'br' }, date: '25.06', time: '01:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 53, round: 3, home: { name: 'Південна Африка', code: 'za' }, away: { name: 'Південна Корея', code: 'kr' }, date: '25.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 54, round: 3, home: { name: 'Чехія', code: 'cz' }, away: { name: 'Мексика', code: 'mx' }, date: '25.06', time: '04:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 55, round: 3, home: { name: 'Еквадор', code: 'ec' }, away: { name: 'Німеччина', code: 'de' }, date: '25.06', time: '23:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 56, round: 3, home: { name: 'Кюрасао', code: 'cw' }, away: { name: 'Кот-д\'Івуар', code: 'ci' }, date: '25.06', time: '23:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 57, round: 3, home: { name: 'Туніс', code: 'tn' }, away: { name: 'Нідерланди', code: 'nl' }, date: '26.06', time: '02:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 58, round: 3, home: { name: 'Японія', code: 'jp' }, away: { name: 'Швеція', code: 'se' }, date: '26.06', time: '02:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 59, round: 3, home: { name: 'Парагвай', code: 'py' }, away: { name: 'Австралія', code: 'au' }, date: '26.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 60, round: 3, home: { name: 'Туреччина', code: 'tr' }, away: { name: 'США', code: 'us' }, date: '26.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 61, round: 3, home: { name: 'Норвегія', code: 'no' }, away: { name: 'Франція', code: 'fr' }, date: '26.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 62, round: 3, home: { name: 'Сенегал', code: 'sn' }, away: { name: 'Ірак', code: 'iq' }, date: '26.06', time: '22:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 63, round: 3, home: { name: 'Кабо Верде', code: 'cv' }, away: { name: 'Саудівська Аравія', code: 'sa' }, date: '27.06', time: '03:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 64, round: 3, home: { name: 'Уругвай', code: 'uy' }, away: { name: 'Іспанія', code: 'es' }, date: '27.06', time: '03:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 65, round: 3, home: { name: 'Єгипет', code: 'eg' }, away: { name: 'Іран', code: 'ir' }, date: '27.06', time: '06:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 66, round: 3, home: { name: 'Нова Зеландія', code: 'nz' }, away: { name: 'Бельгія', code: 'be' }, date: '27.06', time: '06:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 67, round: 3, home: { name: 'Панама', code: 'pa' }, away: { name: 'Англія', code: 'gb-eng' }, date: '28.06', time: '00:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 68, round: 3, home: { name: 'Хорватія', code: 'hr' }, away: { name: 'Гана', code: 'gh' }, date: '28.06', time: '00:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 69, round: 3, home: { name: 'Колумбія', code: 'co' }, away: { name: 'Португалія', code: 'pt' }, date: '28.06', time: '02:30', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 70, round: 3, home: { name: 'Конго', code: 'cd' }, away: { name: 'Узбекистан', code: 'uz' }, date: '28.06', time: '02:30', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 71, round: 3, home: { name: 'Алжир', code: 'dz' }, away: { name: 'Австрія', code: 'at' }, date: '28.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },
  { id: 72, round: 3, home: { name: 'Йорданія', code: 'jo' }, away: { name: 'Аргентина', code: 'ar' }, date: '28.06', time: '05:00', status: 'scheduled', homeScore: null, awayScore: null },
];