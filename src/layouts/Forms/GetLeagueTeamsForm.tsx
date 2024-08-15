import React from 'react';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription} from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useFetchTeams} from "@/layouts/Forms/fussballde_src/api_client.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"
import LoadingSpinner from "@/layouts/LoadingSpinner.tsx";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {card_class} from "@/components/custom-class-names.ts";

interface GetTeamFormProps {
    setTeams: (value: string[]) => void;
}

const GetLeagueTeamsForm: React.FC<GetTeamFormProps> = ({setTeams}) => {
    const {loading, error, fetchTeams} = useFetchTeams(setTeams);
    const formSchema = z.object({
        leagueUrl: z.string()
    })

    async function handelSubmit(values: z.infer<typeof formSchema>) {
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
                <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="leagueUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Find your team</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://www.fussball.de/your-league" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Find your team by first pasting the URL of your league.
                                </FormDescription>
                                {error != '' &&
                                    <FormMessage>{error}</FormMessage>
                                }
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{loading ? <LoadingSpinner /> : <MagnifyingGlassIcon/>}</Button>
                </form>
            </Form>
        </div>
    );
};

export default GetLeagueTeamsForm;