import { generateCodeChallenge, generateCodeVerifier } from './pkce.ts'
import {
  AUTHENTICATOR_API_CLIENT_ID_ENDPOINT,
  CALLBACK_URL,
} from './constants.ts'

export async function redirectToSpotifyAuth(): Promise<void> {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  localStorage.setItem('code_verifier', codeVerifier)

  try {
    const response = await fetch(AUTHENTICATOR_API_CLIENT_ID_ENDPOINT)

    if (!response.ok) {
      throw new Error(`Failed to fetch client ID: ${response.statusText}`)
    }

    const data = await response.json()

    const clientId = data.clientId

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: CALLBACK_URL,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope:
        'user-read-private playlist-modify-public playlist-modify-private playlist-read-private',
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
  } catch (error) {
    console.error('Error during Spotify authentication redirect:', error)
  }
}

export function removeAccessToken(): void {
  localStorage.removeItem('spotify_access_token')
}
