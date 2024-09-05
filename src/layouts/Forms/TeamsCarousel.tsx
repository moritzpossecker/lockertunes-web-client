import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import React, { useState } from 'react'
import { Match } from '@/models/Match.ts'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  Cross1Icon,
  HomeIcon,
  ReloadIcon,
  RocketIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button.tsx'
import { card_class, card_width } from '@/components/custom-class-names.ts'

interface TeamsCarousel {
  changeProgress: (value: boolean) => void
  matches: Match[]
  setMatches: (value: Match[]) => void
}

function getMatchDayString(matchDay: number): string {
  if (matchDay === 1) return '1st'
  if (matchDay === 2) return '2nd'
  if (matchDay === 3) return '3rd'
  return matchDay + 'th'
}

const TeamsCarousel: React.FC<TeamsCarousel> = ({
  changeProgress,
  matches,
  setMatches,
}) => {
  const [originalMatches] = useState<Match[]>([...matches])

  function removeMatch(matchDay: number) {
    setMatches(matches.filter((match) => match.match_day !== matchDay))
  }

  function resetMatches() {
    setMatches([...originalMatches])
  }

  function resetForm() {
    setMatches([])
    changeProgress(false)
  }

  return (
    <>
      <div className={card_class}>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {matches.map((match) => (
              <CarouselItem
                key={match.match_day}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="mt-3 relative">
                    {matches.length > 1 && (
                      <Button
                        className="absolute rounded-full p-2 h-fit top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onClick={() => removeMatch(match.match_day)}
                        variant={'outline'}
                      >
                        <Cross1Icon className="h-3 w-3" />
                      </Button>
                    )}
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="flex flex-col gap-4 items-center">
                        {match.home_game ? (
                          <HomeIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <RocketIcon className="h-4 w-4 text-gray-500" />
                        )}
                        <div className="bg-gray-300 rounded-full w-fit">
                          <img
                            className="max-h-14 p-2 mix-blend-multiply"
                            src={`https://${match.opponent_logo_src}`}
                            alt={`${match.opponent} logo`}
                          />
                        </div>
                        <div className="text-gray-300 text-center min-h-14">
                          {match.opponent}
                        </div>
                        <div className="text-sm font-light text-gray-500 flex items-center gap-2">
                          <CalendarIcon />
                          {getMatchDayString(match.match_day)} match
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className={'flex justify-between' + card_width}>
        <Button variant={'secondary'} onClick={resetForm}>
          <ArrowLeftIcon />
        </Button>
        <Button variant={'secondary'} onClick={resetMatches}>
          <ReloadIcon className="mr-2" /> Reset Matches
        </Button>
        <Button
          disabled={matches.length == 0}
          onClick={() => changeProgress(true)}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  )
}

export default TeamsCarousel
