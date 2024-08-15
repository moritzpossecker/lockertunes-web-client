import SpotifyAuthenticationCard from "@/layouts/SpotifyAuthenticationCard.tsx";
import {useState} from "react";
import LockerTunesForm from "@/layouts/LockerTunesForm.tsx";

const App = () => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen py-8 px-14 bg-zinc-900 gap-8">
            <SpotifyAuthenticationCard isConnected={isConnected} setIsConnected={setIsConnected}/>
            {isConnected &&
                <LockerTunesForm/>
            }
        </div>
    )
};

export default App;
