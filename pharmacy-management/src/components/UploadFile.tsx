import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  defaultImage?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ multiple = false, onChange, defaultImage }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(defaultImage || []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    setFiles(newFiles);

    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => {
      if (!multiple) {
        prevPreviews.forEach(preview => URL.revokeObjectURL(preview));
        return newPreviews;
      }
      return [...prevPreviews, ...newPreviews];
    });

    onChange?.(newFiles);
  }, [files, multiple, onChange]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      onChange?.(newFiles);
      return newFiles;
    });

    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  }, [onChange]);

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-from-line"><path d="m18 9-6-6-6 6" /><path d="M12 3v14" /><path d="M5 21h14" /></svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {multiple ? 'Upload multiple images' : 'Upload single image'}
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div key={preview} className="relative group">
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;