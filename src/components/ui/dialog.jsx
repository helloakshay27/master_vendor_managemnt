import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ className = '', children, ...props }) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const DialogFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`mt-6 flex justify-end gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
