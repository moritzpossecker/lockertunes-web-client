import React, { useEffect, useState } from 'react'
import { callBack } from '@/lib/spotify-authentication-src/callBack.ts'
import { Button } from '@/components/ui/button.tsx'
import {
  redirectToSpotifyAuth,
  removeAccessToken,
} from '@/lib/spotify-authentication-src/spotifyAuthenticator.ts'
import { CIcon } from '@coreui/icons-react'
import { cibSpotify } from '@coreui/icons'
import { card_class } from '@/components/custom-class-names.ts'

interface ISpotifyAuthenticationCardProps {
  isConnected: boolean
  setIsConnected: (value: boolean) => void
}

const SpotifyAuthenticationCard: React.FC<ISpotifyAuthenticationCardProps> = ({
  isConnected,
  setIsConnected,
}) => {
  const [userName, setUserName] = useState<string | null>(null)

  const checkConnection = () : void => {
    const token = localStorage.getItem('spotify_access_token')
    if (token) {
      setIsConnected(true)
      const storedUserName = localStorage.getItem('user_name')
      setUserName(storedUserName || 'User')
    } else {
      setIsConnected(false)
      setUserName(null)
    }
  }

  const disconnectFromSpotify = () : void => {
    removeAccessToken()
    checkConnection()
  }

  useEffect(() => {
    const handleCallback = async () : Promise<void> => {
      await callBack()
      checkConnection()
    }

    handleCallback().catch((error) : void => {
      console.error('Error handling callback:', error)
    })

    checkConnection()
  })

  return (
    <div className={card_class + 'h28 mb-5'}>
      {isConnected ? (
        <div className="flex flex-col justify-between h-full">
          <h1 className="text-3xl text-gray-50 font-bold">
            Hello, {userName}!
          </h1>
          <div className="flex justify-between items-baseline">
            <p className="text-lg text-gray-300">Let's get started.</p>
            <Button
              className="bg-red-600 text-gray-50 py-2 px-4 rounded hover:bg-red-700"
              onClick={disconnectFromSpotify}
            >
              <CIcon icon={cibSpotify} className="mr-2 h-4 w-4 fill-gray-50" />{' '}
              Disconnect from Spotify
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <Button
            onClick={redirectToSpotifyAuth}
            className="bg-green-600 text-gray-50 py-2 px-4 rounded hover:bg-green-700"
          >
            <CIcon icon={cibSpotify} className="mr-2 h-4 w-4 fill-gray-50" />{' '}
            Connect to Spotify
          </Button>
        </div>
      )}
    </div>
  )
}

export default SpotifyAuthenticationCard
