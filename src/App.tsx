import React, { useEffect, useState } from "react";
import { callBack } from './spotify_authentication/callback.ts';
import { redirectToSpotifyAuth } from "@/spotify_authentication/spotify_auth_redirect.ts";
import { Button } from '@/components/ui/button';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const checkAuthentication = () => {
        const token = localStorage.getItem('spotify_access_token');
        if (token) {
            setIsAuthenticated(true);
            const storedUserName = localStorage.getItem('user_name');
            setUserName(storedUserName || 'User');
        } else {
            setIsAuthenticated(false);
            setUserName(null);
        }
    };

    useEffect(() => {
        const handleCallback = async () => {
            await callBack();
            checkAuthentication();
        };

        handleCallback().catch((error) => {
            console.error('Error handling callback:', error);
        });

        checkAuthentication();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen py-8 px-14 bg-zinc-900">
            <h1 className="text-3xl font-bold mb-4">Spotify Authentication with PKCE</h1>
            {isAuthenticated ? (
                <div className="text-xl">
                    <p className="mb-4">Hello, {userName}!</p>
                </div>
            ) : (
                <Button
                    onClick={redirectToSpotifyAuth}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Log in with Spotify
                </Button>
            )}
        </div>
    );
};

export default App;
