import { GET_TEAMS_URL } from '@/layouts/Forms/fussballde_src/constants.ts'

import { useState } from 'react'

export const useFetchTeams = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTeams = async (leagueUrl: string) => {
    setLoading(true)
    setError('')
    let response
    try {
      response = await get_teams(leagueUrl)
      if (response.length == 0) {
        setError("Couldn't find teams. Please check the URL and try again.")
      }
    } catch (err) {
      console.log(err)
      setError('Failed to fetch teams. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }

    return response
  }

  return { loading, error, fetchTeams }
}

const format_url = (league_url: string): string => {
  const url = league_url.replace('https://www.fussball.de/', '')
  return url.replace(/\//g, 'SLASH')
}

const get_teams = async (league_url: string) => {
  const formatted_league_url = format_url(league_url)
  const response = await fetch(GET_TEAMS_URL + formatted_league_url)
  if (!response.ok) {
    throw new Error(`Failed to get teams: ${response.statusText}`)
  }
  return await response.json()
}
