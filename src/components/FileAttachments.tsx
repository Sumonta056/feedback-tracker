
import React, { useState } from 'react';
import { FileAttachment } from '@/types/feedback';
import { File, FileImage, FilePdf, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

interface FileAttachmentsProps {
  attachments: FileAttachment[];
  onChange: (attachments: FileAttachment[]) => void;
}

const FileAttachments: React.FC<FileAttachmentsProps> = ({ attachments, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFiles(files);
      e.target.value = ''; // Reset input value
    }
  };
  
  const handleFiles = (files: File[]) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 
      'application/pdf',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles: FileAttachment[] = [];
    
    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File type not supported: ${file.name}`);
        return;
      }
      
      if (file.size > maxSize) {
        toast.error(`File too large (max 5MB): ${file.name}`);
        return;
      }
      
      const fileUrl = URL.createObjectURL(file);
      validFiles.push({
        name: file.name,
        type: file.type,
        url: fileUrl,
        file
      });
    });
    
    if (validFiles.length > 0) {
      onChange([...attachments, ...validFiles]);
    }
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].url);
    newAttachments.splice(index, 1);
    onChange(newAttachments);
  };
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-5 w-5" />;
    } else if (type === 'application/pdf') {
      return <FilePdf className="h-5 w-5" />;
    } else if (type.includes('word')) {
      return <FileText className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };
  
  return (
    <div className="space-y-3">
      <Label>Attachments (optional)</Label>
      
      <div 
        className={`border-2 border-dashed rounded-md p-4 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <File className="h-8 w-8 mb-2 text-gray-500" />
            <p className="text-sm mb-1">Drag &amp; drop files here, or click to select</p>
            <p className="text-xs text-gray-500">Supported formats: images, PDFs, DOC, DOCX (Max 5MB)</p>
          </div>
        </label>
      </div>
      
      {attachments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {attachments.map((attachment, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                {getFileIcon(attachment.type)}
                <span className="text-sm truncate">{attachment.name}</span>
              </div>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost"
                onClick={() => removeAttachment(index)} 
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileAttachments;
