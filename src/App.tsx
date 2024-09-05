import SpotifyAuthenticationCard from '@/layouts/SpotifyAuthenticationCard.tsx'
import { useState } from 'react'
import LockerTunesForm from '@/layouts/LockerTunesForm.tsx'

const App = () => {
  const [is_connected, setIsConnected] = useState(false);

  return (
    <div className="bg-[url('/stadium.jpg')] bg-cover bg-fixed bg-center">
      <div className="flex flex-col items-center min-h-screen py-8 px-14 gap-8 bg-gray-900/[0.6]">
        <SpotifyAuthenticationCard
          isConnected={is_connected}
          setIsConnected={setIsConnected}
        />
        {is_connected && <LockerTunesForm />}
      </div>
    </div>
  )
}

export default App
