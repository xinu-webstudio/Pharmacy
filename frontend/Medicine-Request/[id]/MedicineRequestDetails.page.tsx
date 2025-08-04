import React from 'react';
import { useParams } from 'react-router-dom';

export const MedicineRequestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-grey-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-grey-900 mb-6">
          Medicine Request Details
        </h1>
        <div className="card p-6">
          <p className="text-grey-600 mb-4">
            Viewing details for medicine request ID: <span className="font-semibold">{id}</span>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              🚧 This page is under development. Medicine request details will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
