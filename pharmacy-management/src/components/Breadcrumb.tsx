import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const formatSegment = (segment: string) => {
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex items-center space-x-2 text-gray-500 text-sm">
      <Link to="/" className="flex items-center space-x-1 hover:text-gray-700">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0003 2.23145C9.23894 2.23145 8.49211 2.44007 7.84095 2.83466L3.67428 5.35966C3.06157 5.73095 2.55493 6.25397 2.20331 6.87819C1.8517 7.50241 1.66698 8.20675 1.66699 8.92318V14.1665C1.66699 15.2716 2.10598 16.3314 2.88738 17.1128C3.66878 17.8942 4.72859 18.3332 5.83366 18.3332H14.167C15.2721 18.3332 16.3319 17.8942 17.1133 17.1128C17.8947 16.3314 18.3337 15.2716 18.3337 14.1665V8.92235C18.3335 8.20608 18.1487 7.50176 17.7971 6.87774C17.4455 6.25372 16.9389 5.73087 16.3264 5.35966L12.1597 2.83466C11.5086 2.44008 10.7617 2.23145 10.0003 2.23145ZM8.70471 4.26003C9.0954 4.02328 9.5435 3.89811 10.0003 3.89811C10.4572 3.89811 10.9052 4.02328 11.2959 4.26003L15.4626 6.78503C15.8301 7.00776 16.1341 7.32147 16.345 7.69589C16.556 8.07025 16.6669 8.49266 16.667 8.92235V14.1665C16.667 14.8296 16.4036 15.4654 15.9348 15.9343C15.4659 16.4031 14.83 16.6665 14.167 16.6665H13.3337V14.1665C13.3337 13.2825 12.9825 12.4346 12.3573 11.8095C11.7322 11.1844 10.8844 10.8332 10.0003 10.8332C9.11627 10.8332 8.26842 11.1844 7.6433 11.8095C7.01818 12.4346 6.66699 13.2825 6.66699 14.1665V16.6665H5.83366C5.17062 16.6665 4.53473 16.4031 4.06589 15.9343C3.59705 15.4654 3.33366 14.8296 3.33366 14.1665V8.92318C3.33365 8.49332 3.44448 8.07069 3.65545 7.69616C3.86642 7.32163 4.1704 7.00782 4.53803 6.78504L8.70471 4.26003ZM11.1788 12.988C11.4914 13.3006 11.667 13.7245 11.667 14.1665V16.6665H8.33366V14.1665C8.33366 13.7245 8.50925 13.3006 8.82181 12.988C9.13437 12.6754 9.5583 12.4999 10.0003 12.4999C10.4424 12.4999 10.8663 12.6754 11.1788 12.988Z"
            fill="#5C5E64"
          />
        </svg>
        <span>Dashboard</span>

      </Link>
 
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        return (
          <React.Fragment key={path}>
            <span>{">"}</span>
            {isLast ? (
              <span className="text-teal-500 ">{formatSegment(segment)}</span>
            ) : (
              <Link to={path} className="hover:text-gray-700">
                {formatSegment(segment)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default Breadcrumbs;
