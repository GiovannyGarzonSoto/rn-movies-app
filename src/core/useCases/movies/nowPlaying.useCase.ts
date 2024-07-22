import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movieDb.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesNowPlayingUseCase = async(fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing')
        return nowPlaying.results.map(MovieMapper.fromMovieDbResultToEntity)
    }catch(err) {
        throw new Error('Error fetching Movies - now playing')
    }
}