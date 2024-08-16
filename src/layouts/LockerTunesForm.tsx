import GetLeagueTeamsForm from "@/layouts/Forms/GetLeagueTeamsForm.tsx";
import {useState} from "react";
import GetTeamForm from "@/layouts/Forms/GetTeamForm.tsx";

const LockerTunesForm = () => {
    const [teams, setTeams] = useState<string[]>([]);
    const [team, setTeam] = useState('')

    const setTeamsCustom = (value: string[]) => {
        if(value.length == 0){
            setTeam('');
        }
        setTeams(value);
    };

    return (
        <>
            <GetLeagueTeamsForm setTeams={setTeamsCustom} teams={teams}/>
            {teams.length > 0 &&
                <GetTeamForm teams={teams} setTeam={setTeam} team={team}/>
            }
        </>
    );
};

export default LockerTunesForm;