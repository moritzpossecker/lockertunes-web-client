import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import { cn } from '@/lib/utils.ts'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx'
import React from 'react'
import { IMatch } from '@/models/IMatch.ts'
import { useFetchMatches } from '@/lib/fussballde-src/matchesApiClient.ts'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SymbolIcon,
} from '@radix-ui/react-icons'
import { card_class, card_width } from '@/components/custom-class-names.ts'

const gameSpanOptions = [
  { value: 1, label: 'the next game.' },
  { value: 3, label: 'the 3 next games.' },
  { value: 5, label: 'the 5 next games.' },
  { value: 10, label: 'the 10 next games.' },
  { value: 1000, label: 'the full season.' },
]

interface IGetGameSpanProps {
  changeProgress: (_value: boolean) => void
  setMatches: (_value: IMatch[]) => void
  team: string
  leagueUrl: string
}

const GetGameSpan: React.FC<IGetGameSpanProps> = ({
  changeProgress,
  setMatches,
  team,
  leagueUrl,
}) => {
  const defaultGameSpan = 5
  const { loading, error, fetchMatches } = useFetchMatches()

  const formSchema = z.object({
    game_span: z.number(),
  })

  async function handleSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const matches = await fetchMatches(leagueUrl, team, values.game_span)

    if (error == '' && matches.length > 0) {
      setMatches(matches)
      changeProgress(true)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      game_span: defaultGameSpan,
    },
  })

  return (
    <>
      <div className={card_class}>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="game_span"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game span</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-fit">Create playlists for</div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? gameSpanOptions.find(
                                    (gameSpanOption) =>
                                      gameSpanOption.value === field.value
                                  )?.label
                                : 'Select game span'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search game span..." />
                            <CommandList>
                              <CommandEmpty>No game span found.</CommandEmpty>
                              <CommandGroup>
                                {gameSpanOptions.map((gameSpanOption) => (
                                  <CommandItem
                                    value={gameSpanOption.label}
                                    key={gameSpanOption.value}
                                    onSelect={() => {
                                      form.setValue(
                                        'game_span',
                                        gameSpanOption.value
                                      )
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        gameSpanOption.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {gameSpanOption.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  {error != '' && <FormMessage>{error}</FormMessage>}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className={'flex justify-between' + card_width}>
        <Button variant={'secondary'} onClick={() => changeProgress(false)}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => handleSubmit(form.getValues())}>
          {loading ? (
            <SymbolIcon className="animate-spin" />
          ) : (
            <ArrowRightIcon />
          )}
        </Button>
      </div>
    </>
  )
}

export default GetGameSpan
