import { AUTHENTICATOR_API_TOKEN_ENDPOINT, CALLBACK_URL } from './constants.ts';

export async function callBack(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (code) {
        try {
            const response = await fetch(AUTHENTICATOR_API_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    codeVerifier: codeVerifier,
                    redirectUri: CALLBACK_URL,
                }),
            });

            const data = await response.json();

            const accessToken: string | undefined = data.access_token;

            if (!accessToken) {
                console.error('Error:', 'no access_token');
                return;
            }

            localStorage.setItem('spotify_access_token', accessToken);
            await fetchUserProfile(accessToken);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function fetchUserProfile(accessToken: string): Promise<void> {
    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        localStorage.setItem('user_country', data.country);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('user_name', data.display_name);

        if (data.images && data.images.length > 0) {
            localStorage.setItem('user_image', data.images[0].url);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}