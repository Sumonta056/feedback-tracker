
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className={`flex-1 py-8 ${className}`}>
        <div className="container px-4 mx-auto">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
