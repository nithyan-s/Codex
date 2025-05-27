import React from 'react';
import { Code, BarChart3 } from 'lucide-react';

const MessageActions = ({
  darkMode,
  message,
  showSqlToggle,
  toggleSqlQuery,
  generateGraph
}) => {
  if (!message.sqlQuery) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        onClick={() => toggleSqlQuery(message.id)}
        className={`flex items-center space-x-2 text-xs px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
          message.type === 'user'
            ? 'bg-white/20 hover:bg-white/30 text-white'
            : darkMode
              ? 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30'
              : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-200'
        }`}
      >
        <Code className="w-3 h-3" />
        <span>{showSqlToggle[message.id] ? 'Hide' : 'Show'} SQL</span>
      </button>

      <button
        onClick={() => generateGraph(message.id, message.sqlQuery)}
        className={`flex items-center space-x-2 text-xs px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
          message.type === 'user'
            ? 'bg-white/20 hover:bg-white/30 text-white'
            : darkMode
              ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 text-pink-300 border border-pink-500/30'
              : 'bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-700 border border-pink-200'
        }`}
      >
        <BarChart3 className="w-3 h-3" />
        <span>Generate Graph</span>
      </button>
    </div>
  );
};

export default MessageActions;
