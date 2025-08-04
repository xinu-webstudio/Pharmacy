import { Icon } from '@iconify/react/dist/iconify.js';

interface IActionButtonProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  submitButtonName?: string;
  submitLabel?: string;
  submitlabelButton?: boolean;
  isPending?: boolean;
  thirdButton?: boolean;
  thirdButtonLabel?: string;
  thirdButtonAction?: () => void;
  hideCancel?: string;
  cancleLabel?: string;
}

export const ActionButton: React.FC<IActionButtonProps> = ({
  onCancel,
  onSubmit,
  submitLabel = 'submitting',
  isPending = false,
  thirdButton = false,
  thirdButtonAction,
  thirdButtonLabel,
  submitButtonName,
  hideCancel,
  cancleLabel = 'Cancel',
}) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        className={`ml-2 bg-gray-500 text-white text-sm font-medium py-1 px-2 rounded ${hideCancel}`}
        onClick={onCancel}
        type="button"
      >
        {cancleLabel}
      </button>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primaryBlue text-white font-semibold py-1 text-sm px-2 rounded"
        onClick={onSubmit}
      >
        {isPending ? (
          <span className="flex items-center gap-1">
            <Icon icon="icon-park-outline:loading-one" className="size-5" />
            {submitLabel}
          </span>
        ) : (
          submitButtonName || 'Submit'
        )}
      </button>

      {thirdButton && (
        <button
          type="button"
          disabled={isPending}
          className="bg-primary text-white font-medium py-1 text-sm px-2 rounded"
          onClick={thirdButtonAction}
        >
          <span className="flex items-center gap-1">
            <Icon icon="material-symbols:print-outline" className="size-5" />
            {thirdButtonLabel}
          </span>
        </button>
      )}
    </div>
  );
};
