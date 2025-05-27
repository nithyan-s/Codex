import React from 'react';
import { Database, X } from 'lucide-react';

const ConnectModal = ({
  darkMode,
  showConnectModal,
  setShowConnectModal,
  dbCredentials,
  setDbCredentials,
  handleConnectDb,
  isConnecting
}) => {
  if (!showConnectModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl transition-all ${
        darkMode
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20'
          : 'bg-gradient-to-br from-white to-purple-50 border border-purple-200/50'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Connect Database
              </h3>
            </div>
            <button
              onClick={() => setShowConnectModal(false)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
              aria-label="Close connect modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {['url', 'name', 'username', 'password'].map((field, index) => {
              const labels = {
                url: 'Database URL',
                name: 'Database Name',
                username: 'Username',
                password: 'Password'
              };

              const type = field === 'password' ? 'password' : 'text';
              const placeholder = {
                url: 'jdbc:postgresql://localhost:5432/...',
                name: 'my_database',
                username: 'username',
                password: 'password'
              }[field];

              return (
                <div key={index}>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {labels[field]}
                  </label>
                  <input
                    type={type}
                    value={dbCredentials[field]}
                    onChange={(e) => setDbCredentials(prev => ({ ...prev, [field]: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder={placeholder}
                  />
                </div>
              );
            })}
          </div>

          {/* Footer Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowConnectModal(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleConnectDb}
              disabled={isConnecting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 transform hover:scale-105 shadow-lg"
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
