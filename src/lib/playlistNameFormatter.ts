import { IMatch } from '@/models/IMatch.ts'

export const formatPlaylistString = (playlistName: string, homeGameString: string, awayGameString: string, match: IMatch): string => {
  return playlistName
      .replace(/OPPONENT/g, match.opponent)
      .replace(/TEAM/g, match.team)
      .replace(/MATCH_DAY/g, match.match_day.toString())
      .replace(/HOME_GAME/g, match.home_game ? homeGameString : awayGameString)
}