import { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import kConverter from '../../lib/kConverter';

const AddShows = () => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setDateTimeSelection] = useState({});
    const [dateTimeInput, setDateTimeInput] = useState('');
    const [showPrice, setShowPrice] = useState(0);

    const fetchNowPlayingMovies = async () => {
        setNowPlayingMovies(dummyShowsData);
    };

    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return;
        const [date, time] = dateTimeInput.split('T');
        if (!date || !time) return;

        setDateTimeSelection(prev => {
            const times = prev[date] || [];
            if (!times.includes(time)) {
                return {
                    ...prev,
                    [date]: [...times, time]
                };
            }
            return prev;
        });
    };

    const handleRemoveDateTime = (date, time) => {
        setDateTimeSelection(prev => {
            const times = prev[date] || [];
            const updatedTimes = times.filter(t => t !== time);
            if (updatedTimes.length === 0) {
                const { [date]: _, ...rest } = prev; // Remove date if no times
                return rest;
            }
            return {
                ...prev,
                [date]: updatedTimes
            };
        });
    };

    return nowPlayingMovies.length > 0 ? (
        <>
            <Title text1="Add" text2="Shows" />
            <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
            <div className="overflow-x-auto pb-4">
                <div className="group flex flex-wrap gap-4 mt-4 w-max">
                    {nowPlayingMovies.map(movie => (
                        <div
                            onClick={() => setSelectedMovie(movie.id)}
                            key={movie.id}
                            className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
                        >
                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="w-full object-cover rounded brightness-90"
                                />
                                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                                    <p className="flex items-center gap-1 text-gray-400">
                                        <StarIcon className="inline w-4 h-4 text-primary fill-primary" />
                                        {movie.vote_average.toFixed(1)}
                                    </p>
                                    <p className="text-gray-300">
                                        {kConverter(movie.vote_count)} Votes
                                    </p>
                                </div>
                            </div>
                            {selectedMovie === movie.id && (
                                <div className="absolute top-2  flex items-center justify-center bg-blue-700 h-4 w-4 rounded">
                                    <CheckIcon
                                        strokeWidth={2.5}
                                        className="absolute top-0 left-0 w-4 h-4 text-white fill-white"
                                    />
                                </div>
                            )}
                            <p className="font-medium truncate">
                                {movie.title}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {movie.release_date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                {/* Show Price Input */}
                <div>
                    <label
                        htmlFor="show-price"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                    >
                        Show Price
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
                        <span className="text-gray-600 dark:text-gray-300">
                            {currency}
                        </span>
                        <input
                            id="show-price"
                            min={0}
                            type="number"
                            value={showPrice}
                            onChange={e => setShowPrice(e.target.value)}
                            placeholder="Enter Show Price"
                            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* Date and Time Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Select Date and Time
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                        <input
                            type="datetime-local"
                            value={dateTimeInput}
                            onChange={e => setDateTimeInput(e.target.value)}
                            className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                        />
                        <button
                            onClick={handleDateTimeAdd}
                            className="px-4 w-full md:w-fit py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
                        >
                            Add Time
                        </button>
                    </div>
                </div>

                {/* Display Selected Time */}
                {Object.keys(dateTimeSelection).length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            Selected Date-Time
                        </h2>
                        <ul className="space-y-3">
                            {Object.entries(dateTimeSelection).map(
                                ([date, times]) => (
                                    <li key={date}>
                                        <div className="font-medium text-blue-600 dark:text-blue-400">
                                            {date}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {times.map(time => (
                                                <div
                                                    key={time}
                                                    className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-full"
                                                >
                                                    <span>{time}</span>
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            handleRemoveDateTime(
                                                                date,
                                                                time
                                                            )
                                                        }
                                                        className="w-6 h-6 pl-4 text-red-500 cursor-pointer hover:text-red-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}

                {/* Add Show Button */}
                <div>
                    <button
                        // onClick={handleAddShow}
                        className="w-full py-2 px-4 bg-primary hover:bg-primary/70 text-white font-semibold rounded-md shadow"
                    >
                        Add Show
                    </button>
                </div>
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default AddShows;
