import React from 'react';
import { User, Bot, Loader } from 'lucide-react';
import MessageActions from './MessageActions.jsx';

const ChatMessage = ({
  message,
  darkMode,
  showSqlToggle,
  toggleSqlQuery,
  generateGraph,
  graphData
}) => {
  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 ml-4'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 mr-4'
        }`}>
          {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </div>

        <div className={`rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : darkMode
              ? 'bg-gray-800/80 text-gray-100 border border-purple-500/20'
              : 'bg-white/80 text-gray-900 border border-purple-200/50'
        }`}>
          <div className="text-sm leading-relaxed">
            {message.content}
          </div>

          {message.imageUrl && (
            <div className="mt-4">
              <img
                src={message.imageUrl}
                alt="Data visualization"
                className="rounded-xl max-w-full h-auto shadow-lg"
              />
            </div>
          )}

          {graphData[message.id] && (
            <div className="mt-4">
              {typeof graphData[message.id] === 'string' ? (
                <img
                  src={graphData[message.id]}
                  alt="Generated graph"
                  className="rounded-xl max-w-full h-auto shadow-lg"
                />
              ) : (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600">Graph visualization would appear here</p>
                </div>
              )}
            </div>
          )}

          <MessageActions
            darkMode={darkMode}
            message={message}
            showSqlToggle={showSqlToggle}
            toggleSqlQuery={toggleSqlQuery}
            generateGraph={generateGraph}
          />

          {showSqlToggle[message.id] && message.sqlQuery && (
            <div className={`mt-3 p-3 rounded-lg text-xs font-mono transition-all ${
              darkMode
                ? 'bg-gray-900/50 text-green-400 border border-green-500/20'
                : 'bg-gray-50 text-gray-800 border border-gray-200'
            }`}>
              {message.sqlQuery}
            </div>
          )}

          <div className={`text-xs mt-2 ${
            message.type === 'user'
              ? 'text-blue-100'
              : darkMode
                ? 'text-gray-400'
                : 'text-gray-500'
          }`}>
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
