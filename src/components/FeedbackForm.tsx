
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import { useFeedbackStore } from '@/store/feedbackStore';
import FileAttachments from './FileAttachments';
import CustomFields from './CustomFields';
import { FileAttachment, CustomField } from '@/types/feedback';

const categories = [
  { value: 'bug', label: 'Bug Report' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'compliment', label: 'Compliment' },
  { value: 'question', label: 'Question' },
  { value: 'other', label: 'Other' },
];

interface FeedbackFormProps {
  customFields?: CustomField[];
  showFileUpload?: boolean;
  isCustomizing?: boolean;
  onCustomFieldsChange?: (fields: CustomField[]) => void;
  onCustomizingChange?: (isCustomizing: boolean) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  customFields = [],
  showFileUpload = false,
  isCustomizing = false,
  onCustomFieldsChange,
  onCustomizingChange
}) => {
  const navigate = useNavigate();
  const addFeedback = useFeedbackStore(state => state.addFeedback);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    message: '',
    category: ''
  });
  
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [internalCustomFields, setInternalCustomFields] = useState<CustomField[]>([]);
  const [editableCustomFields, setEditableCustomFields] = useState<CustomField[]>(customFields);
  
  const [errors, setErrors] = useState({
    rating: '',
    message: '',
    category: ''
  });
  
  // Initialize internal custom fields from props
  useEffect(() => {
    if (!isCustomizing) {
      setInternalCustomFields(customFields);
    }
  }, [customFields, isCustomizing]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (name in errors) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
    setErrors(prev => ({ ...prev, category: '' }));
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors(prev => ({ ...prev, rating: '' }));
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      rating: '',
      message: '',
      category: ''
    };
    
    let isValid = true;
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide feedback';
      isValid = false;
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
      isValid = false;
    }
    
    // Validate required custom fields
    const customFieldErrors = internalCustomFields.filter(field => 
      field.required && !field.value.trim()
    );
    
    if (customFieldErrors.length > 0) {
      customFieldErrors.forEach(field => {
        toast.error(`Please fill out the required field: ${field.label}`);
      });
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process file attachments
      const processedAttachments = attachments.map(attachment => ({
        name: attachment.name,
        type: attachment.type,
        url: attachment.url
      }));
      
      // Process custom fields
      const processedCustomFields = internalCustomFields.map(field => ({
        label: field.label,
        value: field.value
      }));
      
      // Add timestamp to feedback
      const newFeedback = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        attachments: processedAttachments,
        customFields: processedCustomFields
      };
      
      // Save feedback to store
      addFeedback(newFeedback);
      
      // Show success message
      toast.success("Feedback submitted successfully");
      
      // Navigate to thank you page
      navigate('/thank-you');
    }
  };
  
  const handleSaveCustomFields = () => {
    if (onCustomFieldsChange) {
      onCustomFieldsChange(editableCustomFields);
    }
    if (onCustomizingChange) {
      onCustomizingChange(false);
    }
  };
  
  const handleCancelCustomizing = () => {
    setEditableCustomFields(customFields);
    if (onCustomizingChange) {
      onCustomizingChange(false);
    }
  };
  
  if (isCustomizing) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold">Customize Form Fields</h2>
        <CustomFields
          customFields={editableCustomFields}
          onChange={setEditableCustomFields}
          isEditing={true}
        />
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="outline" onClick={handleCancelCustomizing}>
            Cancel
          </Button>
          <Button onClick={handleSaveCustomFields}>
            Save Fields
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name (optional)</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="feedback-input"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="feedback-input"
          />
        </div>
        
        <div>
          <Label className="block mb-2">
            Rating <span className="text-red-500">*</span>
          </Label>
          <StarRating value={formData.rating} onChange={handleRatingChange} />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>
        
        <div>
          <Label htmlFor="category">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger className="feedback-input">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        
        <div>
          <Label htmlFor="message">
            Feedback <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please share your feedback with us..."
            className="feedback-input min-h-32"
            rows={5}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        
        {/* Custom Fields */}
        {internalCustomFields.length > 0 && (
          <div className="mt-6">
            <CustomFields
              customFields={internalCustomFields}
              onChange={setInternalCustomFields}
              isEditing={false}
            />
          </div>
        )}
        
        {/* File Attachments */}
        {showFileUpload && (
          <FileAttachments
            attachments={attachments}
            onChange={setAttachments}
          />
        )}
      </div>
      
      <Button type="submit" className="feedback-primary-button w-full">
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
