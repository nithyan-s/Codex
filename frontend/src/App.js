// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Sun, Moon, Code, User, Bot, Loader, Plus, Database, X, BarChart3, TrendingUp } from 'lucide-react';

// // Custom CSS for animations
// const styles = `
//   @keyframes fade-in {
//     from { opacity: 0; transform: translateY(20px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
  
//   @keyframes typing {
//     0%, 50% { opacity: 1; }
//     51%, 100% { opacity: 0.5; }
//   }
  
//   @keyframes loading-bar {
//     0% { transform: translateX(-100%); }
//     100% { transform: translateX(100%); }
//   }
  
//   @keyframes float {
//     0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
//     50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
//   }
  
//   .animate-fade-in { animation: fade-in 1s ease-out; }
//   .animate-typing { animation: typing 1s infinite; }
//   .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
//   .animate-float { animation: float 4s ease-in-out infinite; }
// `;

// const DataAnalyticsChatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       content: 'Hi! I\'m your data analytics assistant. Ask me anything about your database - like "Show sales trends" or "What are the top products?"',
//       timestamp: new Date(),
//       sqlQuery: null
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [showSqlToggle, setShowSqlToggle] = useState({});
//   const [showConnectModal, setShowConnectModal] = useState(false);
//   const [dbCredentials, setDbCredentials] = useState({
//     url: '',
//     name: '',
//     username: '',
//     password: ''
//   });
//   const [connectedDb, setConnectedDb] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [graphData, setGraphData] = useState({});
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Initial loading animation
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsInitialLoading(false);
//     }, 3000); // 3 second loading animation

//     return () => clearTimeout(timer);
//   }, []);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: inputValue,
//       timestamp: new Date(),
//       sqlQuery: null
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsLoading(true);

//     try {
//       // API call to backend
//       const response = await fetch('http://localhost:8000/ask', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: inputValue }),
//       });

//       const data = await response.json();

//       const botMessage = {
//         id: Date.now() + 1,
//         type: 'bot',
//         content: data.response || 'Sorry, I couldn\'t process that request.',
//         timestamp: new Date(),
//         sqlQuery: data.sql_query || null,
//         imageUrl: data.image_url || null
//       };

