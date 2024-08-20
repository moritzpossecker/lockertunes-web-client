import GetLeagueTeamsForm from "@/layouts/Forms/GetLeagueTeamsForm.tsx";
import {useState} from "react";
import GetTeamForm from "@/layouts/Forms/GetTeamForm.tsx";
import {TEAM_NAME_KEY} from "@/layouts/Forms/fussballde_src/constants.ts";
import GetPlaylistInfo from "@/layouts/Forms/GetPlaylistInfo.tsx";

const LockerTunesForm = () => {
    const [teams, setTeams] = useState<string[]>([]);

    const setTeamsCustom = (value: string[]) => {
        if(value.length == 0){
            sessionStorage.setItem(TEAM_NAME_KEY, '');
        }
        setTeams(value);
    };

    return (
        <>
            <GetLeagueTeamsForm setTeams={setTeamsCustom} teams={teams}/>
            {teams.length > 0 &&
                <GetTeamForm teams={teams} />
            }
            {sessionStorage.getItem(TEAM_NAME_KEY) != '' &&
                <GetPlaylistInfo />
            }
        </>
    );
};

export default LockerTunesForm;