
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout className="bg-gray-50">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            We Value Your Feedback
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Help us improve our products and services by sharing your thoughts and experiences.
          </p>
          <Link to="/feedback">
            <Button className="feedback-primary-button hover-scale text-lg px-8 py-6">
              Give Feedback
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Quick & Easy",
              description: "Our streamlined form takes just a minute to complete."
            },
            {
              title: "Your Voice Matters",
              description: "Every feedback submission is reviewed by our team."
            },
            {
              title: "Drive Improvements",
              description: "Your insights directly influence our development process."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to share your thoughts?</h2>
          <p className="mb-6">
            Your feedback is essential for our continuous improvement. 
            We appreciate your time and insights.
          </p>
          <Link to="/feedback">
            <Button variant="outline" className="bg-white text-purple-700 hover:bg-gray-100">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
