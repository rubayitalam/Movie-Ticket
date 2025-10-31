import { dummyShowsData } from './../assets/assets';
import MovieCard from './../components/MovieCard';
import BlurCircle from './../components/BlurCircle';

const Favorite = () => {
    return dummyShowsData?.length > 0 ? (
        <div className="px-2 mt-20 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
            <div className="relative flex items-center justify-between pt-20 pb-10">
                <BlurCircle top="0" right="-80px" />
                <BlurCircle top="0" right="-80px" />
                <h1 className="text-gray-300 mx-auto font-medium text-lg">
                    Your Favorite Movies
                </h1>
            </div>
            {/* movie card  */}
            <div className="flex flex-wrap max-sm:justify-center gap-8 my-8">
                {dummyShowsData?.map(movie => (
                    <MovieCard movie={movie} key={movie?._id} />
                ))}
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner">
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    No Movies Available
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please check back later or try refreshing the page.
                </p>
            </div>
        </div>
    );
};

export default Favorite;
