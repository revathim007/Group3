import React from 'react';
import { LineChart } from 'lucide-react';

const Forecast = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Forecast</h1>
      </header>
      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-purple-50 p-6 rounded-full mb-6 text-purple-600">
          <LineChart size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">your forcast</h2>
        <p className="text-gray-500 max-w-md">
          Advanced AI-driven market predictions and future stock trends.
        </p>
      </div>
    </div>
  );
};

export default Forecast;
