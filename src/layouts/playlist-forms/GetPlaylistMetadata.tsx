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
  FormDescription,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { card_class, card_width } from '@/components/custom-class-names.ts'
import { ArrowLeftIcon, ArrowRightIcon, SymbolIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { IMatch } from '@/models/IMatch.ts'
import { formatPlaylistString } from '@/lib/playlistNameFormatter.ts'

interface IGetPlaylistProps {
  changeProgress: (_value: boolean) => void
  playlistName: string
  setPlaylistName: (_value: string) => void
  playlistDescription: string
  setPlaylistDescription: (_value: string) => void
  homeGameString: string
  awayGameString: string
  setHomeGameString: (_value: string) => void
  setAwayGameString: (_value: string) => void
  match: IMatch
}

const GetPlaylistMetadata: React.FC<IGetPlaylistProps> = ({
                                                            changeProgress,
                                                            playlistName, setPlaylistName,
                                                            playlistDescription, setPlaylistDescription,
                                                            homeGameString, setHomeGameString,
                                                            awayGameString, setAwayGameString,
                                                            match,
                                                          }) => {
  const playlistNameExampleString = '⚔ OPPONENT ⚔'
  const [playlistNameExample, setPlaylistNameExample] = useState<string>('')
  const playlistDescriptionExampleString = 'Playlist MATCH_DAY: HOME_GAME against OPPONENT 🔥'
  const [playlistDescriptionExample, setPlaylistDescriptionExample] = useState<string>('')


  const formSchema = z.object({
    playlist_name: z.string().min(1, 'Playlist name is required'),
    playlist_description: z.string().min(1, 'Playlist description is required'),
    home_text: z.string().min(1, 'Home game text is required').default('Home'),
    away_text: z.string().min(1, 'Away game text is required').default('Away'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      playlist_name: playlistName ? playlistName: playlistNameExampleString,
      playlist_description: playlistDescription ? playlistDescription : playlistDescriptionExampleString,
      home_text: homeGameString,
      away_text: awayGameString,
    },
  })

  const playlistNameValue = form.watch('playlist_name')
  const playlistDescriptionValue = form.watch('playlist_description')
  const homeTextValue = form.watch('home_text')
  const awayTextValue = form.watch('away_text')

  function generatePlaylistNameExample(): string {
    if (playlistNameValue) {
      return formatPlaylistString(playlistNameValue, homeTextValue, awayTextValue, match)
    }
    return formatPlaylistString(playlistNameExampleString, homeTextValue, awayTextValue, match)
  }

  function generatePlaylistDescriptionExample(): string {
    if (playlistDescriptionValue) {
      return formatPlaylistString(playlistDescriptionValue, homeTextValue, awayTextValue, match)
    }
    return formatPlaylistString(playlistDescriptionExampleString, homeTextValue, awayTextValue, match)
  }

  useEffect(() => {
    setPlaylistNameExample(generatePlaylistNameExample())
  }, [playlistNameValue, homeTextValue, awayTextValue, match])

  useEffect(() => {
    setPlaylistDescriptionExample(generatePlaylistDescriptionExample())
  }, [playlistDescriptionValue, homeTextValue, awayTextValue, match])

  async function handleSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setPlaylistName(values.playlist_name)
    setPlaylistDescription(values.playlist_description)
    setHomeGameString(values.home_text)
    setAwayGameString(values.away_text)
    changeProgress(true)
  }

  return (
    <>
      <div className={card_class}>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="playlist_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Enter playlist name (e.g., "${playlistNameExampleString}")`}
                      className="w-full"
                      minLength={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="playlist_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder={`Enter playlist description (e.g., "${playlistDescriptionExampleString}")`}
                      className="w-full h-24 p-2"
                    />
                  </FormControl>
                  <FormDescription>
                    You can use the following wildcards:
                    <ul className="list-disc ml-4">
                      <li>
                        <strong>OPPONENT</strong>: Replaces with the opponent's team name.
                      </li>
                      <li>
                        <strong>TEAM</strong>: Replaces with your team's name.
                      </li>
                      <li>
                        <strong>MATCH_DAY</strong>: Inserts the match day number.
                      </li>
                      <li>
                        <strong>HOME_GAME</strong>: Replaces with your custom text for home or away games.
                      </li>
                    </ul>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="home_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Game Text</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter text for home games (default: Home)"
                      className="w-full"
                      minLength={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="away_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Away Game Text</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter text for away games (default: Away)"
                      className="w-full"
                      minLength={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              <FormLabel>Example Playlist Name:</FormLabel>
              <Input
                readOnly={true}
                value={playlistNameExample}
                className="p-2 w-full" />
            </div>
            <div className="mt-4">
              <FormLabel>Example Playlist Description:</FormLabel>
              <Textarea
                rows={4}
                readOnly={true}
                value={playlistDescriptionExample}
                className="p-2 w-full h-24" />
            </div>
          </form>
        </Form>
      </div>
      <div className={'flex justify-between' + card_width}>
        <Button variant={'secondary'} onClick={() => changeProgress(false)}>
          <ArrowLeftIcon />
        </Button>
        <Button
          disabled={playlistNameValue == '' || playlistDescriptionValue == '' || homeTextValue == '' || awayTextValue == ''}
          onClick={() => handleSubmit(form.getValues())}>
          {form.formState.isSubmitting ? (
            <SymbolIcon className="animate-spin" />
          ) : (
            <ArrowRightIcon />
          )}
        </Button>
      </div>
    </>
  )
}

export default GetPlaylistMetadata