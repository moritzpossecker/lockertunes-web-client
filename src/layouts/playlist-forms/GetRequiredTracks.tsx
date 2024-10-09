import { useRef, useState, useEffect, MouseEventHandler } from 'react'
import { debounce } from 'lodash'
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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandItem,
  CommandInput,
  CommandList,
  CommandGroup,
} from '@/components/ui/command.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ITrack } from '@/models/ITrack.ts'
import { useFetchTracks } from '@/lib/spotify-src/tracksApiClient.ts'
import { MagnifyingGlassIcon, SymbolIcon } from '@radix-ui/react-icons'
import { card_class } from '@/components/custom-class-names.ts'

interface IGetTracksProps {
  changeProgress: (_value: boolean) => void
  tracks: ITrack[]
  setTracks: (_value: ITrack[]) => void
}

const GetRequiredTracks: React.FC<IGetTracksProps> = ({
                                                        changeProgress,
                                                        tracks,
                                                        setTracks,
                                                      }) => {
  const { loading, error, fetchTracks } = useFetchTracks()
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<ITrack[]>([])
  const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const formSchema = z.object({
    track: z.string().min(1, 'Track selection is required'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      track: '',
    },
  })

  const addTrackToList = (track: ITrack | null): void => {
    console.log('foo')
    console.log(track?.title)
    if (track) {
      setTracks([...tracks, track])
    }
    setSelectedTrack(null)
  }

  const handleSearch = debounce(async (query: string) => {
    if (!query) {
      setSearchResults([])
      return
    }
    try {
      const results = await fetchTracks(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    }
  }, 500)

  const handleInputFocus = (): void => {
    setOpen(true)
  }

  const handleInputBlur = (): void => {
    if (!popoverRef.current?.contains(document.activeElement)) {
      setOpen(false)
    }
  }

  const handlePopoverMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!inputRef.current?.contains(event.target as Node) && !popoverRef.current?.contains(event.target as Node)) {
      event.stopPropagation()
      setOpen(false)
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void => {
      if (!inputRef.current?.contains(event.target as Node) && !popoverRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return (): void => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [inputRef, popoverRef])

  return (
    <div className={card_class}>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="track"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Track</FormLabel>
                <FormControl>
                  <Command className={''}>
                    <Input
                      {...field}
                      placeholder="Enter track name"
                      className="w-full border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
                      ref={inputRef}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onInput={() => handleSearch(field.value)}
                    />
                    {open && (
                      <CommandList ref={popoverRef} onMouseDown={handlePopoverMouseDown}>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {searchResults.map((track) => (
                            <CommandItem key={track.url}>
                              <div
                                onClick={() => {
                                  addTrackToList(track)
                                }}
                                className="flex items-center py-2 border-b w-full">
                                <img src={track.image_url} alt={'track cover image'} className={'h-10 w-10 rounded'} />
                                <div className={'ml-2'}>
                                  <div>{track.title}</div>
                                  <div className={'text-xs text-gray-500'}>
                                    {track.artist} • {Math.trunc(track.duration_ms / 60000)}:{Math.trunc((track.duration_ms / 1000) % 60).toString().padStart(2, '0')}
                                  </div>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    )}
                  </Command>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-4">
        {tracks.length > 0 && (
          <>
            <h3 className="font-bold">Selected Tracks:</h3>
            <ul>
              {tracks.map((track) => (
                <li key={track.url} className="py-1">
                  {track.title}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default GetRequiredTracks
