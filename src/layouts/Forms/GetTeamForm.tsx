import React from 'react';
import {Button} from "@/components/ui/button"
import {card_class} from "@/components/custom-class-names.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel, FormMessage,
} from "@/components/ui/form.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils.ts";
import {Check, ChevronsUpDown} from "lucide-react";
import {TEAM_NAME_KEY} from "@/layouts/Forms/fussballde_src/constants.ts";

interface GetTeamFormProps {
    teams: string[];
}

const GetTeamForm: React.FC<GetTeamFormProps> = ({teams}) => {
    const formSchema = z.object({
        team: z.string()
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.team);
        sessionStorage.setItem(TEAM_NAME_KEY, values.team);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            team: "",
        },
    })

    return (
        <div className={card_class}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="team"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Select your team</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? teams.find(
                                                        (team) => team === field.value
                                                    )
                                                    : "Select team"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search team..."/>
                                            <CommandList>
                                                <CommandEmpty>No team found.</CommandEmpty>
                                                <CommandGroup>
                                                    {teams.map((team) => (
                                                        <CommandItem
                                                            onSelect={() => {
                                                                form.setValue("team", team);
                                                                handleSubmit(form.getValues());
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    team === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {team}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Select your team from the dropdown.
                                </FormDescription>
                                {sessionStorage.getItem(TEAM_NAME_KEY) != '' &&
                                    <FormMessage className="flex text-green-600 items-center"><CheckCircledIcon
                                        className="mr-2"/> {sessionStorage.getItem(TEAM_NAME_KEY)} was selected.</FormMessage>
                                }
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default GetTeamForm;