
import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { CustomField } from '@/types/feedback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomFieldsProps {
  customFields: CustomField[];
  onChange: (customFields: CustomField[]) => void;
  isEditing: boolean;
}

const CustomFields: React.FC<CustomFieldsProps> = ({ customFields, onChange, isEditing }) => {
  
  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false,
      value: '',
    };
    onChange([...customFields, newField]);
  };
  
  const updateCustomField = (index: number, field: Partial<CustomField>) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], ...field };
    
    // Reset value when changing type
    if (field.type && field.type !== newFields[index].type) {
      newFields[index].value = '';
      if (field.type === 'select' && !newFields[index].options) {
        newFields[index].options = ['Option 1'];
      }
    }
    
    onChange(newFields);
  };
  
  const removeCustomField = (index: number) => {
    const newFields = [...customFields];
    newFields.splice(index, 1);
    onChange(newFields);
  };
  
  const addOption = (fieldIndex: number) => {
    const newFields = [...customFields];
    const options = newFields[fieldIndex].options || [];
    newFields[fieldIndex].options = [...options, `Option ${options.length + 1}`];
    onChange(newFields);
  };
  
  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const newFields = [...customFields];
    if (newFields[fieldIndex].options) {
      newFields[fieldIndex].options![optionIndex] = value;
      onChange(newFields);
    }
  };
  
  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const newFields = [...customFields];
    if (newFields[fieldIndex].options && newFields[fieldIndex].options!.length > 1) {
      newFields[fieldIndex].options!.splice(optionIndex, 1);
      onChange(newFields);
    }
  };
  
  const handleFieldValueChange = (index: number, value: string) => {
    updateCustomField(index, { value });
  };
  
  const renderFieldValue = (field: CustomField, index: number) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={field.value}
            onChange={(e) => handleFieldValueChange(index, e.target.value)}
            placeholder={field.label}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={field.value}
            onChange={(e) => handleFieldValueChange(index, e.target.value)}
            placeholder={field.label}
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`custom-checkbox-${field.id}`}
              checked={field.value === 'true'}
              onCheckedChange={(checked) => 
                handleFieldValueChange(index, checked ? 'true' : 'false')
              }
            />
            <label
              htmlFor={`custom-checkbox-${field.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </label>
          </div>
        );
      case 'select':
        return (
          <Select
            value={field.value}
            onValueChange={(value) => handleFieldValueChange(index, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, optionIndex) => (
                <SelectItem key={optionIndex} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };
  
  if (customFields.length === 0 && !isEditing) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Custom Fields</Label>
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addCustomField}
            className="flex items-center space-x-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Field</span>
          </Button>
        )}
      </div>
      
      {customFields.map((field, index) => (
        <div key={field.id} className="border rounded-md p-3 space-y-3">
          {isEditing ? (
            <>
              <div className="flex justify-between items-center">
                <Input
                  value={field.label}
                  onChange={(e) => updateCustomField(index, { label: e.target.value })}
                  placeholder="Field Label"
                  className="mb-2"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCustomField(index)}
                  className="h-8 w-8 p-0 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">Field Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) => updateCustomField(index, { 
                      type: value as 'text' | 'number' | 'checkbox' | 'select' 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`required-${field.id}`}
                      checked={field.required}
                      onCheckedChange={(checked) => 
                        updateCustomField(index, { required: !!checked })
                      }
                    />
                    <Label htmlFor={`required-${field.id}`} className="text-xs">
                      Required
                    </Label>
                  </div>
                </div>
              </div>
              
              {field.type === 'select' && (
                <div className="space-y-2 mt-2">
                  <Label className="text-xs">Options</Label>
                  {field.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index, optionIndex)}
                        disabled={field.options?.length === 1}
                        className="h-10 w-10 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addOption(index)}
                    className="w-full mt-1"
                  >
                    Add Option
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-2">
              <Label>{field.label}{field.required && <span className="text-red-500"> *</span>}</Label>
              <div>
                {renderFieldValue(field, index)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomFields;
