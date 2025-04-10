
import React from 'react';
import Layout from '@/components/Layout';
import FeedbackForm from '@/components/FeedbackForm';

const FeedbackPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Share Your Feedback</h1>
        <p className="text-gray-600 mb-8 text-center">
          We'd love to hear from you! Please fill out the form below.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FeedbackForm />
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
