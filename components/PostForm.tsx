import React, { useState } from 'react';
import { PostType, LostFoundPost } from '../types';
import { createPost } from '../services/apiService';
import { generateDescription } from '../services/geminiService';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import FileUploader from './FileUploader';
import Spinner from './Spinner';
import { SparklesIcon } from '../constants';

interface PostFormProps {
    onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<PostType>(PostType.Found);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { addToast } = useToast();
    const { user } = useAuth();

    const handleGenerateDescription = async () => {
        if (!title) {
            addToast("Please enter a title first.", "info");
            return;
        }
        setIsGenerating(true);
        try {
            const generated = await generateDescription(title);
            setDetails(generated);
        } catch (error) {
            console.error(error);
            addToast("Failed to generate description.", "error");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !details || !location || !date || !imagePreview) {
            addToast("Please fill all fields and upload an image.", "error");
            return;
        }

        if (!user) {
            addToast("You must be logged in to post.", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const postData: Omit<LostFoundPost, 'id' | 'createdAt' | 'status' | 'posterUid'> = {
                title,
                details,
                location,
                date: new Date(date).toISOString(),
                type,
                imageUrl: imagePreview,
                posterEmail: user.email,
                posterName: user.name || user.email,
            };
            await createPost(postData as Omit<LostFoundPost, 'id' | 'createdAt' | 'status'>);
            addToast("Post created successfully!", "success");
            onPostCreated();
        } catch (error) {
            addToast("Failed to create post.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Report an Item</h2>
            <div className="flex gap-4">
                <button type="button" onClick={() => setType(PostType.Found)} className={`w-full py-3 rounded-lg font-semibold transition-colors ${type === PostType.Found ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>I Found Something</button>
                <button type="button" onClick={() => setType(PostType.Lost)} className={`w-full py-3 rounded-lg font-semibold transition-colors ${type === PostType.Lost ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}>I Lost Something</button>
            </div>
            
            <FileUploader onFileSelect={setImagePreview} />

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-300">Description</label>
                    <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover disabled:opacity-50 disabled:cursor-not-allowed">
                        {isGenerating ? <Spinner size="sm" /> : <SparklesIcon className="w-4 h-4" />}
                        Generate with AI
                    </button>
                </div>
                <textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none" required />
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-gray-500 flex justify-center items-center">
                {isSubmitting ? <Spinner /> : 'Submit Report'}
            </button>
        </form>
    );
};

export default PostForm;
