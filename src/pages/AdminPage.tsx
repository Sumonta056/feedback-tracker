
import React, { useState } from 'react';
import { AlertTriangle, Download, Search, Trash2 } from 'lucide-react';
import { useFeedbackStore } from '@/store/feedbackStore';
import Layout from '@/components/Layout';
import AdminLogin from '@/components/AdminLogin';
import FeedbackCard from '@/components/FeedbackCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

const AdminPage: React.FC = () => {
  const { feedbacks, isAuthenticated, setAuthenticated, deleteFeedback } = useFeedbackStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleLogin = () => {
    setAuthenticated(true);
  };
  
  const handleLogout = () => {
    setAuthenticated(false);
  };
  
  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (deleteId) {
      deleteFeedback(deleteId);
      toast.success('Feedback deleted successfully');
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };
  
  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Rating', 'Category', 'Message', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...feedbacks.map(feedback => [
        `"${feedback.name || 'Anonymous'}"`,
        `"${feedback.email || ''}"`,
        feedback.rating,
        `"${feedback.category}"`,
        `"${feedback.message.replace(/"/g, '""')}"`,
        `"${feedback.timestamp}"`
      ].join(','))
    ].join('\n');
    
    // Create download link
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `feedback_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Feedback exported successfully');
  };
  
  // Filter feedbacks based on search term and category
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      searchTerm === '' || 
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feedback.name && feedback.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (feedback.email && feedback.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === '' || feedback.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <AdminLogin onLogin={handleLogin} />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage and review feedback submissions</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
            <Button 
              className="feedback-primary-button flex items-center gap-2"
              onClick={exportToCSV}
              disabled={feedbacks.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by message, name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="compliment">Compliment</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {feedbacks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">No feedback submissions yet</h2>
            <p className="text-gray-600">
              Feedback submissions will appear here once users start submitting them.
            </p>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <Search className="mx-auto h-10 w-10 text-gray-400 mb-3" />
            <h2 className="text-lg font-medium">No results found</h2>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="relative group">
                <FeedbackCard feedback={feedback} />
                <Button
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 p-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(feedback.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this feedback from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AdminPage;
