
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareHeart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <MessageSquareHeart className="h-6 w-6 text-feedback-purple" />
          <span className="bg-gradient-to-r from-feedback-purple to-feedback-darkPurple bg-clip-text text-transparent">
            Feedback Flow
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/feedback" 
            className="text-gray-600 hover:text-feedback-purple transition-colors"
          >
            Give Feedback
          </Link>
          
          <Link 
            to="/admin" 
            className="text-gray-600 hover:text-feedback-purple transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
