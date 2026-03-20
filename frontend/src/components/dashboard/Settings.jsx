import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Eye, Smartphone, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Settings</h1>
      </header>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8">
        <div className="space-y-8">
          {/* General Section */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <SettingsIcon className="text-green-600 mr-2" size={20} />
              General Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg text-blue-500 shadow-sm">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive alerts about stock changes</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg text-purple-500 shadow-sm">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Language</p>
                    <p className="text-sm text-gray-500">English (United States)</p>
                  </div>
                </div>
                <button className="text-green-600 font-bold text-sm hover:underline">Change</button>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="text-green-600 mr-2" size={20} />
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg text-red-500 shadow-sm">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                </div>
                <button className="text-green-600 font-bold text-sm hover:underline">Update</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-2 rounded-lg text-orange-500 shadow-sm">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
