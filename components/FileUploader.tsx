import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';

interface FileUploaderProps {
  onFileSelect: (base64: string) => void;
  acceptedTypes?: 'image' | 'document' | 'all';
  maxSizeMB?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect, 
  acceptedTypes = 'image',
  maxSizeMB = 2 
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { addToast } = useToast();

  const getAcceptString = () => {
    switch (acceptedTypes) {
      case 'image':
        return 'image/*';
      case 'document':
        return '.pdf,.docx,.doc';
      case 'all':
        return 'image/*,.pdf,.docx,.doc';
      default:
        return 'image/*';
    }
  };

  const getAcceptedTypesText = () => {
    switch (acceptedTypes) {
      case 'image':
        return 'PNG, JPG, GIF';
      case 'document':
        return 'PDF, DOCX';
      case 'all':
        return 'PDF, DOCX, PNG, JPG, GIF';
      default:
        return 'PNG, JPG, GIF';
    }
  };

  const isValidFileType = (file: File) => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    switch (acceptedTypes) {
      case 'image':
        return fileType.startsWith('image/');
      case 'document':
        return (
          fileType === 'application/pdf' ||
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'application/msword' ||
          fileName.endsWith('.pdf') ||
          fileName.endsWith('.docx') ||
          fileName.endsWith('.doc')
        );
      case 'all':
        return (
          fileType.startsWith('image/') ||
          fileType === 'application/pdf' ||
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'application/msword' ||
          fileName.endsWith('.pdf') ||
          fileName.endsWith('.docx') ||
          fileName.endsWith('.doc')
        );
      default:
        return fileType.startsWith('image/');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
          addToast(`File is too large. Max size is ${maxSizeMB}MB.`, 'error');
          return;
      }
      
      if (!isValidFileType(file)) {
        addToast(`Invalid file type. Please upload ${getAcceptedTypesText()}.`, 'error');
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        // Only set preview for images
        if (file.type.startsWith('image/')) {
          setPreview(base64String);
        } else {
          setPreview(null);
        }
        
        onFileSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {acceptedTypes === 'document' ? 'Document' : acceptedTypes === 'all' ? 'File' : 'Image'}
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {preview ? (
                    <img src={preview} alt="Preview" className="mx-auto h-24 w-auto rounded-lg" />
                ) : fileName ? (
                    <div className="mx-auto">
                      <svg className="mx-auto h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 font-medium">{fileName}</p>
                    </div>
                ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-900 focus-within:ring-primary">
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileChange} 
                          accept={getAcceptString()} 
                        />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">{getAcceptedTypesText()} up to {maxSizeMB}MB</p>
            </div>
        </div>
    </div>
  );
};

export default FileUploader;
