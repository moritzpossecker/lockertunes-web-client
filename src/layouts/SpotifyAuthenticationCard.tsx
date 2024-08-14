import React, {useEffect, useState} from "react";
import {callBack} from "@/spotify_authentication/callback.ts";
import {Button} from "@/components/ui/button.tsx";
import {redirectToSpotifyAuth, removeAccessToken} from "@/spotify_authentication/spotify_authenticator.ts";
import {CIcon} from "@coreui/icons-react";
import {cibSpotify} from "@coreui/icons";

interface SpotifyAuthenticationCardProps {
    isConnected: boolean;
    setIsConnected: (value: boolean) => void;
}

const SpotifyAuthenticationCard: React.FC<SpotifyAuthenticationCardProps> = ({ isConnected, setIsConnected }) => {
    const [userName, setUserName] = useState<string | null>(null);

    const checkConnection = () => {
        const token = localStorage.getItem('spotify_access_token');
        if (token) {
            setIsConnected(true);
            const storedUserName = localStorage.getItem('user_name');
            setUserName(storedUserName || 'User');
        } else {
            setIsConnected(false);
            setUserName(null);
        }
    };

    const disconnectFromSpotify = () => {
        removeAccessToken();
        checkConnection();
    }

    useEffect(() => {
        const handleCallback = async () => {
            await callBack();
            checkConnection();
        };

        handleCallback().catch((error) => {
            console.error('Error handling callback:', error);
        });

        checkConnection();
    });

    return (
        <div
            className="cursor-default bg-gradient-to-br to-zinc-950 from-zinc-900 via-zinc-900 drop-shadow border border-zinc-600 w-1/2 h-52 flex flex-col py-10 px-8 rounded-md">
            {isConnected ? (
                <div className="flex flex-col justify-between h-full">
                    <p className="text-5xl text-zinc-50 font-bold">Hello, {userName}!</p>
                    <div className="flex justify-between">
                        <p className="text-3xl text-zinc-300">Let's get started.</p>
                        <Button
                            className="bg-red-600 text-zinc-50 py-2 px-4 rounded hover:bg-red-700"
                            onClick={disconnectFromSpotify}>
                            <CIcon icon={cibSpotify} className="mr-2 h-4 w-4 fill-zinc-50"/> Disconnect from Spotify
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <Button
                        onClick={redirectToSpotifyAuth}
                        className="bg-green-500 text-zinc-50 py-8 px-12 text-xl rounded hover:bg-green-600"
                    >
                        <CIcon icon={cibSpotify} className="mr-4 h-8 w-8 fill-zinc-50"/> Connect to Spotify
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SpotifyAuthenticationCard