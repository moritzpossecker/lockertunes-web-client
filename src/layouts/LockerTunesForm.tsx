import GetLeagueTeamsForm from '@/layouts/football-forms/GetLeagueTeamsForm.tsx'
import { ReactElement, useState } from 'react'
import GetTeamForm from '@/layouts/football-forms/GetTeamForm.tsx'
import GetGameSpan from '@/layouts/football-forms/GetGameSpan.tsx'
import { IMatch } from '@/models/IMatch.ts'
import TeamsCarousel from '@/layouts/football-forms/TeamsCarousel.tsx'
import GetPlaylistDuration from '@/layouts/playlist-forms/GetPlaylistDuration.tsx'
import GetPlaylistMetadata from '@/layouts/playlist-forms/GetPlaylistMetadata.tsx'
import GetRequiredTracks from '@/layouts/playlist-forms/GetRequiredTracks.tsx'
import { ITrack } from '@/models/ITrack.ts'

const LockerTunesForm = (): ReactElement => {
  const [progress, setProgress] = useState<number>(0)
  const [teams, setTeams] = useState<string[]>([])
  const [leagueUrl, setLeagueUrl] = useState<string>('')
  const [team, setTeam] = useState<string>('')
  const [matches, setMatches] = useState<IMatch[]>([])
  const [playlistDuration, setPlaylistDuration] = useState<number>(30)
  const [playlistName, setPlaylistName] = useState<string>('')
  const [playlistDescription, setPlaylistDescription] = useState<string>('')
  const [homeGameString, setHomeGameString] = useState<string>('Home')
  const [awayGameString, setAwayGameString] = useState<string>('Away')
  const [requiredTracks, setRequiredTracks] = useState<ITrack[]>([])

  const changeProgress = (increase: boolean): void => {
    if (increase) {
      setProgress(progress + 1)
      return
    }

    setProgress(progress - 1)
  }

  return (
    <>
      {progress == 0 && (
        <GetLeagueTeamsForm
          teams={teams}
          setTeams={setTeams}
          changeProgress={changeProgress}
          leagueUrl={leagueUrl}
          setLeagueUrl={setLeagueUrl}
        />
      )}
      {progress == 1 && (
        <GetTeamForm
          changeProgress={changeProgress}
          team={team}
          teams={teams}
          setTeam={setTeam}
        />
      )}
      {progress == 2 && (
        <GetGameSpan
          setMatches={setMatches}
          changeProgress={changeProgress}
          leagueUrl={leagueUrl}
          team={team}
        />
      )}
      {progress == 3 && (
        <TeamsCarousel
          changeProgress={changeProgress}
          matches={matches}
          setMatches={setMatches}
        />
      )}
      {progress == 4 && (
        <GetPlaylistDuration
          changeProgress={changeProgress}
          playlistDuration={playlistDuration}
          setPlaylistDuration={setPlaylistDuration}
        />
      )}
      {progress == 5 && (
        <GetPlaylistMetadata
          changeProgress={changeProgress}
          match={matches[0]}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          playlistDescription={playlistDescription}
          setPlaylistDescription={setPlaylistDescription}
          homeGameString={homeGameString}
          setHomeGameString={setHomeGameString}
          awayGameString={awayGameString}
          setAwayGameString={setAwayGameString}
        />
      )}
      {progress == 6 && (
        <GetRequiredTracks
          changeProgress={changeProgress}
          tracks={requiredTracks}
          setTracks={setRequiredTracks}/>
      )}
    </>
  )
}

export default LockerTunesForm
