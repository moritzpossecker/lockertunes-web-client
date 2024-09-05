import GetLeagueTeamsForm from '@/layouts/forms/GetLeagueTeamsForm.tsx'
import { ReactElement, useState } from 'react'
import GetTeamForm from '@/layouts/forms/GetTeamForm.tsx'
import GetGameSpan from '@/layouts/forms/GetGameSpan.tsx'
import { IMatch } from '@/models/IMatch.ts'
import TeamsCarousel from '@/layouts/forms/TeamsCarousel.tsx'

const LockerTunesForm = () : ReactElement => {
  const [progress, setProgress] = useState<number>(0)
  const [teams, setTeams] = useState<string[]>([])
  const [leagueUrl, setLeagueUrl] = useState<string>('')
  const [team, setTeam] = useState<string>('')
  const [matches, setMatches] = useState<IMatch[]>([])

  const changeProgress = (increase: boolean) : void => {
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
    </>
  )
}

export default LockerTunesForm
