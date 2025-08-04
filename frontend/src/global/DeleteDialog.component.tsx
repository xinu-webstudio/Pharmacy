import { useOutsideClick } from '../hooks/useOutsideClick.hook';
import { Icon } from '@iconify/react/dist/iconify.js';
import { PopupModal } from './PopupModal.component';

export const DeleteDialog = ({
  confirmAction,
  title,
  des,
  onClose,
  onConfirm,
}: {
  confirmAction?: boolean;
  button?: boolean;
  title?: string;
  des?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}) => {
  const modalRef = useOutsideClick(() => {
    onClose?.();
  });

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      {confirmAction && (
        <PopupModal classname="w-[28%]" ref={modalRef}>
          <div className="w-full h-full flex flex-col gap-6 p-6 relative">
            <div className="flex justify-center">
              {/* <img
                src="/reject.svg"
                alt=""
                className="w-10 h-10 object-contain"
              /> */}
              <Icon
                icon="mdi:close"
                width="18"
                height="18"
                className="absolute cursor-pointer right-4 top-2"
                onClick={handleClose}
              />
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold text-black/70">
                {title ?? 'Delete'}
              </h1>
              <h2 className="text-center text-[#64748B]">
                {des ??
                  'Are you sure you want to Delete? This action cannot be undone'}
              </h2>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button
                className="border border-primary w-32 py-2.5 px-2 rounded flex justify-center text-primary font-semibold gap-2 transition-all duration-300 hover:bg-primary hover:text-white"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-red hover:bg-white transition-all duration-300 hover:text-red w-32 py-2.5 px-2 rounded flex justify-center items-center hover:border hover:border-red text-white font-semibold gap-2"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </PopupModal>
      )}
    </>
  );
};
