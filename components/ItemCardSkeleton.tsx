import React from 'react';

const ItemCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="dark:bg-gray-800/50 bg-gray-200 backdrop-blur-sm border dark:border-gray-700/50 border-gray-300 rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="dark:bg-gray-700 bg-gray-300 w-full h-48"></div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="h-4 dark:bg-gray-700 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-6 dark:bg-gray-700 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 dark:bg-gray-700 bg-gray-300 rounded w-full mb-2"></div>
          <div className="mt-auto pt-2">
            <div className="h-6 dark:bg-gray-700 bg-gray-300 rounded-full w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
