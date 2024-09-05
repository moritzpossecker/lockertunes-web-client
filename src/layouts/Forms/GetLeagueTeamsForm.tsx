import React from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFetchTeams } from '@/lib/fussballde-src/teamsApiClient.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  ArrowRightIcon,
  CheckCircledIcon,
  MagnifyingGlassIcon,
  SymbolIcon,
} from '@radix-ui/react-icons'
import { card_class, card_width } from '@/components/custom-class-names.ts'

interface IGetLeagueTeamsProps {
  changeProgress: (value: boolean) => void
  teams: string[]
  setTeams: (value: string[]) => void
  leagueUrl: string
  setLeagueUrl: (value: string) => void
}

const GetLeagueTeamsForm: React.FC<IGetLeagueTeamsProps> = ({
  changeProgress,
  teams,
  setTeams,
  leagueUrl,
  setLeagueUrl,
}) => {
  const { loading, error, fetchTeams } = useFetchTeams()
  const formSchema = z.object({
    leagueUrl: z.string(),
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) : Promise<void> {
    setLeagueUrl(values.leagueUrl)
    const teams = await fetchTeams(values.leagueUrl)
    setTeams(teams)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leagueUrl: leagueUrl,
    },
  })

  return (
    <>
      <div className={card_class}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="leagueUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Find your team</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="https://www.fussball.de/your-league"
                        {...field}
                      />
                    </FormControl>
                    <Button type="submit">
                      {loading ? (
                        <SymbolIcon className="animate-spin" />
                      ) : (
                        <MagnifyingGlassIcon />
                      )}
                    </Button>
                  </div>
                  <FormDescription>
                    Find your team by first pasting the URL of your league.
                  </FormDescription>
                  {error != '' && <FormMessage>{error}</FormMessage>}
                  {teams.length > 0 && (
                    <FormMessage className="flex text-green-600 items-center">
                      <CheckCircledIcon className="mr-2" /> {teams.length} teams
                      found.
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className={'flex justify-end' + card_width}>
        <Button
          disabled={teams.length == 0}
          onClick={() => changeProgress(true)}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  )
}

export default GetLeagueTeamsForm
