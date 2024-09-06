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
import { Slider } from '@/components/ui/slider.tsx'
import { card_class, card_width } from '@/components/custom-class-names.ts'
import { ArrowLeftIcon, ArrowRightIcon, SymbolIcon } from '@radix-ui/react-icons'
import React from 'react'

interface IGetPlaylistDurationProps {
  changeProgress: (_value: boolean) => void
  playlistDuration: number
  setPlaylistDuration: (_value: number) => void
}

const GetPlaylistDuration: React.FC<IGetPlaylistDurationProps> = ({
                                                                    changeProgress,
                                                                    playlistDuration,
                                                                    setPlaylistDuration,
                                                                  }) => {
  const formSchema = z.object({
    duration: z.number().min(5).max(120),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      duration: playlistDuration,
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setPlaylistDuration(values.duration)
    changeProgress(true)
  }

  return (
    <>
      <div className={card_class}>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist Duration</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Slider
                        min={5}
                        max={120}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) =>
                          field.onChange(value[0])
                        }
                      />
                      <div>{field.value} minutes</div>
                    </div>
                  </FormControl>
                  <FormMessage />
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

export default GetPlaylistDuration
