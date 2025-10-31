import axios from 'axios';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';

export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get(
            'https://api.themoviedb.org/3/movie/now_playing',
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDE0ODU1MWMxNDA0ZmJjMzUzZjliMTlhZmVkMmNjNCIsIm5iZiI6MTc0MDYyNDMxMi4xNTIsInN1YiI6IjY3YmZkMWI4ZTRhNWI4YmYwMGM4Yzg3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHrbu1CyDk1QGpO9h83yK37MbNW_15SUhR8toPzoG9I'
                }
            }
        );

        const movies = data.results;
        res.json({
            success: true,
            movies: movies
        });
    } catch (error) {
        console.error(
            'Error fetching now playing movies in getNowPlayingMovies:',
            error
        );
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to add a new show to the database
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;
        let movie = await Movie.findById(movieId);
        if (!movie) {
            const [movieDetailsResponse, movieCreditsResponse] =
                await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                        headers: {
                            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                        }
                    }),
                    axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                            }
                        }
                    )
                ]);

            const movieApiDate = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            const movieDetails = {
                _id: movieId,
                title: movieApiDate.title,
                overview: movieApiDate.overview,
                poster_path: movieApiDate.poster_path,
                backdrop_path: movieApiDate.backdrop_path,
                release_date: movieApiDate.release_date,
                runtime: movieApiDate.runtime,
                genres: movieApiDate.genres,
                original_language: movieApiDate.original_language,
                tagline: movieApiDate.tagline || '',
                vote_average: movieApiDate.vote_average,
                cast: movieCreditsData.cast
            };

            movie = await Movie.create(movieDetails);
        }

        const showsToCreate = [];

        showsInput.forEach(show => {
            const showDate = show.date;

            show.time.forEach(time => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            });
        });

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }
        res.json({
            success: true,
            message: 'Shows added successfully'
        });
    } catch (error) {
        console.error('Error adding show:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to get all shows from the database

export const getShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } })
            .populate('movie')
            .sort({ showDateTime: 1 });

        const uniqueShows = new Set(shows.map(show => show.movie));

        res.json({
            success: true,
            shows: Array.from(uniqueShows)
        });
    } catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to get a single shows from the database
export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;
        const shows = await Show.find({
            movie: movieId,
            showDateTime: { $gte: new Date() }
        });

        const movie = await Movie.findById(movieId);
        const dateTIme = {};

        shows.forEach(show => {
            const date = show.showDateTime.toISOString().split('T')[0];
            if (!dateTIme[date]) {
                dateTIme[date] = [];
            }
            dateTIme[date].push({ time: show.showDateTime, showId: show._id });
        });

        res.json({
            success: true,
            movie,
            dateTIme
        });
    } catch (error) {
        console.error('Error fetching show by ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
