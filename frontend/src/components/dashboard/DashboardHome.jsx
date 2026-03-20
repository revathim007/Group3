import React from 'react';
import { Briefcase } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Net worth</span>
            <span className="text-2xl font-black text-gray-900">$124,500.00</span>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Portfolios</span>
            <span className="text-2xl font-black text-gray-900">12</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Briefcase className="text-green-600 mr-2" size={24} />
              Create Portfolio
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Portfolio Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Retirement Fund" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition-all mt-4"
              >
                Done
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to your Dashboard</h3>
            <p className="text-gray-500 max-w-md">
              Here you can see an overview of all your financial activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
