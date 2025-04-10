
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  count?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, count = 5 }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  return (
    <div className="flex gap-2">
      {[...Array(count)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className="focus:outline-none transition-transform duration-200 hover:scale-110"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
          >
            <Star
              className={`h-8 w-8 transition-colors duration-200 ${
                starValue <= (hoverValue || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-none text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
