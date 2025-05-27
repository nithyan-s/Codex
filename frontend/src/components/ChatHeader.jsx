import React from 'react';
import { Bot, Moon, Sun, Plus } from 'lucide-react';

const ChatHeader = ({ darkMode, setDarkMode, setShowConnectModal, connectedDb }) => {
  return (
    <div className={`backdrop-blur-xl border-b transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/70 border-purple-500/20 shadow-lg shadow-purple-500/10'
        : 'bg-white/70 border-purple-200/50 shadow-lg shadow-purple-200/20'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Data Analytics Assistant
            </h1>
            <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
              {connectedDb ? `Connected to ${connectedDb}` : 'Ask questions about your database in natural language'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowConnectModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Connect</span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-400/25'
                : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/25'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
