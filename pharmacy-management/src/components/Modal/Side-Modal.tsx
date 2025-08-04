import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}


export const SideModal = React.memo(
  React.forwardRef<HTMLDivElement, ModalProps>(
    ({ children, className, isOpen, onClose }, ref) => {
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
      }, [])

      if (!mounted) {
        return null
      }

      return createPortal(
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div
            ref={ref}
            className={`fixed top-0 right-0 z-50 h-full overflow-scroll w-full max-w-md bg-white border border-gray-200 outline-none rounded-l-lg shadow-xl transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } ${className}`}
          >
            {children}
          </div>
        </>,
        document.body
      )
    }
  )
)

SideModal.displayName = 'SideModal'
