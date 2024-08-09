import axios from 'axios';

const API_KEY = 'd2d6392f3311b76083cf538c8f620811';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getPopularMovies = async () => {
    const response = await tmdb.get('/movie/popular');
    return response.data.results
};

export const getUpcomingMovies = async () => {
    const response = await tmdb.get('/movie/upcoming')
    return response.data.results
}

export const getTopRatedMovies = async () => {
    const response = await tmdb.get('/movie/top_rated')
    return response.data.results
}

export const getMovieDetails = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`)
    return response.data
}

export const getTopCast = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}/credits`)
    return response.data.cast
}

export const getSimilarMovies = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}/similar`)
    return response.data.results
}

export const getPersonData = async (personId) => {
    const response = await tmdb.get(`/person/${personId}`)
    return response.data
}

export const getPersonMovies = async (personId) => {
    const response = await tmdb.get(`/person/${personId}/movie_credits`)
    return response.data.cast
}

export const getSearchedMovies = async (query) => {
    const response = await tmdb.get(`/search/movie?query=${query}`)
    return response.data.results
}
