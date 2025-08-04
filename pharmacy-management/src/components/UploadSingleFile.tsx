import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface FileWithPreview extends File {
  preview?: string;
  progress?: number;
}

interface UploadPhotoProps {
  value?: File | string;
  onChange?: (file?: File | string) => void;
}

export const UploadSinglePhoto: React.FC<UploadPhotoProps> = ({
  value,
  onChange,
}) => {
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  useEffect(() => {
    return () => {
      if (previewFile && previewFile.preview) {
        URL.revokeObjectURL(previewFile.preview);
      }
    };
  }, [previewFile]);

  useEffect(() => {
    if (value instanceof File) {
      setPreviewFile({
        ...value,
        preview: URL.createObjectURL(value),
        progress: 0,
      });
    } else if (typeof value === 'string') {
      setPreviewFile({
        preview: `https://api-bhansa.webstudiomatrix.com${value}`,
        progress: 100,
      } as FileWithPreview);
    }
  }, [value]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('File type not supported');
      return false;
    }
    if (file.size > MAX_SIZE) {
      alert('File size exceeds 50MB limit');
      return false;
    }
    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    const newPreview = {
      ...file,
      preview: URL.createObjectURL(file),
      progress: 0,
    };

    setPreviewFile(newPreview);
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    if (previewFile && previewFile.preview) {
      URL.revokeObjectURL(previewFile.preview);
    }
    setPreviewFile(null);
    onChange?.({} as FileWithPreview);
  };

  return (
    <div className="p-4 max-w-md">
      {!previewFile && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <Icon
            icon="qlementine-icons:cloud-up-16"
            className="h-12 w-12 text-gray-400 mb-4"
          />
          <p className="text-sm text-gray-500 text-center mb-4">
            JPEG, PNG, and SVG formats, up to 50MB
          </p>
          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Browse File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}

      {previewFile && (
        <div className="mt-4 relative">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={previewFile.preview || '/placeholder.svg'}
              alt="Preview"
              className="h-full w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Icon icon="charm:cross" className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
};
