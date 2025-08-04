import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../Button";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

interface IDepartmentHeaderProps {
  headerTitle?: string;
  onSearch?: boolean;
  onPatient?: boolean;

  onDepartment?: boolean;
  onSpecialist?: boolean;
  onContactNumber?: boolean;
  onDatePicker?: boolean;
  onSelect?: boolean;
  onFilter?: boolean;
  button?: boolean;
  buttonText?: string;
  onDesignation?: boolean;
  onShift?: boolean;
  onToday?: boolean;
  onRating?: boolean;
  onRole?: boolean;
  onStatus?: boolean;
  onAllowance?: boolean;
  onDietType?: boolean;
  onCategory?: boolean;
  onSubCategory?: boolean;
  onFilterExpCategory?: boolean;
  onFilterExpStatus?: boolean;
  onDatePickerExp?: boolean;

  buttonAction?: () => void;
  subButton?: boolean;
  subButtonAction?: () => void;
  subButtonText?: string;
  buttonIcon?: boolean;
}

export const AlternativeHeader = ({
  onSearch,
  onDatePicker,
  onPatient,
  onContactNumber,
  onSelect,
  onDepartment,
  onSpecialist,
  onFilter,
  onShift,
  headerTitle,
  button,
  buttonText,
  onToday,
  onRating,
  onDesignation,
  subButton,
  buttonAction,
  subButtonAction,
  onFilterExpCategory,
  onFilterExpStatus,
  onDatePickerExp,
  onRole,
  onStatus,
  onAllowance,
  onDietType,
  onSubCategory,
  onCategory,
  subButtonText,
}: IDepartmentHeaderProps) => {
  const navigate = useNavigate();
  // const [date, setDate] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const [dateValue, setDateValue] = useState("");
  const handleNavigate = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      navigate("/add-attendance");
    }
  };

  const handleSubButton = () => {
    if (subButtonAction) {
      subButtonAction();
    } else {
      navigate("/add-attendance");
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 pt-3 pb-3 border-none">
      <Header listTitle={headerTitle} hideHeader={true} />

      <div className="px-2 w-full py-1 bg-white rounded-md">
        <div className="flex w-full flex-wrap xl:flex-nowrap items-center justify-between gap-4 px-5 py-5">
          <div className="flex flex-wrap gap-4 w-full">
            {onSearch && (
              <div className="relative flex items-center w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                <Icon
                  icon="iconoir:search"
                  width="18"
                  height="18"
                  className="absolute left-1.5"
                  style={{ color: "#676767" }}
                />
                <input
                  type="text"
                  placeholder="Search name, id"
                  className="w-full py-2 pl-9 pr-4 text-gray-500 border rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            )}
            {onRole && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Role</option>
                  <option className="text-black">Doctor</option>
                  <option className="text-black">Nurse</option>
                  <option className="text-black">Staff</option>
                </select>
              </div>
            )}

            {onCategory && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Categories</option>
                  <option className="text-black">Doctor</option>
                  <option className="text-black">Nurse</option>
                  <option className="text-black">Staff</option>
                </select>
              </div>
            )}

            {onSubCategory && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Sub Category</option>
                  <option className="text-black">Doctor</option>
                  <option className="text-black">Nurse</option>
                  <option className="text-black">Staff</option>
                </select>
              </div>
            )}
            {onStatus && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Status</option>
                  <option>🟢 On Stock</option>
                  <option>🟡 Low In Stock</option>
                  <option>🔴 Out Of Stock</option>
                </select>
              </div>
            )}
            {onPatient && (
              <div className="relative flex items-center justify-between w-full sm:w-[13rem] md:w-[15rem] lg:w-[16rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1.5"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none pl-9 pr-10 appearance-none focus:ring-0">
                  <option className="text-black">In-Patient</option>
                  <option className="text-black">Out-Patient</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="absolute right-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {onDepartment && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Department</option>
                  <option className="text-black">Neurology</option>
                  <option className="text-black">Dermatology</option>
                  <option className="text-black">Psychiatry</option>
                  <option className="text-black">ENT</option>
                  <option className="text-black">Ophthalmology</option>
                </select>
              </div>
            )}

            {onShift && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Shift</option>
                </select>
              </div>
            )}

            {onDesignation && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Designation</option>
                  <option className="text-black">Out-Patient</option>
                </select>
              </div>
            )}

            {onToday && (
              <div className="relative flex items-center w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                <Icon
                  icon="iconoir:filter"
                  width="18"
                  height="18"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <input
                  type="text"
                  placeholder="Today"
                  className="w-full py-2 pl-8 pr-4 text-gray-500 border rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {onRating && (
              <div className="relative flex items-center w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]">
                <Icon
                  icon="iconoir:filter"
                  width="18"
                  height="18"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <input
                  type="text"
                  placeholder="Rating"
                  className="w-full py-2 pl-8 pr-4 text-gray-500 border rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {onSpecialist && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Specialist</option>
                  <option className="text-black">General Practitioner</option>
                  <option className="text-black">Cardiologist</option>
                  <option className="text-black">Pediatrician</option>
                  <option className="text-black">Gynecologist</option>
                  <option className="text-black">Orthopedic Surgeon</option>
                  <option className="text-black">Neurologist</option>
                  <option className="text-black">Dermatologist</option>
                  <option className="text-black">ENT Specialist</option>
                  <option className="text-black">Ophthalmologist</option>
                </select>
              </div>
            )}

            {onDietType && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Diet Type</option>
                  <option className="text-black">Doctor</option>
                  <option className="text-black">Nurse</option>
                  <option className="text-black">Staff</option>
                </select>
              </div>
            )}

            {onAllowance && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Allowance</option>
                  <option className="text-black">Doctor</option>
                  <option className="text-black">Nurse</option>
                  <option className="text-black">Staff</option>
                </select>
              </div>
            )}

            {onContactNumber && (
              <div className="relative flex items-center justify-between w-full sm:w-[13rem] md:w-[15rem] lg:w-[16rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1.5"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 text-gray-500 border rounded-md focus:outline-none pl-9 pr-10 appearance-none focus:ring-0">
                  <option className="text-black">Contact Number</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="absolute right-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {onDatePicker && (
              <div className="relative flex items-center w-full sm:w-[16rem] md:w-[18rem] lg:w-[20rem]">
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full py-2 pl-10 pr-4 text-gray-500 border rounded-md focus:outline-none focus:ring-0"
                />
              </div>
            )}

            {onDatePickerExp && (
              <div className="relative flex items-center w-full sm:w-[16rem] md:w-[18rem] lg:w-[20rem]">
                {/* Calendar Icon (left) */}
                <div
                  className="absolute left-3 text-gray-400 cursor-pointer"
                  onClick={() => inputRef.current?.showPicker()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div
                  className="absolute right-3 text-gray-400 cursor-pointer"
                  onClick={() => inputRef.current?.showPicker()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {dateValue === "" && (
                  <span className="absolute left-10 text-gray-400 pointer-events-none">
                    Payment Date
                  </span>
                )}

                <input
                  ref={inputRef}
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                  className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0
        ${dateValue === "" ? "text-transparent" : "text-gray-700"}`}
                />
              </div>
            )}

            {onSelect && (
              <div className="relative flex items-center justify-between w-full sm:w-[10rem] md:w-[12rem] lg:w-[14rem]">
                <select className="w-full px-2 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-0">
                  <option className="text-black">Select</option>
                  <option className="text-black">Active</option>
                  <option className="text-black">Absent</option>
                  <option className="text-black">Present</option>
                </select>
              </div>
            )}

            {onFilter && (
              <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1.5"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 pl-9 pr-10 text-gray-500 border rounded-md appearance-none focus:outline-none focus:ring-0">
                  <option className="text-black">Status</option>
                  <option className="text-black">Active</option>
                  <option className="text-black">Absent</option>
                  <option className="text-black">Present</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="absolute right-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {onFilterExpCategory && (
              <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1.5"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 pl-9 pr-10 text-gray-500 border rounded-md appearance-none focus:outline-none focus:ring-0">
                  <option className="text-black" disabled selected>
                    Category
                  </option>
                  <option className="text-black" value="">
                    Office Supplies
                  </option>
                  <option className="text-black" value="">
                    Travel Reimbursement
                  </option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="absolute right-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {onFilterExpStatus && (
              <div className="relative flex items-center justify-between w-full sm:w-[9rem] md:w-[10rem] lg:w-[12rem]">
                <Icon
                  icon="iconoir:filter"
                  width="20"
                  height="20"
                  className="absolute ml-1.5"
                  style={{ color: "#676767" }}
                />
                <select className="w-full px-8 py-2 pl-9 pr-10 text-gray-500 border rounded-md appearance-none focus:outline-none focus:ring-0">
                  <option hidden>status</option>
                  <option>🟢 On Stock</option>
                  <option>🟡 Low In Stock</option>
                  <option>🔴 Out Of Stock</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="absolute right-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m8 10.207l3.854-3.853l-.707-.708L8 8.793L4.854 5.646l-.708.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="flex ">
            {button && (
              <div className=" w-[10rem] flex p-2">
                <Button
                  title={buttonText}
                  onClick={handleNavigate}
                  className="shadow-lg w-full"
                />
              </div>
            )}

            {subButton && (
              <div className=" w-[10rem] flex p-2">
                <Button
                  variant="outline"
                  title={subButtonText}
                  onClick={handleSubButton}
                  className="text-black w-full bg-white font-semibold text-3xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
