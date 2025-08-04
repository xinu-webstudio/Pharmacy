import { Link } from "react-router-dom";
import { Text } from "./Text";
import { Icon } from "@iconify/react/dist/iconify.js";

interface _sidebarPropTypes {
  toggleExpand?: (id: number) => void;
  SidebarRoutes: {
    title: string;
    routes: {
      path: string;
      id: number;
      icon: string;
      title: string;
      children?: {
        path: string;
        id: number;
        title: string;
      }[];
    }[];
  };
  miniSidebar: boolean;
  expandedItems: number[];
  currentParentId: number;
  setMiniSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarProps = ({
  SidebarRoutes,
  toggleExpand,
  miniSidebar,
  currentParentId,
  expandedItems,
  setMiniSidebar,
}: _sidebarPropTypes) => {
  return (
    <section
      className={`flex flex-col pt-6 ${
        !miniSidebar ? "items-center" : ""
      }  gap-2`}
      id="main-menu">
      <div
        className={`${
          !miniSidebar ? "px-3 " : "px-6"
        } flex place-items-center gap-3`}>
        <section className="bg-white h-[.5px] w-[40%] flex-1" />

        <section className="">
          <Text variant="white" size="body-xs-mid">
            {SidebarRoutes.title}
          </Text>
        </section>
        <section className="bg-white flex-1 h-[.5px] w-[40%]" />
      </div>

      <div
        className="flex flex-col  gap-2"
        id="menu"
        onClick={() => setMiniSidebar(true)}>
        {SidebarRoutes.routes.map((route) => (
          <div key={route.id}>
            <Link
              to={route.path}
              className={`flex place-items-center ${
                miniSidebar ? "px-6" : "px-3"
              }   py-3 gap-5 justify-between hover:bg-bg hover:rounded-lg`}
              onClick={() => {
                if (route.children) toggleExpand?.(route.id);
              }}>
              <section className="flex place-items-center gap-3">
                <Icon
                  icon={route.icon}
                  color={`${currentParentId === route.id ? "white" : "white"}`}
                />

                {miniSidebar && (
                  <p
                    className={`${
                      currentParentId === route.id
                        ? "text-white"
                        : "text-gray-300"
                    }`}>
                    {route.title}
                  </p>
                )}
              </section>
              {miniSidebar && (
                <div>
                  {route.children && (
                    <Icon icon="oui:arrow-down" color="white" fontSize={16} />
                  )}
                </div>
              )}
            </Link>
            {miniSidebar && (
              <div>
                {route.children && expandedItems.includes(route.id) && (
                  <div className="ml-8 mt-1 flex flex-col relative">
                    {route.children.map((child) => (
                      <Link
                        to={child.path}
                        key={child.id}
                        className="flex place-items-center py-1  pl-4 relative  rounded-lg">
                        {/* Dot with horizontal line */}
                        <div className="absolute left-[0.1rem] top-1/2 -translate-y-1/2">
                          <div
                            className={`h-[.5px] w-2  ${
                              location.pathname === child.path
                                ? "bg-white"
                                : "bg-gray-50"
                            } `}
                          />
                        </div>

                        <Text
                          variant={
                            location.pathname === child.path
                              ? "primary-blue"
                              : "fadish-black"
                          }
                          size="body-sm-default"
                          className={` py-2 px-3  rounded ${
                            location.pathname === child.path
                              ? "text-white"
                              : "text-gray-300"
                          }`}>
                          {child.title}
                        </Text>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
