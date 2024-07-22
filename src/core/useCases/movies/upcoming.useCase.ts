import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movieDb.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesUpcomingUseCase = async(fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const upcoming = await fetcher.get<MovieDBMoviesResponse>('/upcoming')
        return upcoming.results.map(MovieMapper.fromMovieDbResultToEntity)
    }catch(err) {
        throw new Error('Error fetching Movies - upcoming')
    }
}