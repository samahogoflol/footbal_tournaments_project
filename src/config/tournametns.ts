export type Round = { value: number; label: string }

export type TournamentConfig = {
  id: string
  name: string
  hasGroupStage: boolean
  hasPlayOff: boolean
  playOffRounds?: Round[]
  groupStageRounds?: Round[]
  leagueRounds?: Round[]
  hasBonus?: boolean
  scheduleReady?: boolean
}

export const TOURNAMENTS_CONFIG: Record<string, TournamentConfig> = {
  wc2026: {
    id: 'wc2026',
    name: 'Чемпіонат Світу 2026',
    hasGroupStage: true,
    hasPlayOff: true,
    groupStageRounds: [
    { value: 1, label: '1 Тур' },
    { value: 2, label: '2 Тур' },
    { value: 3, label: '3 Тур' },
  ],
    playOffRounds: [
      { value: 4, label: '1/16' },
      { value: 5, label: '1/8' },
      { value: 6, label: '1/4' },
      { value: 7, label: '1/2' },
      { value: 9, label: '3-тє місце' },
      { value: 8, label: 'Фінал' },
    ],
  },
  apl2026: {
  id: 'apl2026',
  name: 'АПЛ 2026-2027',
  hasGroupStage: false,
  hasPlayOff: false,
  hasBonus: true,
  leagueRounds: Array.from({ length: 38 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  })),
},
  cl2627: {
    id: 'cl2627',
    name: 'Ліга Чемпіонів 26/27',
    hasGroupStage: true,
    hasPlayOff: true,
    hasBonus: true,
    scheduleReady: false,
    groupStageRounds: [
    { value: 1, label: '1 Тур' },
    { value: 2, label: '2 Тур' },
    { value: 3, label: '3 Тур' },
    { value: 4, label: '4 Тур' },
    { value: 5, label: '5 Тур' },
    { value: 6, label: '6 Тур' },
    { value: 7, label: '7 Тур' },
    { value: 8, label: '8 Тур' },
  ],
    playOffRounds: [
      { value: 9, label: '1/16' },
      { value: 10, label: '1/8' },
      { value: 11, label: '1/4' },
      { value: 12, label: '1/2' },
      { value: 13, label: 'Фінал' },
    ],
  },
}