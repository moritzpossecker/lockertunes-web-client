import { useState } from 'react'
import { ITrack } from '@/models/ITrack.ts'
import { GET_TRACKS_URL } from '@/lib/spotify-src/constants.ts'

export const useFetchTracks = (): {
  loading: boolean,
  error: string,
  fetchTracks: (trackName: string) => Promise<ITrack[]>
} => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTracks = async (trackName: string): Promise<ITrack[]> => {
    setLoading(true)
    setError('')
    let response
    try {
      response = await getTracks(trackName)
      if (response.length == 0) {
        setError(
          'Couldn\'t find tracks. Please check your spotify connection and track name and try again.',
        )
      }
    } catch (error) {
      console.error(error)
      setError(
        'Failed to fetch tracks. Please check your spotify connection and track name and try again.',
      )
    } finally {
      setLoading(false)
    }
    if (response == undefined) {
      return []
    }
    return response
  }

  return { loading, error, fetchTracks }
}

const formatTrackName = (trackName: string): string => {
  let newTrackName = trackName.replace(' ', 'SPACE')
  return newTrackName.replace('/', 'SLASH')
}

const getTracks = async (trackName: string): Promise<ITrack[]> => {
  const formattedTrackName = formatTrackName(trackName)

  const response = await fetch(
    GET_TRACKS_URL + localStorage.getItem('spotify_access_token')
    + '/' + formattedTrackName
    + '/' + localStorage.getItem('user_country')
  )
  if (!response.ok) {
    throw new Error(`Failed to get tracks: ${response.statusText}`)
  }

  return await response.json()
}