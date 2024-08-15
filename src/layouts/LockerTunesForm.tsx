import GetLeagueTeamsForm from "@/layouts/Forms/GetLeagueTeamsForm.tsx";
import {useState} from "react";

const LockerTunesForm = () => {
    const [teams, setTeams] = useState<string[]>([]);

    return (
        <>
            <GetLeagueTeamsForm setTeams={setTeams}/>
            {teams.length > 0 &&
                <div>Hello World</div>
            }
        </>
    );
};

export default LockerTunesForm;