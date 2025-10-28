import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { submitClaim } from '../services/apiService';
import Spinner from './Spinner';

interface ClaimFormProps {
  postId: string;
  onClaimSubmitted: () => void;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ postId, onClaimSubmitted }) => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast('Please provide a description to support your claim.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitClaim(postId, description);
      addToast('Claim submitted successfully! You will be notified of the outcome.', 'success');
      onClaimSubmitted();
    } catch (error) {
      addToast('Failed to submit claim. Please try again.', 'error');
      console.error('Claim submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">Claim Item</h2>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Proof of Ownership
        </label>
        <p className="text-xs text-gray-400 mb-2">
          Please describe the item in detail. Mention any unique features, contents, or the lock screen image if it's a phone. This will help us verify you are the rightful owner.
        </p>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="e.g., 'My wallet has a student ID for John Doe and a credit card ending in 1234...'"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-gray-500 flex justify-center items-center"
      >
        {isSubmitting ? <Spinner /> : 'Submit Claim'}
      </button>
    </form>
  );
};

export default ClaimForm;
