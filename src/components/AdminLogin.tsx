
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Simple password for demo purposes - in a real app, this would be handled more securely
  const ADMIN_PASSWORD = 'admin123';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password === ADMIN_PASSWORD) {
      toast.success('Login successful');
      onLogin();
    } else {
      setError('Invalid password');
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full feedback-gradient flex items-center justify-center mb-4">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <p className="text-gray-500 mt-1">Enter the admin password to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="feedback-input"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        
        <Button type="submit" className="feedback-primary-button w-full">
          Login
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          For demo purposes, use password: admin123
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
