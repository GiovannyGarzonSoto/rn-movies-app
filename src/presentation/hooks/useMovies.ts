import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"
import * as useCases from '../../core/useCases'
import { moviesNowPlayingUseCase } from '../../core/useCases/movies/nowPlaying.useCase'
import { movieDbFetcher } from "../../config/adapters/movieDb.adapter"

let popularPageNumber = 1

export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])


    useEffect(() => {
        initialLoad()
    }, [])

    const initialLoad = async () => {
        const nowPlayingPromise = useCases.moviesNowPlayingUseCase(movieDbFetcher)
        const popularPromise = useCases.moviesPopularUseCase(movieDbFetcher)
        const topRatedPromise = useCases.moviesTopRatedUseCase(movieDbFetcher)
        const upcomingPromise = useCases.moviesUpcomingUseCase(movieDbFetcher)

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ])

        setNowPlaying(nowPlayingMovies)
        setPopular(popularMovies)
        setTopRated(topRatedMovies)
        setUpcoming(upcomingMovies)

        setIsLoading(false)
    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        popularNextPage: async() => {
            popularPageNumber++
            const popularMovies = await useCases.moviesPopularUseCase(movieDbFetcher, {
                page: popularPageNumber, 
            })

            setPopular(prev => [...prev, ...popularMovies])
        }
    }
}