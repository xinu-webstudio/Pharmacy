import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  classname?: string;
  onClose?: () => void;
}

export const PopupModal = React.memo(
  React.forwardRef<HTMLDivElement, ModalProps>(
    ({ children, classname, onClose }, ref) => {
      const modalRef = useRef<HTMLDivElement | null>(null);

      // Combine forwarded ref with local ref
      useEffect(() => {
        if (typeof ref === 'function') {
          ref(modalRef.current);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            modalRef.current;
        }
      }, [ref]);

      // Handle outside click
      useEffect(() => {
        if (!onClose) return;

        const handleClickOutside = (event: MouseEvent) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            onClose();
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [onClose]);

      // Prevent background scrolling
      useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = originalStyle;
        };
      }, []);

      return createPortal(
        <>
          {/* Backdrop with animation */}
          <div
            className="fixed inset-0 bg-black bg-opacity-0 z-50 transition-all duration-300 ease-in-out animate-fadeIn"
            style={{ animation: 'fadeIn 0.3s forwards' }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Modal with animation */}
          <main
            ref={modalRef}
            className={`
              ${classname} 
              fixed top-[50%] z-[999] left-[50%] items-center flex flex-col justify-center
              bg-white border outline-none rounded-lg 
              max-h-[90vh] my-[5vh] 
              overflow-y-auto scroll-smooth
              shadow-xl
              transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-300 ease-in-out
              animate-modalEnter
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </main>
        </>,
        document.body
      );
    }
  )
);

PopupModal.displayName = 'PopupModal';

// Add these animations to your global CSS or tailwind.config.js
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { background-color: rgba(0, 0, 0, 0); }
      to { background-color: rgba(0, 0, 0, 0.65); }
    }
    
    @keyframes modalEnter {
      from { 
        opacity: 0; 
        transform: translate(-50%, -48%) scale(0.96);
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s forwards;
    }
    
    .animate-modalEnter {
      animation: modalEnter 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
    }
  `;
  document.head.appendChild(style);
}
