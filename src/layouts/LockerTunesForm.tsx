import GetLeagueTeamsForm from '@/layouts/Forms/GetLeagueTeamsForm.tsx'
import { useState } from 'react'
import GetTeamForm from '@/layouts/Forms/GetTeamForm.tsx'
import GetGameSpan from '@/layouts/Forms/GetGameSpan.tsx'
import { Match } from '@/models/Match.ts'
import TeamsCarousel from '@/layouts/Forms/TeamsCarousel.tsx'

const LockerTunesForm = () => {
  const [progress, setProgress] = useState<number>(0)
  const [teams, setTeams] = useState<string[]>([])
  const [leagueUrl, setLeagueUrl] = useState<string>('')
  const [team, setTeam] = useState<string>('')
  const [matches, setMatches] = useState<Match[]>([])

  const changeProgress = (increase: boolean) => {
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
