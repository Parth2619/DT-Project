import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LostFoundPost, PostType, PostStatus } from '../types';
import { fetchPost } from '../services/apiService';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import ClaimForm from '../components/ClaimForm';
import { ArrowLeftIcon } from '../constants';

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<LostFoundPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const fetchedPost = await fetchPost(id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          // Handle post not found
        }
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);
  
  const handleClaimSubmitted = () => {
    setIsClaimModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!post) {
    return <div className="text-center py-20 text-xl">Item not found.</div>;
  }
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto mb-6">
            <Link 
                to="/lost-and-found" 
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-light-text dark:hover:text-white transition-colors font-semibold"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to List
            </Link>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 sm:h-96 object-cover" />
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${post.type === PostType.Found ? 'bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'}`}>
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-white mt-2">{post.title}</h1>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full capitalize bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300`}>
                  {post.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-600 dark:text-gray-300">
              <div><strong>Location:</strong> {post.location}</div>
              <div><strong>Date {post.type === 'found' ? 'Found' : 'Lost'}:</strong> {formattedDate}</div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-light-text dark:text-white mb-2">Details</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{post.details}</p>
            </div>
            
            {post.type === PostType.Found && post.status === PostStatus.Pending && (
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setIsClaimModalOpen(true)}
                  className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg shadow-primary/30"
                >
                  Claim This Item
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {post && (
        <Modal isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)}>
            <ClaimForm postId={post.id} onClaimSubmitted={handleClaimSubmitted} />
        </Modal>
      )}
    </>
  );
};

export default ItemDetailPage;
