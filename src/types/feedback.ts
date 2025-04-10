
export interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  category: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
  customFields?: {
    label: string;
    value: string;
  }[];
}

export type FileAttachment = {
  name: string;
  type: string;
  url: string;
  file: File;
};

export type CustomField = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  options?: string[];
  required: boolean;
  value: string;
};
