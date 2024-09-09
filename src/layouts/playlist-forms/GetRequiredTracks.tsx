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
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
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

  const handleSearch = async (query: string): Promise<void> => {
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
  }

  const addTrackToList = (track: ITrack | null): void => {
    if (track) {
      setTracks([...tracks, track])
    }
    setSelectedTrack(null)
  }

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
                  <div className="flex items-center gap-2">
                    <Input {...field} placeholder="Enter track name" className="w-full" />
                    <Button onClick={() => handleSearch(field.value)} disabled={loading}>
                      {loading ? <SymbolIcon className="animate-spin" /> : <MagnifyingGlassIcon/> }
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-4">
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((track) => (
              <div key={track.url} className="flex justify-between items-center py-2 border-b">
                <div className={'flex'}>
                  <img src={track.image_url} alt={'track cover image'} className={'h-10 w-10 rounded'} />
                  <div className={'ml-2'}>
                    <div>{track.title}</div>
                    <div className={'text-xs text-gray-500'}>{track.artist} • {Math.trunc(track.duration_ms / 60000)}:{Math.trunc((track.duration_ms / 1000) % 60).toString().padStart(2, '0')}</div>
                  </div>
                </div>
                <Button onClick={() => addTrackToList(track)}>Add</Button>
              </div>
            ))}
          </div>
        )}
      </div>
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
