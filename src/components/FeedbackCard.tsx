
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, FileImage, FileText, File, ExternalLink } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const [showDetails, setShowDetails] = useState(false);
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
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-4 w-4" />;
    } else if (type === 'application/pdf') {
      return <FileText className="h-4 w-4" />; // Using FileText instead of FilePdf
    } else if (type.includes('word')) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };
  
  const hasAdditionalContent = 
    (feedback.attachments && feedback.attachments.length > 0) || 
    (feedback.customFields && feedback.customFields.length > 0);
  
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
      
      {hasAdditionalContent && (
        <Button 
          variant="ghost" 
          size="sm"
          className="mb-2 text-gray-500 hover:text-gray-700 p-0 h-auto"
          onClick={() => setShowDetails(!showDetails)}
        >
          <span className="flex items-center">
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show Details
              </>
            )}
          </span>
        </Button>
      )}
      
      {showDetails && (
        <div className="border-t pt-3 mt-2 space-y-4">
          {feedback.customFields && feedback.customFields.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Additional Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {feedback.customFields.map((field, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-medium text-gray-600">{field.label}</span>
                    <span className="text-gray-800">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {feedback.attachments && feedback.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {feedback.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 border rounded hover:bg-gray-50 transition-colors"
                  >
                    {getFileIcon(attachment.type)}
                    <span className="ml-2 text-sm truncate flex-1">{attachment.name}</span>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-3">
        {formatDate(feedback.timestamp)}
      </div>
    </div>
  );
};

export default FeedbackCard;
