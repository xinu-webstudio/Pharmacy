import React, { useState } from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`px-6 py-3 text-lg font-medium transition-colors duration-200 relative ${
        isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-t-md" />
      )}
    </button>
  );
};

interface TabsProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  showButton?: boolean;
  buttonAction?: () => void;
  buttonTitle?: string;
}

export const CustomTabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  showButton = false,
  buttonAction,
  buttonTitle,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full mt-2 pt-3 ">
      <div className="flex place-items-center justify-between">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => handleTabClick(tab)}
            />
          ))}
        </div>

        {showButton && (
          <button
            className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-teal-700"
            onClick={buttonAction}
          >
            {buttonTitle}
          </button>
        )}
      </div>
    </div>
  );
};
