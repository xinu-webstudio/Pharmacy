import { useState, useRef, useEffect } from "react";

interface IProps {
  onMoreList?: {
    title: string;
    onClick: () => void;
    index: number;
  }[];
  onShow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  onPrint?: () => void;
  onSwitch?: (value: boolean) => void;
}

export function TableAction({
  onShow,
  onEdit,
  onDelete,
  onMore,
  onSwitch,
  onPrint,
  onMoreList,
}: IProps) {
  const [isActive, setIsActive] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    if (onSwitch) onSwitch(newValue);
  };

  const handleOnMoreDropdown = (e: any) => {
    e.stopPropagation();
    setIsMoreOpen((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMoreOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full gap-4">
      {onSwitch && (
        <div className="cursor-pointer " onClick={handleToggle}>
          <div
            className={`w-12 h-6 flex items-center bg-${
              isActive ? "primary" : "[#808080]"
            } rounded-full p-1 cursor-pointer transition-all duration-300`}
            onClick={handleToggle}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform ${
                isActive ? "translate-x-6" : "translate-x-0"
              } transition-transform duration-300`}
            />
          </div>
        </div>
      )}
      {onShow && (
        <div className="cursor-pointer border-r-2 my-2 pr-2  " onClick={onShow}>
          <div className="p-1 border-[#2c2c2c] border-1  rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 23 23"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"></path>
                <path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"></path>
              </g>
            </svg>
          </div>
        </div>
      )}
      {onEdit && (
        <div className="cursor-pointer border-x-2 my-2 px-2 " onClick={onEdit}>
          <div className="p-1 border-[#2c2c2c] border-1 rounded-full">
            <svg
              width="18"
              height="18"
              strokeWidth="1.3"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16699 2.3332H2.33366C1.89163 2.3332 1.46771 2.50879 1.15515 2.82135C0.842587 3.13391 0.666992 3.55784 0.666992 3.99986V15.6665C0.666992 16.1086 0.842587 16.5325 1.15515 16.845C1.46771 17.1576 1.89163 17.3332 2.33366 17.3332H14.0003C14.4424 17.3332 14.8663 17.1576 15.1788 16.845C15.4914 16.5325 15.667 16.1086 15.667 15.6665V9.8332M14.417 1.0832C14.7485 0.751676 15.1982 0.56543 15.667 0.56543C16.1358 0.56543 16.5855 0.751676 16.917 1.0832C17.2485 1.41472 17.4348 1.86436 17.4348 2.3332C17.4348 2.80204 17.2485 3.25168 16.917 3.5832L9.00033 11.4999L5.66699 12.3332L6.50033 8.99986L14.417 1.0832Z"
                stroke="#1E1E1E"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      {onDelete && (
        <div className="cursor-pointer border-l-2 my-2 px-2" onClick={onDelete}>
          <div className="p-1 border-[#2c2c2c] border-1 rounded-full">
            <svg
              width="16"
              height="18"
              strokeWidth="1.3"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 4.00033H2.16667M2.16667 4.00033H15.5M2.16667 4.00033V15.667C2.16667 16.109 2.34226 16.5329 2.65482 16.8455C2.96738 17.1581 3.39131 17.3337 3.83333 17.3337H12.1667C12.6087 17.3337 13.0326 17.1581 13.3452 16.8455C13.6577 16.5329 13.8333 16.109 13.8333 15.667V4.00033M4.66667 4.00033V2.33366C4.66667 1.89163 4.84226 1.46771 5.15482 1.15515C5.46738 0.842587 5.89131 0.666992 6.33333 0.666992H9.66667C10.1087 0.666992 10.5326 0.842587 10.8452 1.15515C11.1577 1.46771 11.3333 1.89163 11.3333 2.33366V4.00033M6.33333 8.16699V13.167M9.66667 8.16699V13.167"
                stroke="#0D0D0D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      {/* bg-[#D9D9D9] */}
      {onMore && (
        <div className="relative" ref={dropdownRef}>
          <div className="cursor-pointer" onClick={handleOnMoreDropdown}>
            <div className="border-[#2c2c2c] border-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 1024 1024"
                strokeWidth="1.3"
              >
                <path
                  fill="currentColor"
                  d="M456 231a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0m0 280a56 56 0 1 0 112 0a56 56 0 1 0-112 0"
                />
              </svg>
            </div>
            {isMoreOpen && onMoreList && (
              <div className="absolute z-10 flex flex-col w-40 gap-2 py-2 mt-[-27px] bg-white border border-gray-300 rounded shadow-md right-10">
                {onMoreList.map((item) => (
                  <div
                    key={item.index}
                    className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setIsMoreOpen(false);
                      item.onClick();
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {onPrint && (
        <div className="cursor-pointer " onClick={onPrint}>
          <div className="p-1 border-[#2c2c2c] border-1 rounded-full">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              strokeWidth="1.3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.00033 6.50033V0.666992H14.0003V6.50033M4.00033 14.0003H2.33366C1.89163 14.0003 1.46771 13.8247 1.15515 13.5122C0.842587 13.1996 0.666992 12.7757 0.666992 12.3337V8.16699C0.666992 7.72497 0.842587 7.30104 1.15515 6.98848C1.46771 6.67592 1.89163 6.50033 2.33366 6.50033H15.667C16.109 6.50033 16.5329 6.67592 16.8455 6.98848C17.1581 7.30104 17.3337 7.72497 17.3337 8.16699V12.3337C17.3337 12.7757 17.1581 13.1996 16.8455 13.5122C16.5329 13.8247 16.109 14.0003 15.667 14.0003H14.0003M4.00033 10.667H14.0003V17.3337H4.00033V10.667Z"
                stroke="#1E1E1E"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
