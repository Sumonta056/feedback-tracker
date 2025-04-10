
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, MessageSquare } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we got here from the feedback form
    // If accessing directly, redirect to home
    if (!document.referrer.includes('/feedback')) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);
  
  return (
    <Layout>
      <div className="max-w-lg mx-auto text-center">
        <div className="rounded-full bg-green-100 p-4 inline-block mb-4 animate-fade-in">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">
          Thank You for Your Feedback!
        </h1>
        
        <p className="text-gray-600 mb-8 animate-slide-in">
          Your feedback has been submitted successfully. We greatly appreciate your time
          and valuable input. Your thoughts help us improve our services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
          
          <Button 
            onClick={() => navigate('/feedback')} 
            className="feedback-primary-button flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Submit Another Feedback
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
