import React, {useState} from 'react';
import {Button} from "@/components/ui/button"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
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
import {cn} from "@/lib/utils.ts";
import {Check, ChevronsUpDown} from "lucide-react";
import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";
import {card_class, card_width} from "@/components/custom-class-names.ts";

interface GetTeamFormProps {
    changeProgress: (value: boolean) => void
    teams: string[]
    team: string
    setTeam: (value: string) => void
}

const GetTeamForm: React.FC<GetTeamFormProps> = ({changeProgress, teams, team, setTeam}) => {
    const [open, setOpen] = useState(false)

    const formSchema = z.object({
        team: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            team: team,
        },
    })

    function resetForm(){
        setTeam('')
        changeProgress(false)
    }

    return (
        <>
            <div className={card_class}>
                <Form {...form}>
                    <form className="space-y-8">
                        <FormField
                            control={form.control}
                            name="team"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Select your team</FormLabel>
                                    <div className="flex gap-2">
                                        <Popover open={open} onOpenChange={setOpen}>
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
                                                                        form.setValue('team', team)
                                                                        setTeam(team)
                                                                        setOpen(false)
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
                                    </div>
                                    <FormDescription>
                                        Select your team from the dropdown.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
            <div className={"flex justify-between" + card_width}>
                <Button
                    variant={"secondary"}
                    onClick={resetForm}>
                    <ArrowLeftIcon/>
                </Button>
                <Button
                    disabled={team == ''}
                    onClick={() => changeProgress(true)}>
                    <ArrowRightIcon/>
                </Button>
            </div>
        </>
    );
};

export default GetTeamForm;