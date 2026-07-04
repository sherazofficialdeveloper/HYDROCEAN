import React, { useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({
  label,
  accept,
  onChange,
  value,
  error,
  maxSize = 10,
  className = '',
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds ${maxSize}MB limit.`);
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center
          transition-all duration-200 cursor-pointer
          ${value ? 'border-primary-300 bg-primary-50/50' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'}
          ${error ? 'border-red-500' : ''}
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="h-5 w-5 text-primary-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-700">{value.name}</p>
                <p className="text-xs text-slate-400">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">
              Click or drag to upload
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {accept?.replace(/\*/g, '').toUpperCase() || 'All files'} • Max {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;