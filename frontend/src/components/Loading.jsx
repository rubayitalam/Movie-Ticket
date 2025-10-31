import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default Loading;
