import SpotifyAuthenticationCard from "@/layouts/SpotifyAuthenticationCard.tsx";
import {useState} from "react";

const App = () => {
    const [isConnected, setIsConnected] = useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen py-8 px-14 bg-zinc-900 gap-8">
            <SpotifyAuthenticationCard isConnected={isConnected} setIsConnected={setIsConnected}/>
            {isConnected ? (
                <div className="flex flex-col justify-between h-full">
                    <p className="text-5xl text-zinc-50 font-bold">Hello!</p>
                    <div className="flex justify-between">
                        <p className="text-3xl text-zinc-300">Let's get started.</p>
                    </div>
                </div>
            ) : (<></>)}
        </div>
    )
};

export default App;
