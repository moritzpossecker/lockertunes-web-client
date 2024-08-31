import React from 'react';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useFetchTeams} from "@/layouts/Forms/fussballde_src/teams_api_client.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"
import {CheckCircledIcon, MagnifyingGlassIcon, SymbolIcon} from "@radix-ui/react-icons";
import {card_class} from "@/components/custom-class-names.ts";
import {LEAGUE_URL_KEY} from "@/layouts/Forms/fussballde_src/constants.ts";

interface GetTeamFormProps {
    setTeams: (value: string[]) => void;
    teams: string[];
}

const GetLeagueTeamsForm: React.FC<GetTeamFormProps> = ({teams, setTeams}) => {
    const {loading, error, fetchTeams} = useFetchTeams(setTeams);
    const formSchema = z.object({
        leagueUrl: z.string()
    })

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        sessionStorage.setItem(LEAGUE_URL_KEY, values.leagueUrl);
        await fetchTeams(values.leagueUrl);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            leagueUrl: "",
        },
    })

    return (
        <div className={card_class}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="leagueUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Find your team</FormLabel>
                                <div className="flex gap-2">
                                    <FormControl>
                                        <Input placeholder="https://www.fussball.de/your-league" {...field} />
                                    </FormControl>
                                    <Button type="submit">{loading ?
                                        <SymbolIcon className="animate-spin"/> :
                                        <MagnifyingGlassIcon/>}</Button>
                                </div>
                                <FormDescription>
                                    Find your team by first pasting the URL of your league.
                                </FormDescription>
                                {error != '' &&
                                    <FormMessage>{error}</FormMessage>
                                }
                                {teams.length > 0 &&
                                    <FormMessage className="flex text-green-600 items-center"><CheckCircledIcon
                                        className="mr-2"/> {teams.length} teams found.</FormMessage>
                                }
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default GetLeagueTeamsForm;