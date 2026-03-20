import React from 'react';
import { Briefcase } from 'lucide-react';

const Portfolio = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Portfolio</h1>
      </header>
      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-blue-50 p-6 rounded-full mb-6 text-blue-600">
          <Briefcase size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">you portfolios</h2>
        <p className="text-gray-500 max-w-md">
          Manage and track all your investment portfolios in one place.
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
