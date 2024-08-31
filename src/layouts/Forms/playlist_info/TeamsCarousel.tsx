import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import React from "react";
import {Match} from "@/models/Match.ts";
import {CalendarIcon, HomeIcon, RocketIcon, SymbolIcon} from "@radix-ui/react-icons";

interface TeamsCarousel {
    matches: Match[],
    loading: boolean
}

function getMatchDayString(matchDay: number): string{
    if (matchDay == 1){
        return "1st"
    }
    if(matchDay == 2){
        return "2nd"
    }
    if(matchDay == 3){
        return "3rd"
    }

    return matchDay + 'th'
}

const TeamsCarousel: React.FC<TeamsCarousel> = ({matches, loading}) => {
    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-1">
                {matches.map((match) => (
                    <CarouselItem key={match.match_day} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {loading ?
                                        <SymbolIcon className="animate-spin"/> :
                                        <div className="flex flex-col gap-4 items-center">
                                            {match.home_game ?
                                                <HomeIcon className="h-4 w-4 text-gray-500"/> :
                                                <RocketIcon className="h-4 w-4 text-gray-500"/>
                                            }
                                            <div className='bg-gray-300 rounded-full w-fit'>
                                                <img
                                                    className='max-h-14 p-2 mix-blend-multiply'
                                                    src={`https://${match.opponent_logo_src}`}
                                                    alt={`${match.opponent} logo`}/>
                                            </div>
                                            <div className="text-gray-300 text-center">{match.opponent}</div>
                                            <div className="text-sm font-light text-gray-500 flex items-center gap-2"><CalendarIcon/>{getMatchDayString(match.match_day)} match</div>
                                        </div>
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    );
}

export default TeamsCarousel