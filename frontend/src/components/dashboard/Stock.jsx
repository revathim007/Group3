import React from 'react';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stockData = [
  { name: '09:00', price: 150 },
  { name: '10:00', price: 155 },
  { name: '11:00', price: 153 },
  { name: '12:00', price: 158 },
  { name: '13:00', price: 162 },
  { name: '14:00', price: 160 },
  { name: '15:00', price: 165 },
  { name: '16:00', price: 168 },
];

const Stock = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Stocks</h1>
      </header>

      <div className="flex flex-col space-y-8">
        <div className="w-full max-w-md relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for stocks (e.g. NVDA, GOOGL)..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Market Performance</h3>
                <p className="text-sm text-gray-500">Real-time tracking of selected assets</p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm font-bold">+2.45%</span>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis hide={true} domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Top Gainer</h4>
              <div className="flex justify-between items-center">
                <span className="font-black text-xl text-gray-900">NVIDIA</span>
                <span className="text-green-600 font-bold flex items-center"><ArrowUpRight size={16} className="mr-1" />+5.8%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Top Loser</h4>
              <div className="flex justify-between items-center">
                <span className="font-black text-xl text-gray-900">TESLA</span>
                <span className="text-red-600 font-bold flex items-center"><ArrowDownRight size={16} className="mr-1" />-3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
