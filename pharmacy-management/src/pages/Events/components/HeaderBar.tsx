import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BARPROPS {
  button: string;
  date?: boolean;
  navigateTo?: string;
}
const HeaderBar: React.FC<BARPROPS> = ({ button, date, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 bg-white rounded-md px-4 py-5 w-full">
      <div className="flex gap-3 w-4/5">
        <div className="border-[#F0F2F4] border-[2px] rounded-lg w-[30%] bg-white flex items-center py-2 px-2 text-[#7c7c7c]">
          <i>
            <Icon icon="iconamoon:search-thin" height={25} width={25} />
          </i>
          <input
            type="text"
            placeholder="Search name, id"
            className="w-full rounded-lg focus:outline-none pl-2 text-sm"
          />
        </div>
        <div className="border-[#F0F2F4] border-[2px] rounded-lg w-1/4 bg-white flex items-center py-2 px-2 text-[#7c7c7c]">
          <i>
            <Icon icon="ph:funnel-thin" height={25} width={25} />
          </i>
          <input
            type="text"
            placeholder="Department"
            className="w-full rounded-lg focus:outline-none pl-2 text-sm"
          />
        </div>
        {date && (
          <div className="border-[#F0F2F4] border-[2px] rounded-lg w-1/4 bg-white flex items-center py-2 px-2 text-[#7c7c7c]">
            <i>
              <Icon icon="ph:funnel-thin" height={25} width={25} />
            </i>
            <input
              type="date"
              placeholder="Status"
              className="w-full rounded-lg focus:outline-none pl-2 text-sm"
            />
          </div>
        )}
        <div className="border-[#F0F2F4] border-[2px] rounded-lg w-1/4 bg-white flex items-center py-2 px-2 text-[#7c7c7c]">
          <i>
            <Icon icon="ph:funnel-thin" height={25} width={25} />
          </i>
          <input
            type="text"
            placeholder="Status"
            className="w-full rounded-lg focus:outline-none pl-2 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center w-1/5 justify-end">
        <button
          onClick={() => {
            navigate(`${navigateTo}`);
          }}
          className="p-3 bg-[#13898E] text-white font-medium rounded-md"
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