//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage = {
//         id: Date.now() + 1,
//         type: 'bot',
//         content: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
//         timestamp: new Date(),
//         sqlQuery: null
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const toggleSqlQuery = (messageId) => {
//     setShowSqlToggle(prev => ({
//       ...prev,
//       [messageId]: !prev[messageId]
//     }));
//   };

//   const handleConnectDb = async () => {
//     setIsConnecting(true);
//     try {
//       // Simulate API call to connect to database
//       const response = await fetch('http://localhost:8000/connect-db', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dbCredentials),
//       });

//       if (response.ok) {
//         setConnectedDb(dbCredentials.name || 'Database');
//         setShowConnectModal(false);
//         setDbCredentials({
//           url: '',
//           name: '',
//           username: '',
//           password: ''
//         });
//       }
//     } catch (error) {
//       console.error('Database connection failed:', error);
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const generateGraph = async (messageId, sqlQuery) => {
//     try {
//       const response = await fetch('http://localhost:8000/generate-graph', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sql_query: sqlQuery }),
//       });

//       const data = await response.json();
//       setGraphData(prev => ({
//         ...prev,
//         [messageId]: data.graph_url || data.graph_data
//       }));
//     } catch (error) {
//       console.error('Graph generation failed:', error);
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     return timestamp.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   return (
//   <>
//     {/* Inject custom styles */}
//     <style>{styles}</style>

//     {/* Initial Loading Animation */}
//     {isInitialLoading && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//         <div className="flex flex-col items-center space-y-8">
//           {/* Animated Logo */}
//           <div className="relative">
//             <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
//               <Bot className="w-10 h-10 text-white" />
//             </div>

//             {/* Orbiting Circles */}
//             <div className="absolute inset-0 animate-spin">
//               <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
//             </div>
//             <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
//               <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
//             </div>
//             <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
//               <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
//             </div>
//           </div>

//           {/* Loading Text */}
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">
//               Data Analytics Assistant
//             </h1>
//             <div className="flex items-center space-x-1 text-purple-300">
//               <span className="animate-typing">Initializing</span>
//               <div className="flex space-x-1">
//                 <div className="w-1 h-1 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                 <div className="w-1 h-1 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                 <div className="w-1 h-1 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
//             <div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full animate-loading-bar"></div>
//           </div>
//         </div>

//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
//           <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
//           <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-float opacity-50" style={{ animationDelay: '0.5s' }}></div>
//         </div>
//       </div>
//     )}

//     {/* Main Chat Interface */}
//     <div className={`min-h-screen transition-all duration-500 ${isInitialLoading ? 'opacity-0' : 'opacity-100'} ${
//       darkMode
//         ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
//         : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
//     }`}>

//       {/* Header */}
//       <div className={`backdrop-blur-xl border-b transition-all duration-300 ${
//         darkMode
//           ? 'bg-gray-800/70 border-purple-500/20 shadow-lg shadow-purple-500/10'
//           : 'bg-white/70 border-purple-200/50 shadow-lg shadow-purple-200/20'
//       }`}>
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
//               <Bot className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Data Analytics Assistant
//               </h1>
//               <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
//                 {connectedDb ? `Connected to ${connectedDb}` : 'Ask questions about your database in natural language'}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowConnectModal(true)}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
//                 darkMode
//                   ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40'
//                   : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
//               }`}
//             >
//               <Plus className="w-4 h-4" />
//               <span>Connect</span>
//             </button>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
//                 darkMode
//                   ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-400/25'
//                   : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/25'
//               }`}
//             >
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Database Connection Modal */}
//       {showConnectModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
//           <div className={`w-full max-w-md rounded-2xl shadow-2xl transition-all ${
//             darkMode
//               ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20'
//               : 'bg-gradient-to-br from-white to-purple-50 border border-purple-200/50'
//           }`}>
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <Database className="w-6 h-6 text-purple-600" />
//                   <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Connect Database
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowConnectModal(false)}
//                   className={`p-2 rounded-lg transition-colors ${
//                     darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//                   }`}
//                   aria-label="Close connect modal"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className={block text-sm font-medium mb-2 ${
//                     darkMode ? 'text-gray-300' : 'text-gray-700'
//                   }}>
//                     Database URL
//                   </label>
//                   <input
//                     type="text"
//                     value={dbCredentials.url}
//                     onChange={(e) => setDbCredentials(prev => ({...prev, url: e.target.value}))}
//                     className={w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                       darkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                     }}
//                     placeholder="jdbc:postgresql://localhost:5432/..."
//                   />
//                 </div>
                
//                 <div>
//                   <label className={block text-sm font-medium mb-2 ${
//                     darkMode ? 'text-gray-300' : 'text-gray-700'
//                   }}>
//                     Database Name
//                   </label>
//                   <input
//                     type="text"
//                     value={dbCredentials.name}
//                     onChange={(e) => setDbCredentials(prev => ({...prev, name: e.target.value}))}
//                     className={w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                       darkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                     }}
//                     placeholder="my_database"
//                   />
//                 </div>
                
//                 <div>
//                   <label className={block text-sm font-medium mb-2 ${
//                     darkMode ? 'text-gray-300' : 'text-gray-700'
//                   }}>
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     value={dbCredentials.username}
//                     onChange={(e) => setDbCredentials(prev => ({...prev, username: e.target.value}))}
//                     className={w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                       darkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                     }}
//                     placeholder="username"
//                   />
//                 </div>
                
//                 <div>
//                   <label className={block text-sm font-medium mb-2 ${
//                     darkMode ? 'text-gray-300' : 'text-gray-700'
//                   }}>
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     value={dbCredentials.password}
//                     onChange={(e) => setDbCredentials(prev => ({...prev, password: e.target.value}))}
//                     className={w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                       darkMode 
//                         ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                         : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
//                     }}
//                     placeholder="password"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex space-x-3 mt-6">
//                 <button
//                   onClick={() => setShowConnectModal(false)}
//                   className={flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
//                     darkMode 
//                       ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConnectDb}
//                   disabled={isConnecting}
//                   className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 transform hover:scale-105 shadow-lg"
//                 >
//                   {isConnecting ? 'Connecting...' : 'Connect'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Chat Container */}
//       <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-100px)]">
//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}}
//             >
//               <div className={flex max-w-[85%] ${
//                 message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
//               }}>
//                 {/* Avatar */}
//                 <div className={flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
//                   message.type === 'user' 
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-600 ml-4' 
//                     : 'bg-gradient-to-r from-purple-600 to-pink-600 mr-4'
//                 }}>
//                   {message.type === 'user' ? (
//                     <User className="w-5 h-5 text-white" />
//                   ) : (
//                     <Bot className="w-5 h-5 text-white" />
//                   )}
//                 </div>

//                 {/* Message Content */}
//                 <div className={rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
//                   message.type === 'user'
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
//                     : darkMode
//                       ? 'bg-gray-800/80 text-gray-100 border border-purple-500/20'
//                       : 'bg-white/80 text-gray-900 border border-purple-200/50'
//                 }}>
//                   <div className="text-sm leading-relaxed">
//                     {message.content}
//                   </div>

//                   {/* Image Display */}
//                   {message.imageUrl && (
//                     <div className="mt-4">
//                       <img 
//                         src={message.imageUrl} 
//                         alt="Data visualization"
//                         className="rounded-xl max-w-full h-auto shadow-lg"
//                       />
//                     </div>
//                   )}

//                   {/* Graph Display */}
//                   {graphData[message.id] && (
//                     <div className="mt-4">
//                       {typeof graphData[message.id] === 'string' ? (
//                         <img 
//                           src={graphData[message.id]} 
//                           alt="Generated graph"
//                           className="rounded-xl max-w-full h-auto shadow-lg"
//                         />
//                       ) : (
//                         <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
//                           <p className="text-sm text-gray-600">Graph visualization would appear here</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//               {/* Action Buttons */}
//               {message.sqlQuery && (
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       <button
//                         onClick={() => toggleSqlQuery(message.id)}
//                         className={flex items-center space-x-2 text-xs px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
//                           message.type === 'user'
//                             ? 'bg-white/20 hover:bg-white/30 text-white'
//                             : darkMode
//                               ? 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30'
//                               : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-200'
//                         }}
//                       >
//                         <Code className="w-3 h-3" />
//                         <span>{showSqlToggle[message.id] ? 'Hide' : 'Show'} SQL</span>
//                       </button>
                      
//                       <button
//                         onClick={() => generateGraph(message.id, message.sqlQuery)}
//                         className={flex items-center space-x-2 text-xs px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
//                           message.type === 'user'
//                             ? 'bg-white/20 hover:bg-white/30 text-white'
//                             : darkMode
//                               ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/30 hover:to-purple-600/30 text-pink-300 border border-pink-500/30'
//                               : 'bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-700 border border-pink-200'
//                         }}
//                       >
//                         <BarChart3 className="w-3 h-3" />
//                         <span>Generate Graph</span>
//                       </button>
//                     </div>
//                   )}
                      
//                   {showSqlToggle[message.id] && message.sqlQuery && (
//                     <div className={mt-3 p-3 rounded-lg text-xs font-mono transition-all ${
//                       darkMode
//                         ? 'bg-gray-900/50 text-green-400 border border-green-500/20'
//                         : 'bg-gray-50 text-gray-800 border border-gray-200'
//                     }}>
//                       {message.sqlQuery}
//                     </div>
//                   )}

//                   <div className={text-xs mt-2 ${
//                     message.type === 'user'
//                       ? 'text-blue-100'
//                       : darkMode
//                         ? 'text-gray-400'
//                         : 'text-gray-500'
//                   }}>
//                     {formatTimestamp(message.timestamp)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {/* Loading Indicator */}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="flex">
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mr-4 flex items-center justify-center shadow-lg">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className={rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm ${
//                   darkMode ? 'bg-gray-800/80 border border-purple-500/20' : 'bg-white/80 border border-purple-200/50'
//                 }}>
//                   <div className="flex items-center space-x-3">
//                     <Loader className="w-5 h-5 animate-spin text-purple-600" />
//                     <span className={text-sm ${
//                       darkMode ? 'text-gray-300' : 'text-gray-600'
//                     }}>
//                       Analyzing your query...
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className={border-t p-6 backdrop-blur-xl ${
//           darkMode 
//             ? 'border-purple-500/20 bg-gray-800/50' 
//             : 'border-purple-200/50 bg-white/50'
//         }}>
//           <div className="flex space-x-4">
//             <div className="flex-1 relative">
//               <textarea
//                 ref={inputRef}
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask about your data... (e.g., 'Show sales trends for last 6 months')"
//                 className={w-full px-6 py-4 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg backdrop-blur-sm ${
//                   darkMode
//                     ? 'bg-gray-700/80 text-white placeholder-gray-400 border border-purple-500/20'
//                     : 'bg-white/80 text-gray-900 placeholder-gray-500 border border-purple-200/50'
//                 }}
//                 rows={1}
//                 style={{ minHeight: '60px', maxHeight: '120px' }}
//                 onInput={(e) => {
//                   e.target.style.height = 'auto';
//                   e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
//                 }}
//               />
//             </div>
//             <button
//               onClick={handleSendMessage}
//               disabled={!inputValue.trim() || isLoading}
//               className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className={mt-3 text-xs flex items-center justify-between ${
//             darkMode ? 'text-purple-300' : 'text-purple-600'
//           }}>
//             <span>Press Enter to send • Shift+Enter for new line</span>
//             {connectedDb && (
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span>Connected to {connectedDb}</span>
//               </div>
//             )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div> {/* ← Missing closing tag added here for Main Chat Interface */}

//   </>
// );
// }

// export default DataAnalyticsChatbot;

import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import ChatInput from './components/ChatInput.jsx';
import ConnectModal from './components/ConnectModal.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import animations from './styles/animation';
import useAutoScroll from './hooks/useAutoScroll';

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your data analytics assistant. Ask me anything about your database - like "Show sales trends" or "What are the top products?"',
      timestamp: new Date(),
      sqlQuery: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSqlToggle, setShowSqlToggle] = useState({});
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dbCredentials, setDbCredentials] = useState({
    url: '',
    name: '',
    username: '',
    password: ''
  });
  const [connectedDb, setConnectedDb] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [graphData, setGraphData] = useState({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const inputRef = useRef(null);
  const messagesEndRef = useAutoScroll([messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      sqlQuery: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue })
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'Sorry, I couldn\'t process that request.',
        timestamp: new Date(),
        sqlQuery: data.sql_query || null,
        imageUrl: data.image_url || null
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
        timestamp: new Date(),
        sqlQuery: null
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSqlQuery = (messageId) => {
    setShowSqlToggle(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleConnectDb = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('http://localhost:8000/connect-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbCredentials)
      });

      if (response.ok) {
        setConnectedDb(dbCredentials.name || 'Database');
        setShowConnectModal(false);
        setDbCredentials({ url: '', name: '', username: '', password: '' });
      }
    } catch (error) {
      console.error('Database connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const generateGraph = async (messageId, sqlQuery) => {
    try {
      const response = await fetch('http://localhost:8000/generate-graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql_query: sqlQuery })
      });

      const data = await response.json();
      setGraphData(prev => ({
        ...prev,
        [messageId]: data.graph_url || data.graph_data
      }));
    } catch (error) {
      console.error('Graph generation failed:', error);
    }
  };

  return (
    <>
      <style>{animations}</style>

      {isInitialLoading && <LoadingScreen />}

      <div className={`min-h-screen transition-all duration-500 ${
        isInitialLoading ? 'opacity-0' : 'opacity-100'
      } ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        <ChatHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setShowConnectModal={setShowConnectModal}
          connectedDb={connectedDb}
        />

        <ConnectModal
          darkMode={darkMode}
          showConnectModal={showConnectModal}
          setShowConnectModal={setShowConnectModal}
          dbCredentials={dbCredentials}
          setDbCredentials={setDbCredentials}
          handleConnectDb={handleConnectDb}
          isConnecting={isConnecting}
        />

        {/* Messages */}
        <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                darkMode={darkMode}
                showSqlToggle={showSqlToggle}
                toggleSqlQuery={toggleSqlQuery}
                generateGraph={generateGraph}
                graphData={graphData}
              />
            ))}

            {isLoading && (
              <ChatMessage
                message={{
                  id: 'loading',
                  type: 'bot',
                  content: 'Analyzing your query...',
                  timestamp: new Date()
                }}
                darkMode={darkMode}
                showSqlToggle={{}}
                toggleSqlQuery={() => {}}
                generateGraph={() => {}}
                graphData={{}}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            darkMode={darkMode}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            inputRef={inputRef}
            connectedDb={connectedDb}
          />
        </div>
      </div>
    </>
  );
};

export default App;
