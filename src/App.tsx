import SpotifyAuthenticationCard from '@/layouts/SpotifyAuthenticationCard.tsx'
import { useState } from 'react'
import LockerTunesForm from '@/layouts/LockerTunesForm.tsx'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div className="bg-[url('/stadium.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex flex-col items-center min-h-screen py-8 px-14 gap-8 bg-gray-900/[0.6]">
        <SpotifyAuthenticationCard
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
        {isConnected && <LockerTunesForm />}
      </div>
    </div>
  )
}

export default App
