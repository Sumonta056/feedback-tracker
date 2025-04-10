
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FeedbackItem } from '@/types/feedback';

interface FeedbackState {
  feedbacks: FeedbackItem[];
  isAuthenticated: boolean;
  addFeedback: (feedback: FeedbackItem) => void;
  setAuthenticated: (value: boolean) => void;
  deleteFeedback: (id: string) => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbacks: [],
      isAuthenticated: false,
      addFeedback: (feedback) => 
        set((state) => ({ 
          feedbacks: [feedback, ...state.feedbacks] 
        })),
      setAuthenticated: (value) => 
        set({ isAuthenticated: value }),
      deleteFeedback: (id) => 
        set((state) => ({
          feedbacks: state.feedbacks.filter(feedback => feedback.id !== id)
        })),
    }),
    {
      name: 'feedback-store',
    }
  )
);
