import React from 'react';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {card_class} from "@/components/custom-class-names.ts";

interface GetTeamFormProps {
    teams: string[];
    setTeam: (value: string) => void;
}

const GetTeamForm: React.FC<GetTeamFormProps> = ({teams, setTeam}) => {
    return (
        <div className={card_class}>

        </div>
    );
};

export default GetTeamForm;