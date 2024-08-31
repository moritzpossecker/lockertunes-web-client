import {GET_MATCHES_URL} from "@/layouts/Forms/fussballde_src/constants.ts";

import {useState} from 'react';
import {Match} from "@/models/Match.ts";

export const useFetchMatches = (setMatches: (value: Match[]) => void) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMatches = async (leagueUrl: string, teamName: string, gameSpan: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await get_matches(leagueUrl, teamName, gameSpan);
            if(response.length == 0){
                setError("Couldn't find matches. Please check the URL and selected team and try again.")
            }
            setMatches(response);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch matches. Please check the URL and selected team and try again.');
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, fetchMatches};
};

const format_url = (league_url: string): string => {
    let url = league_url.replace('https://www.fussball.de/', '');
    url = url.slice(0, url.length - 3)
    return url.replace(/\//g, "SLASH")
}

const format_team_name = (team_name: string): string => {
    return team_name.replace(' ', 'SPACE')
}

const get_matches = async (league_url: string, team_name: string, game_span: number) => {
    const formatted_league_url = format_url(league_url)
    const formatted_team_name = format_team_name(team_name)
    console.log(GET_MATCHES_URL + formatted_team_name
        + '/' + formatted_league_url + '/' + game_span.toString())
    const response = await fetch(GET_MATCHES_URL + formatted_team_name
        + '/' + formatted_league_url + '/' + game_span.toString());
    if (!response.ok) {
        throw new Error(`Failed to get teams: ${response.statusText}`);
    }
    return await response.json();
};