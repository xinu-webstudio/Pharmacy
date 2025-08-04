import React, { JSX } from "react";
import Breadcrumbs from "./Breadcrumb";

interface HeaderProps {
  onSearch?: (value: string) => void;
  onAddClick?: () => void;
  title?: string;
  listTitle?: string;
  custombuttontitle?: string;
  hideHeader?: boolean;
  FilterSection?: JSX.ElementType;
  breadcrumbs?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  onAddClick,
  title,
  listTitle,
  hideHeader = false,
  FilterSection,
  breadcrumbs = true,
  custombuttontitle,
}) => {
  return (
    <>
      {listTitle && (
        <div className="flex items-center justify-between py-4">
          <h2
            className={`text-2xl font-bold text-gray-700 ${
              breadcrumbs && "ml-4"
            }`}
          >
            {listTitle}
          </h2>
          <div>{breadcrumbs && <Breadcrumbs />}</div>
        </div>
      )}
      {!hideHeader && (
        <div className="flex items-center justify-between w-full gap-4 p-4 bg-white rounded-lg shadow-sm">
          {onSearch && (
            <div className="relative flex items-center w-full max-w-xl">
              <input
                type="text"
                placeholder={"Search name id"}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {FilterSection && <FilterSection />}

          {(title || custombuttontitle) && (
            <button
              className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-teal-700"
              onClick={onAddClick}
            >
              {custombuttontitle || `Add ${title}`}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
