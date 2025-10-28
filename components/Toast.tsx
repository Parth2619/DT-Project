import React, { useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import { ToastMessage } from '../types';
import { XIcon } from '../constants';

const Toast: React.FC<{ toast: ToastMessage; onDismiss: (id: number) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onDismiss]);

  const baseClasses = "flex items-center w-full max-w-xs p-4 my-2 text-gray-200 bg-neutral-dark border border-gray-700 rounded-lg shadow-lg";
  const typeClasses = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-blue-500',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[toast.type]}`} role="alert">
      <div className="ml-3 text-sm font-normal">{toast.message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-400 hover:text-white rounded-lg p-1.5 hover:bg-gray-700 inline-flex h-8 w-8"
        onClick={() => onDismiss(toast.id)}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-5 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
