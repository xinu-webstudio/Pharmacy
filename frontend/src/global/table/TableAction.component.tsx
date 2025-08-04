import { useState, useRef, useEffect } from 'react';
import { DeleteDialog } from '../../global/DeleteDialog.component';
import { Icon } from '@iconify/react/dist/iconify.js';

// Global state to track which dropdown is open
let globalOpenDropdown: string | null = null;
const dropdownListeners: Set<(openId: string | null) => void> = new Set();

const notifyDropdownChange = (openId: string | null) => {
  globalOpenDropdown = openId;
  dropdownListeners.forEach((listener) => listener(openId));
};

interface IProps {
  onMoreList?: {
    title: string;
    onClick: () => void;
    index: number;
  }[];
  onShow?: () => void;
  onReport?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  onPrint?: () => void;
  onSwitch?: (value: boolean) => void;
  switchStatus?: boolean;
  onApiSwitch?: () => void;
  onLabDeptSwitch?: () => void;
  labDeptSwitchStatus?: boolean;
  onReturn?: () => void;
  onSticker?: () => void;
  onPay?: () => void;
  onAssignShift?: () => void;
  rowId?: string | number; // Add unique identifier for each row
}

export function TableAction({
  onShow,
  onLabDeptSwitch,
  labDeptSwitchStatus,
  onReport,
  onEdit,
  onDelete,
  onMore,
  onSwitch,
  onPrint,
  onReturn,
  onApiSwitch,
  onAssignShift,
  switchStatus,
  onPay,
  onSticker,
  onMoreList,
  rowId = Math.random().toString(36), // Generate unique ID if not provided
}: IProps) {
  const [isActive, setIsActive] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    if (onSwitch) onSwitch(newValue);
  };

  const handleOnMoreDropdown = (e: any) => {
    e.stopPropagation();
    const currentRowId = rowId.toString();

    if (globalOpenDropdown === currentRowId) {
      // Close current dropdown
      notifyDropdownChange(null);
    } else {
      // Close any open dropdown and open this one
      notifyDropdownChange(currentRowId);
    }
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      notifyDropdownChange(null);
    }
  };

  // Listen for global dropdown changes
  useEffect(() => {
    const handleGlobalDropdownChange = (openId: string | null) => {
      setIsMoreOpen(openId === rowId.toString());
    };

    dropdownListeners.add(handleGlobalDropdownChange);

    // Set initial state
    setIsMoreOpen(globalOpenDropdown === rowId.toString());

    return () => {
      dropdownListeners.delete(handleGlobalDropdownChange);
    };
  }, [rowId]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex relative items-center justify-center gap-2 w-full min-w-fit">
      {onSwitch && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1"
          onClick={handleToggle}
        >
          <div
            className={`w-12 h-4 flex items-center bg-${
              isActive ? 'primary' : '[#808080]'
            } rounded-full p-1 cursor-pointer transition-all duration-300`}
            onClick={handleToggle}
          >
            <div
              className={`bg-white size-4 rounded-full shadow-md transform ${
                isActive ? 'translate-x-6' : 'translate-x-0'
              } transition-transform duration-300`}
            />
          </div>
        </div>
      )}
      {onApiSwitch && (
        <div
          className="cursor-pointer flex-shrink-0  rounded-sm p-1"
          onClick={onApiSwitch}
        >
          <div
            className={`w-12 h-5 flex items-center bg-${
              switchStatus ? 'primary' : 'gray-400'
            } rounded-full p-1 cursor-pointer transition-all duration-300 `}
          >
            <div
              className={`bg-white size-4 rounded-full shadow-md transform ${
                switchStatus ? 'translate-x-6 ' : 'translate-x-0'
              } transition-transform duration-300 border border-white`}
            />
          </div>
        </div>
      )}
      {onLabDeptSwitch && (
        <div
          className="cursor-pointer flex-shrink-0  rounded-sm p-1"
          onClick={onLabDeptSwitch}
        >
          <div
            className={`w-11 h-5 flex items-center bg-${
              !!labDeptSwitchStatus ? 'primary' : 'gray-400'
            } rounded-full p-1 cursor-pointer transition-all duration-300`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                !!labDeptSwitchStatus ? 'translate-x-5' : 'translate-x-0'
              } transition-transform duration-300`}
            />
          </div>
        </div>
      )}
      {onShow && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onShow}
        >
          <Icon className="size-4 min-w-4 min-h-4" icon="iconamoon:eye-thin" />
        </div>
      )}

      {onPrint && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onPrint}
        >
          <Icon
            icon="material-symbols:print-outline"
            className="size-4 min-w-4 min-h-4"
          />
        </div>
      )}

      {onEdit && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onEdit}
        >
          <Icon
            icon="lucide:edit"
            className="size-4 font-thin min-w-4 min-h-4"
          />
        </div>
      )}
      {onReport && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onReport}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            className="min-w-[14px] min-h-[14px]"
          >
            <path
              d="M3 2.89496C3 2.40069 3.40069 2 3.89496 2H16.5949C17.0892 2 17.4898 2.40069 17.4898 2.89496V18.0018C17.4898 18.4922 17.0952 18.8913 16.6048 18.8967L3.90484 19.0369C3.40673 19.0424 3 18.6401 3 18.142V2.89496Z"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.26172 4.55469V8.81641"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.55859 7.11328H8.96797"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.5234 5.41016H14.9328"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6719 8.81641H14.9336"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.70508 12.2305H14.9332"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.70508 14.7852H14.9332"
              stroke="#2B2B2B"
              strokeWidth="0.894961"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.26172 2H13.2281"
              stroke="#2B2B2B"
              strokeWidth="1.78992"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {onSticker && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onSticker}
        >
          <Icon
            icon="fluent:print-24-regular"
            className="size-4 min-w-4 min-h-4"
          />
        </div>
      )}
      {onDelete && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={() => setShowDelete(true)}
        >
          <Icon
            icon="famicons:trash-outline"
            className="size-3 text-red min-w-4 min-h-4"
          />
        </div>
      )}
      {onReturn && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onReturn}
        >
          <Icon
            icon="streamline:return-2"
            width="14"
            height="14"
            className="min-w-[14px] min-h-[14px]"
          />
        </div>
      )}
      {onPay && (
        <div
          className="cursor-pointer flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px] hover:bg-green transition-colors duration-300"
          onClick={onPay}
        >
          <Icon
            icon="mdi:credit-card-outline"
            className="size-4 text-darkishGreen min-w-4 min-h-4"
          />
        </div>
      )}

      {onMore && (
        <div
          className="cursor-pointer  flex-shrink-0 border border-gray-200 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px] overflow-scroll"
          ref={dropdownRef}
          onClick={handleOnMoreDropdown}
        >
          <Icon
            icon="pepicons-pencil:dots-y"
            className="size-4 min-w-4 min-h-4"
          />
          {isMoreOpen && onMoreList && (
            <div className="absolute z-[99999] flex flex-col w-40  bg-white border border-gray-300 top-2  overflow-scroll rounded shadow-md right-10">
              {onMoreList.map((item, index) => (
                <>
                  <div
                    key={item.index + index}
                    className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 px-3 py-1 "
                    onClick={() => {
                      notifyDropdownChange(null);
                      item.onClick();
                    }}
                  >
                    {item.title}
                  </div>
                  <hr />
                </>
              ))}
            </div>
          )}
        </div>
      )}
      {onAssignShift && (
        <div
          data-tooltip-id="assign-shift"
          className="cursor-pointer border border-gray-300 flex-shrink-0 rounded-sm p-1 inline-flex items-center justify-center min-w-[32px] min-h-[16px]"
          onClick={onAssignShift}
        >
          {/* <p className="px-1 text-white rounded-md py-0.5 text-sm bg-primary">
            Assign Now
          </p> */}
          <Icon
            icon="clarity:assign-user-line"
            className="size-4 min-w-4 min-h-4"
          />
          {/* <ReactTooltip id="assign-shift" place="right" content="Assign Now" /> */}
        </div>
      )}
      <DeleteDialog
        onClose={() => setShowDelete(false)}
        confirmAction={showDelete}
        onConfirm={() => {
          onDelete?.();
          setShowDelete(false);
        }}
      />
    </div>
  );
}
