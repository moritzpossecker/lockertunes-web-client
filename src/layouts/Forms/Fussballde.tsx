import {card_class} from "@/components/custom-class-names.ts";
import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {MagnifyingGlassIcon} from '@radix-ui/react-icons';
import {useState} from "react";

const Fussballde = () => {
    const [leagueUrl, setLeagueUrl] = useState('');

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setLeagueUrl(enteredName);
    };

    const search = async () => {
        try {
            console.log("")
        }
        catch (err) {
            console.log(err)
        }
    };

    return(
        <div className={card_class}>
            <h1 className="text-xl text-zinc-50 font-bold">Add your team</h1>
            <p className="text-zinc-500 mb-2">Connect your team with Fussball.de</p>
            <div className="grid w-full items-center gap-1.5 text-zinc-200">
                <Label htmlFor="url">Add the URL of the league of your team below.</Label>
                <div className="flex w-full items-center space-x-2">
                    <Input className="bg-transparent text-zinc-50 placeholder-zinc-200 border-zinc-500"
                           type="url" placeholder="https://www.fussball.de/spielplan/herren-stadtklasse-kreis-leipzig-kreisliga-a-herren-saison2425-sachsen/-/staffel/02Q07GJAU8000000VS5489B4VVE5FNTJ-G#!/"
                            value={leagueUrl}
                            onChange={inputHandler}/>
                    <Button type="submit" onClick={search}><MagnifyingGlassIcon/></Button>
                </div>
            </div>
        </div>
    );
};

export default Fussballde
