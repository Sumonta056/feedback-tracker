
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Layout from '@/components/Layout';
import FeedbackForm from '@/components/FeedbackForm';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { CustomField } from '@/types/feedback';

const FeedbackPage: React.FC = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-center">Share Your Feedback</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="max-w-md mx-auto p-4">
                <DrawerHeader className="mb-4">
                  <DrawerTitle>Customize Feedback Form</DrawerTitle>
                </DrawerHeader>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Enable File Attachments</span>
                    <Button
                      variant={showFileUpload ? "default" : "outline"}
                      onClick={() => setShowFileUpload(!showFileUpload)}
                    >
                      {showFileUpload ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Custom Fields</span>
                      <Button 
                        variant="default"
                        onClick={() => setIsCustomizing(true)}
                      >
                        Edit Custom Fields
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {customFields.length === 0 
                        ? "No custom fields added yet" 
                        : `${customFields.length} custom field(s) configured`}
                    </p>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        
        <p className="text-gray-600 mb-8 text-center">
          We'd love to hear from you! Please fill out the form below.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FeedbackForm 
            customFields={customFields} 
            showFileUpload={showFileUpload} 
            isCustomizing={isCustomizing}
            onCustomFieldsChange={setCustomFields}
            onCustomizingChange={setIsCustomizing}
          />
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
