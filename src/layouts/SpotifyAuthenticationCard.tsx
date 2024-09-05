import React, {useEffect, useState} from "react";
import {callBack} from "@/layouts/spotify_authentication_src/callback.ts";
import {Button} from "@/components/ui/button.tsx";
import {redirectToSpotifyAuth, removeAccessToken} from "@/layouts/spotify_authentication_src/spotify_authenticator.ts";
import {CIcon} from "@coreui/icons-react";
import {cibSpotify} from "@coreui/icons";
import {card_class} from "@/components/custom-class-names.ts"

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
            className={card_class + "h28 mb-5"}>
            {isConnected ? (
                <div className="flex flex-col justify-between h-full">
                    <h1 className="text-3xl text-gray-50 font-bold">Hello, {userName}!</h1>
                    <div className="flex justify-between items-baseline">
                        <p className="text-lg text-gray-300">Let's get started.</p>
                        <Button
                            className="bg-red-600 text-gray-50 py-2 px-4 rounded hover:bg-red-700"
                            onClick={disconnectFromSpotify}>
                            <CIcon icon={cibSpotify} className="mr-2 h-4 w-4 fill-gray-50"/> Disconnect from Spotify
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <Button
                        onClick={redirectToSpotifyAuth}
                        className="bg-green-600 text-gray-50 py-2 px-4 rounded hover:bg-green-700"
                    >
                        <CIcon icon={cibSpotify} className="mr-2 h-4 w-4 fill-gray-50"/> Connect to Spotify
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SpotifyAuthenticationCard