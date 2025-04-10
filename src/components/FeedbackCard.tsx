
import React from 'react';
import { Star } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';
import { format } from 'date-fns';

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const displayName = feedback.name || 'Anonymous';
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'bug': return 'Bug Report';
      case 'suggestion': return 'Suggestion';
      case 'compliment': return 'Compliment';
      case 'question': return 'Question';
      case 'other': return 'Other';
      default: return category;
    }
  };
  
  const formatDate = (timestamp: string) => {
    return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="feedback-card animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{displayName}</h3>
          {feedback.email && (
            <a 
              href={`mailto:${feedback.email}`} 
              className="text-sm text-blue-500 hover:underline"
            >
              {feedback.email}
            </a>
          )}
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-feedback-lightPurple text-feedback-darkPurple">
          {getCategoryLabel(feedback.category)}
        </span>
      </div>
      
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < feedback.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-none text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{feedback.message}</p>
      
      <div className="text-xs text-gray-500">
        {formatDate(feedback.timestamp)}
      </div>
    </div>
  );
};

export default FeedbackCard;
