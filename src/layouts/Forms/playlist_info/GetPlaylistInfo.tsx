import {card_class} from "@/components/custom-class-names.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, FormMessage,
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import TeamsCarousel from "@/layouts/Forms/playlist_info/TeamsCarousel.tsx";
import {useState} from "react";
import {Match} from "@/models/Match.ts";
import {useFetchMatches} from "@/layouts/Forms/fussballde_src/matches_api_client.ts";
import {LEAGUE_URL_KEY, TEAM_NAME_KEY} from "@/layouts/Forms/fussballde_src/constants.ts";

const game_span_options = [
    {value: 1, label: 'the next game.'},
    {value: 3, label: 'the 3 next games.'},
    {value: 5, label: 'the 5 next games.'},
    {value: 10, label: 'the 10 next games.'},
    {value: 1000, label: 'the full season.'},
]

const GetPlaylistInfo = () => {
    const defaultGameSpan = 5;

    const [matches, setMatches] = useState<Match[]>([])

    const {loading, error, fetchMatches} = useFetchMatches(setMatches);

    const formSchema = z.object({
        game_span: z.number(),
        playlist_name: z.string(),
        playlist_length: z.number()
    })

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        await fetchMatches(
            sessionStorage.getItem(LEAGUE_URL_KEY) ?? '',
            sessionStorage.getItem(TEAM_NAME_KEY) ?? '',
            values.game_span
        )
        console.log(values.game_span)
        console.log(matches)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        defaultValues: {
            game_span: defaultGameSpan,
            playlist_name: '',
            playlist_length: 30
        },
    })

    return (
        <div className={card_class}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} onLoad={form.handleSubmit(handleSubmit)}
                      className="space-y-8">
                    <FormField
                        control={form.control}
                        name="game_span"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Game span</FormLabel>
                                <div className="flex gap-2 items-center">
                                    Create playlists for
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? game_span_options.find(
                                                                (game_span_option) => game_span_option.value === field.value
                                                            )?.label
                                                            : "Select game span"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search game span..."/>
                                                    <CommandList>
                                                        <CommandEmpty>No game span found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {game_span_options.map((game_span_option) => (
                                                                <CommandItem
                                                                    value={game_span_option.label}
                                                                    key={game_span_option.value}
                                                                    onSelect={() => {
                                                                        form.setValue("game_span", game_span_option.value)
                                                                        handleSubmit(form.getValues())
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            game_span_option.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {game_span_option.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                </div>
                                {error != '' &&
                                    <FormMessage>{error}</FormMessage>
                                }
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            {matches.length > 0 &&
                <TeamsCarousel matches={matches} loading={loading}/>
            }
        </div>
    );
};

export default GetPlaylistInfo;