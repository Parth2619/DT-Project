import React from 'react';
import { Link } from 'react-router-dom';
import { LostFoundPost, PostType, PostStatus } from '../types';

interface ItemCardProps {
  post: LostFoundPost;
}

const getStatusBadgeClass = (status: PostStatus) => {
    switch (status) {
        case PostStatus.Pending:
            return 'bg-yellow-500/20 text-yellow-300';
        case PostStatus.Claimed:
            return 'bg-blue-500/20 text-blue-300';
        case PostStatus.Returned:
            return 'bg-indigo-500/20 text-indigo-300';
        default:
            return 'bg-gray-700 text-gray-300';
    }
}

const ItemCard: React.FC<ItemCardProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Link to={`/item/${post.id}`} className="block group" aria-label={`View details for ${post.title}`}>
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700/50 border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary group-hover:shadow-glow group-hover:-translate-y-2 group-hover:scale-105">
            <div className="relative">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                <span 
                    className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold text-white rounded-full capitalize shadow-md
                    ${post.type === PostType.Found 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                        : 'bg-gradient-to-r from-amber-500 to-orange-600'}`}
                >
                    {post.type}
                </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.location} &bull; {formattedDate}</p>
                <h3 className="text-lg font-bold mt-1 flex-grow">{post.title}</h3>
                <div className="mt-2">
                     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadgeClass(post.status)}`}>
                        {post.status}
                    </span>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ItemCard;
