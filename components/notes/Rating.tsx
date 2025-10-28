import React, { useState, useMemo } from 'react';
import { Note } from '../../types';
import { StarIcon } from '../../constants';
import { addRatingToNote } from '../../services/notesApiService';
import { useToast } from '../../hooks/useToast';

interface RatingProps {
    note: Note;
    onRatingChange: (note: Note) => void;
}

const Rating: React.FC<RatingProps> = ({ note, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const { addToast } = useToast();

    // Mocking current user ID
    const currentUserId = 'user-1';

    const { avgRating, totalRatings, currentUserRating } = useMemo(() => {
        const ratings = note.ratings || [];
        const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
        const avg = ratings.length > 0 ? (sum / ratings.length) : 0;
        const userRating = ratings.find(r => r.uid === currentUserId)?.rating || 0;
        return {
            avgRating: avg,
            totalRatings: ratings.length,
            currentUserRating: userRating,
        };
    }, [note.ratings]);

    const handleRatingSubmit = async (rating: number) => {
        try {
            const updatedNote = await addRatingToNote(note.id, rating, currentUserId);
            onRatingChange(updatedNote);
            addToast(`You rated this note ${rating} stars.`, 'success');
        } catch (error) {
            addToast('Failed to submit rating.', 'error');
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">{avgRating.toFixed(1)}</span>
                <span className="text-xl text-gray-400">/5</span>
            </div>
            <div className="flex-grow text-center sm:text-left">
                <div className="flex justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => handleRatingSubmit(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <StarIcon 
                                className={`w-7 h-7 cursor-pointer transition-colors 
                                ${star <= (hoverRating || currentUserRating || avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                            />
                        </button>
                    ))}
                </div>
                <p className="text-sm text-gray-400 mt-1">Based on {totalRatings} ratings.</p>
            </div>
        </div>
    );
};

export default Rating;
