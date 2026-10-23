import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-[#131822] border border-[#ccff00] text-white text-xs px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce-short"
        >
          <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
