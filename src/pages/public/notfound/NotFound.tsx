import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl font-medium text-gray-700 mt-2">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-4">
          The page you are looking for might have been moved or doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition duration-300"
          >
            Go back to Stationery's P homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
