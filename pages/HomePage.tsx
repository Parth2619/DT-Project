import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ItemCard from '../components/ItemCard';
import ItemCardSkeleton from '../components/ItemCardSkeleton';
import { fetchPosts } from '../services/apiService';
import { LostFoundPost } from '../types';

const HomePage = () => {
  const [latestPosts, setLatestPosts] = useState<LostFoundPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const posts = await fetchPosts();
        setLatestPosts(posts.slice(0, 4)); // Show latest 4 items
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <Hero />
      <div className="py-16 sm:py-24 -mt-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                    Latest Items
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                    Check out the most recently reported lost and found items on campus.
                </p>
            </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => <ItemCardSkeleton key={index} />)
                ) : (
                  latestPosts.map(post => (
                    <ItemCard key={post.id} post={post} />
                  ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
