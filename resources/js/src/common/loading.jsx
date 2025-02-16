import React, { useEffect, useState } from 'react';

const Loading = ({ message = "Memuat", type = "default" }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const renderDefaultSpinner = () => (
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
      <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
    </div>
  );

  const renderPulseSpinner = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-4 w-4 bg-rose-500 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        ></div>
      ))}
    </div>
  );

  const renderProgressSpinner = () => (
    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-rose-500 animate-progress-loading"></div>
    </div>
  );

  const renderLoadingText = () => (
    <div className="text-2xl font-semibold text-gray-700 mt-4">
      {message.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {char}
        </span>
      ))}
      <span className="inline-block">{dots}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {type === "pulse" && renderPulseSpinner()}
        {type === "progress" && renderProgressSpinner()}
        {type === "default" && renderDefaultSpinner()}
        {renderLoadingText()}
      </div>
    </div>
  );
};

export default Loading;
