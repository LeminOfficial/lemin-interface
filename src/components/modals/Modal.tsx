import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-surface-primary rounded-xl shadow-2xl max-w-lg w-full p-6 m-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-primary mb-4">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="pt-4 border-t border-primary mt-4">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
};
