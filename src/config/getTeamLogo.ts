const LOGO_TOURNAMENTS: Record<string, string> = {
  apl2026: 'apl',
  cl2627: 'cl',
}

export function getTeamLogo(tournamentId: string, code: string): string {
  const folder = LOGO_TOURNAMENTS[tournamentId]

  if (folder) {
    return `/logos/${folder}/${code}.svg`
  }

  return `https://flagcdn.com/w40/${code}.png`
}