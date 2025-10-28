import React, { useState, useEffect, useCallback } from 'react';
import { LostFoundPost, PostType } from '../types';
import { fetchPosts } from '../services/apiService';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import PostForm from '../components/PostForm';
import { PlusCircleIcon } from '../constants';

const LostAndFoundPage = () => {
  const [posts, setPosts] = useState<LostFoundPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ type?: PostType, search: string }>({ search: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchPosts(filter);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeFilter = (type?: PostType) => {
    setFilter(prev => ({ ...prev, type }));
  };

  const onPostCreated = () => {
    setIsModalOpen(false);
    loadPosts();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
       <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Lost & Found
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Search for items reported lost or found by the campus community.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg shadow-primary/30"
        >
          <PlusCircleIcon className="w-6 h-6" />
          Report an Item
        </button>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search for items, locations..."
          value={filter.search}
          onChange={handleSearchChange}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <div className="flex-shrink-0 flex gap-2">
          <button onClick={() => handleTypeFilter(undefined)} className={`px-4 py-2 rounded-lg text-sm font-medium ${!filter.type ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>All</button>
          <button onClick={() => handleTypeFilter(PostType.Lost)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter.type === PostType.Lost ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>Reported Lost</button>
          <button onClick={() => handleTypeFilter(PostType.Found)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filter.type === PostType.Found ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>Reported Found</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center pt-10"><Spinner /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map(post => <ItemCard key={post.id} post={post} />)}
        </div>
      )}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PostForm onPostCreated={onPostCreated}/>
      </Modal>
    </div>
  );
};

export default LostAndFoundPage;