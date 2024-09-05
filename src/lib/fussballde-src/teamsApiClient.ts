import { GET_TEAMS_URL } from '@/lib/fussballde-src/constants.ts'

import { useState } from 'react'

export const useFetchTeams = (): {
  loading: boolean,
  error: string,
  fetchTeams: (leagueUrl: string) => Promise<string[]>
} => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTeams = async (leagueUrl: string): Promise<string[]> => {
    setLoading(true)
    setError('')
    let response
    try {
      response = await getTeams(leagueUrl)
      if (response.length == 0) {
        setError('Couldn\'t find teams. Please check the URL and try again.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch teams. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
    if(response == undefined){
      return []
    }

    return response
  }

  return { loading, error, fetchTeams }
}

const formatUrl = (leagueUrl: string): string => {
  const url = leagueUrl.replace('https://www.fussball.de/', '')
  return url.replace(/\//g, 'SLASH')
}

const getTeams = async (leagueUrl: string)  : Promise<string[]> => {
  const formattedLeagueUrl = formatUrl(leagueUrl)
  const response = await fetch(GET_TEAMS_URL + formattedLeagueUrl)
  if (!response.ok) {
    throw new Error(`Failed to get teams: ${response.statusText}`)
  }
  return await response.json()
}
