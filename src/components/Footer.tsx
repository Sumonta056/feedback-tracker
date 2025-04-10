
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 mt-auto">
      <div className="container px-4 mx-auto">
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Feedback Flow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
