
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquareHeart, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout className="py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full feedback-gradient flex items-center justify-center">
            <MessageSquareHeart className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          We Value Your{' '}
          <span className="bg-gradient-to-r from-feedback-purple to-feedback-darkPurple bg-clip-text text-transparent">
            Feedback
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-in">
          Your opinions help us improve our products and services.
          Share your thoughts, suggestions, or report issues.
        </p>
        
        <Link to="/feedback">
          <Button className="feedback-primary-button text-lg group">
            Give Feedback
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="feedback-card">
            <div className="h-12 w-12 rounded-full bg-feedback-lightPurple flex items-center justify-center mb-4 mx-auto">
              <span className="text-xl font-bold text-feedback-darkPurple">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Share Your Experience</h3>
            <p className="text-gray-600">
              Tell us about your experience with our product or service.
            </p>
          </div>
          
          <div className="feedback-card">
            <div className="h-12 w-12 rounded-full bg-feedback-lightPurple flex items-center justify-center mb-4 mx-auto">
              <span className="text-xl font-bold text-feedback-darkPurple">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Quick & Simple</h3>
            <p className="text-gray-600">
              Our form takes less than a minute to complete.
            </p>
          </div>
          
          <div className="feedback-card">
            <div className="h-12 w-12 rounded-full bg-feedback-lightPurple flex items-center justify-center mb-4 mx-auto">
              <span className="text-xl font-bold text-feedback-darkPurple">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Help Us Improve</h3>
            <p className="text-gray-600">
              Your feedback directly impacts our development decisions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
