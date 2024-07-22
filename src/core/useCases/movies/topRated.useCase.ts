import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movieDb.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesTopRatedUseCase = async(fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated')
        return topRated.results.map(MovieMapper.fromMovieDbResultToEntity)
    }catch(err) {
        throw new Error('Error fetching Movies - topRated')
    }
}