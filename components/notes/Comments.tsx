import React, { useState } from 'react';
import { Comment } from '../../types';
import Spinner from '../Spinner';
import { UserIcon } from '../../constants';

interface CommentsProps {
    comments: Comment[];
    onCommentSubmit: (text: string) => Promise<void>;
}

const Comments: React.FC<CommentsProps> = ({ comments, onCommentSubmit }) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setIsSubmitting(true);
        await onCommentSubmit(newComment);
        setNewComment('');
        setIsSubmitting(false);
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">{comments.length} Comments</h3>
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-5 h-5 text-gray-400"/>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">{comment.user.name}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-300 mt-1">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-700 mt-8 pt-6">
                <form onSubmit={handleSubmit}>
                    <h4 className="font-semibold text-white mb-2">Leave a comment</h4>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Share your thoughts..."
                        required
                    ></textarea>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-3 bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors disabled:bg-gray-500 flex items-center justify-center w-32"
                    >
                        {isSubmitting ? <Spinner size="sm" /> : 'Post Comment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Comments;
