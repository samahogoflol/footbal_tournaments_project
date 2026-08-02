const LOGO_TOURNAMENTS: Record<string, string> = {
  apl2026: 'apl',
  cl2627: 'cl',
}

const FALLBACK_LOGO = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23333"/></svg>'

export function getTeamLogo(tournamentId: string, code: string): string {
  if (!code) {
    return FALLBACK_LOGO
  }

  const folder = LOGO_TOURNAMENTS[tournamentId]

  if (folder) {
    return `/logos/${folder}/${code}.svg`
  }

  return `https://flagcdn.com/w40/${code}.png`
}