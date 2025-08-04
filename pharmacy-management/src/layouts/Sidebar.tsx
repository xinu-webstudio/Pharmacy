import { Icon } from "@iconify/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarDashboardRoutes,
  SidebarPharmacyRoutes,
  SidebarFinancialRoutes,
  SidebarReportsRoutes,
  SidebarSettingsRoutes,
} from "../routes";
import React from "react";
import { SidebarProps } from "../components/SidebarProps";

interface sidebarProps {
  miniSidebar: boolean;
  setMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SideBar = ({ miniSidebar, setMiniSidebar }: sidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const location = useLocation();

  const findActiveParentId = () => {
    const allRoutes = [
      ...SidebarDashboardRoutes.routes,
      ...SidebarPharmacyRoutes.routes,
      ...SidebarFinancialRoutes.routes,
      ...SidebarReportsRoutes.routes,
      ...SidebarSettingsRoutes.routes,
    ];

    // Check if current path matches any child route
    for (const route of allRoutes) {
      if (route.children) {
        const childMatch = route.children.find(
          (child) => child.path === location.pathname
        );
        if (childMatch) return route.id;
      }
    }

    // Check if current path matches any main route
    const mainRouteMatch = allRoutes.find(
      (route) => route.path === location.pathname
    );
    return mainRouteMatch?.id || 1; // Default to Dashboard (id:1)
  };

  const currentParentId = findActiveParentId();

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative" id="sidebar">
      <section
        className="absolute top-16 -right-2 text-xl z-[99999] bg-white p-1   "
        onClick={() => setMiniSidebar((prev) => !prev)}>
        <Icon icon={"mdi-light:unfold-more-vertical"} />
      </section>

      <section className="flex flex-col ">
        <div className=" h-[82px]">
          <section
            className={`flex place-items-center place-self-center  justify-between ${
              miniSidebar ? "h-[82px] w-[72px]" : "h-[180px] w-[180px] "
            }`}
            id="logo-top-bar">
            <img
              src="/companyLogo.png"
              alt="company-logo"
              className="object-contain h-[180px] "
              id="logo"
            />
            <Icon icon="flowbite:dots-vertical-outline" id="outline" />
          </section>
        </div>

        {/* Dashboard */}
        <SidebarProps
          SidebarRoutes={SidebarDashboardRoutes}
          currentParentId={currentParentId}
          expandedItems={expandedItems}
          miniSidebar={miniSidebar}
          setMiniSidebar={setMiniSidebar}
          toggleExpand={toggleExpand}
        />

        {/* Pharmacy Management */}
        <SidebarProps
          SidebarRoutes={SidebarPharmacyRoutes}
          currentParentId={currentParentId}
          expandedItems={expandedItems}
          miniSidebar={miniSidebar}
          setMiniSidebar={setMiniSidebar}
          toggleExpand={toggleExpand}
        />

        {/* Financial Operations */}
        <SidebarProps
          SidebarRoutes={SidebarFinancialRoutes}
          currentParentId={currentParentId}
          expandedItems={expandedItems}
          miniSidebar={miniSidebar}
          setMiniSidebar={setMiniSidebar}
          toggleExpand={toggleExpand}
        />

        {/* Reports */}
        <SidebarProps
          SidebarRoutes={SidebarReportsRoutes}
          currentParentId={currentParentId}
          expandedItems={expandedItems}
          miniSidebar={miniSidebar}
          setMiniSidebar={setMiniSidebar}
          toggleExpand={toggleExpand}
        />

        {/* Setting  */}

        <SidebarProps
          SidebarRoutes={SidebarSettingsRoutes}
          currentParentId={currentParentId}
          expandedItems={expandedItems}
          miniSidebar={miniSidebar}
          setMiniSidebar={setMiniSidebar}
          toggleExpand={toggleExpand}
        />
      </section>
    </div>
  );
};

export default SideBar;
