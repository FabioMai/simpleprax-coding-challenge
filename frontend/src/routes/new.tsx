import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { CreateFeedbackRequest } from '@full-stack-starter/shared';
import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function NewFeedback() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFeedbackRequest>();

  const onSubmit = async (data: CreateFeedbackRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Navigate back to the list after successful submission
      navigate({ to: '/' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <h1>Add Patient Feedback</h1>

      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          Error: {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
            }}
          >
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: errors.name ? '2px solid #c62828' : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span style={{ color: '#c62828', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="rating"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
            }}
          >
            Rating *
          </label>
          <select
            id="rating"
            {...register('rating', {
              required: 'Rating is required',
              valueAsNumber: true,
            })}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: errors.rating ? '2px solid #c62828' : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
            disabled={isSubmitting}
          >
            <option value="">Select a rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          {errors.rating && (
            <span style={{ color: '#c62828', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              {errors.rating.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="comment"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
            }}
          >
            Comment *
          </label>
          <textarea
            id="comment"
            {...register('comment', {
              required: 'Comment is required',
              minLength: {
                value: 10,
                message: 'Comment must be at least 10 characters',
              },
            })}
            rows={5}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: errors.comment ? '2px solid #c62828' : '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'Arial, sans-serif',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
            disabled={isSubmitting}
          />
          {errors.comment && (
            <span style={{ color: '#c62828', fontSize: '14px', marginTop: '4px', display: 'block' }}>
              {errors.comment.message}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: isSubmitting ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: '/' })}
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export const Route = createFileRoute('/new')({
  component: NewFeedback,
});
