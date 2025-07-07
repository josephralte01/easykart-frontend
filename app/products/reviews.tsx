'use client';

import React, { useState, useEffect } from 'react';
import { useErrorToast } from '@/contexts/ErrorToastContext';

interface Review {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showError } = useErrorToast();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reviews/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(data => {
        setReviews(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews.');
        showError('Failed to load reviews.');
        setLoading(false);
      });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, comment }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const data = await res.json();
      setReviews(prev => [data.review, ...prev]);
      setRating(0);
      setComment('');
    } catch {
      setError('Failed to submit review.');
      showError('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-4" role="status">Loading reviews...</div>;

  return (
    <section className="mt-8" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-lg font-bold mb-2">Reviews</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4" aria-label="Submit a review">
        <div>
          <label htmlFor="rating" className="mr-2 font-medium">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            required
            className="border rounded px-2 py-1 focus:ring-2 focus:ring-primary"
            aria-label="Rating"
          >
            <option value={0}>Select</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="review-comment" className="mr-2 font-medium">Comment:</label>
          <textarea
            id="review-comment"
            placeholder="Write a review..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
            className={`border rounded px-3 py-2 w-full focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : ''}`}
            aria-label="Review comment"
            aria-invalid={!!error}
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
        {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}
      </form>
      <div className="space-y-2">
        {reviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
        {reviews.map(r => (
          <article key={r._id} className="bg-gray-50 p-3 rounded shadow-sm" aria-label={`Review by ${r.user}`} tabIndex={0}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold" aria-label="Reviewer name">{r.user}</span>
              <span className="text-yellow-500" aria-label={`Rating: ${r.rating} out of 5`} role="img" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} aria-hidden="true">{i < r.rating ? '★' : '☆'}</span>
                ))}
              </span>
              <span className="text-xs text-gray-400 ml-auto" aria-label="Review date">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
            <div>{r.comment}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
