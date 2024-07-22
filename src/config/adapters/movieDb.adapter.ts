import { AxiosAdapter } from "./http/axios.adapter"

export const movieDbFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '3b27706d117d2a3f283ad8f5dc4c29d7',
        language: 'es'
    }
})