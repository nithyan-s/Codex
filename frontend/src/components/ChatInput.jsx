import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({
  darkMode,
  inputValue,
  setInputValue,
  isLoading,
  handleSendMessage,
  handleKeyPress,
  inputRef,
  connectedDb
}) => {
  return (
    <div className={`border-t p-6 backdrop-blur-xl ${
      darkMode ? 'border-purple-500/20 bg-gray-800/50' : 'border-purple-200/50 bg-white/50'
    }`}>
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your data... (e.g., 'Show sales trends for last 6 months')"
            className={`w-full px-6 py-4 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg backdrop-blur-sm ${
              darkMode
                ? 'bg-gray-700/80 text-white placeholder-gray-400 border border-purple-500/20'
                : 'bg-white/80 text-gray-900 placeholder-gray-500 border border-purple-200/50'
            }`}
            rows={1}
            style={{ minHeight: '60px', maxHeight: '120px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className={`mt-3 text-xs flex items-center justify-between ${
        darkMode ? 'text-purple-300' : 'text-purple-600'
      }`}>
        <span>Press Enter to send • Shift+Enter for new line</span>
        {connectedDb && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to {connectedDb}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
