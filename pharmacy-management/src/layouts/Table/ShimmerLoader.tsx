import { useEffect, useState } from "react";

const DataTableWithShimmer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const LoadingRow = () => (
    <div className="flex items-center p-4 space-x-4 animate-pulse bg-white">
      <div className="w-60 h-6  bg-gray-200 rounded"></div>
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-40 h-6 bg-gray-200 rounded"></div>
      </div>
      <div className="w-60 h-6 bg-gray-200 rounded "></div>
      <div className="w-20 h-6 bg-gray-200 rounded"></div>
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  const DataRow = ({ title, name, email, number }: {
    title: string;
    name: string;
    email: string;
    number: string;
  }) => (
    <div className="flex items-center p-4 space-x-4 bg-white hover:bg-gray-50">
      <div className="w-14 text-gray-600">{title}</div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="font-medium">{name}</div>
      </div>
      <div className="flex-1 text-gray-600">{email}</div>
      <div className="w-20 text-gray-600">{number}</div>
      <div className="flex space-x-2">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      {isLoading ? (
        <div className="divide-y  divide-gray-200">
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
          <LoadingRow />
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          <DataRow
            title="Lorem maxime ut alia"
            name="August Whitley"
            email="meqi@mailinator.com"
            number="94"
          />
          <DataRow
            title="Provident saepe com"
            name="Pearl Newman"
            email="qoxyz@mailinator.com"
            number="9809878977"
          />
          <DataRow
            title="Dolore sit amet do"
            name="Jennifer Trevino"
            email="zizaqusoz@mailinator.com"
            number="53"
          />
        </div>
      )}
    </div>
  );
};

export default DataTableWithShimmer;
