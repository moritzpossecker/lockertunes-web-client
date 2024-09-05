import { GET_MATCHES_URL } from '@/lib/fussballde-src/constants.ts'

import { useState } from 'react'
import { IMatch } from '@/models/IMatch.ts'

export const useFetchMatches = (): {
  loading: boolean,
  error: string,
  fetchMatches: (leagueUrl: string, teamName: string, gameSpan: number) => Promise<IMatch[]>
} => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMatches = async (
    leagueUrl: string,
    teamName: string,
    gameSpan: number,
  ): Promise<IMatch[]> => {
    setLoading(true)
    setError('')
    let response
    try {
      response = await getMatches(leagueUrl, teamName, gameSpan)
      if (response.length == 0) {
        setError(
          'Couldn\'t find matches. Please check the URL and selected team and try again.',
        )
      }
    } catch (error) {
      console.error(error)
      setError(
        'Failed to fetch matches. Please check the URL and selected team and try again.',
      )
    } finally {
      setLoading(false)
    }
    if(response == undefined){
      return []
    }
    return response
  }

  return { loading, error, fetchMatches }
}

const formatUrl = (leagueUrl: string): string => {
  let url = leagueUrl.replace('https://www.fussball.de/', '')
  url = url.slice(0, url.length - 3)
  return url.replace(/\//g, 'SLASH')
}

const formatTeamName = (teamName: string): string => {
  return teamName.replace(' ', 'SPACE')
}

const getMatches = async (
  leagueUrl: string,
  teamName: string,
  gameSpan: number,
) : Promise<IMatch[]> => {
  const formattedLeagueUrl = formatUrl(leagueUrl)
  const formattedTeamName = formatTeamName(teamName)

  const response = await fetch(
    GET_MATCHES_URL +
    formattedTeamName +
    '/' +
    formattedLeagueUrl +
    '/' +
    gameSpan.toString(),
  )
  if (!response.ok) {
    throw new Error(`Failed to get teams: ${response.statusText}`)
  }

  return await response.json()
}
