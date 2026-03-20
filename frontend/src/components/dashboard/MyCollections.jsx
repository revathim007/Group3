import React from 'react';
import { Bookmark } from 'lucide-react';

const MyCollections = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">My Collections</h1>
      </header>
      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-green-50 p-6 rounded-full mb-6 text-green-600">
          <Bookmark size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">your collections</h2>
        <p className="text-gray-500 max-w-md">
          View all your saved stocks, portfolios, and market analysis collections.
        </p>
      </div>
    </div>
  );
};

export default MyCollections;
