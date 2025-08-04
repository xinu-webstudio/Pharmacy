import React from "react";

interface HeaderProps {
  title?: string;
  listTitle?: string;
  hideHeader?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title = "Pharmacy Management",
  listTitle,
  hideHeader = false,
  children,
}) => {
  if (hideHeader) {
    return null;
  }

  const displayTitle = listTitle || title;

  return (
    <div className="bg-white shadow-sm border-b border-grey-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-grey-900">{displayTitle}</h1>
        {children}
      </div>
    </div>
  );
};

export default Header;
