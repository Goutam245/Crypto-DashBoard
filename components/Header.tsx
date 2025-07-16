
'use client';

import { useState } from 'react';

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportPDF = () => {
    // Compliance report export functionality
    console.log('Exporting compliance report...');
  };

  return (
    <header className={`border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold font-pacifico">CryptoDash Pro</h1>
          <div className="text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            LIVE • July 16, 2025
          </div>
        </div>

        {/* Market Status */}
        <div className="flex items-center space-x-6">
          <div className="text-sm">
            <span className="text-gray-400">Global Cap:</span>
            <span className="ml-2 font-semibold">$2.48T</span>
            <span className="ml-1 text-green-500">▲ 3.2%</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">BTC Dom:</span>
            <span className="ml-2 font-semibold">42.8%</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">ETH Dom:</span>
            <span className="ml-2 font-semibold">18.3%</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Export Menu */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className={`px-4 py-2 rounded-lg border ${theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} text-sm whitespace-nowrap cursor-pointer`}
            >
              <i className="ri-download-line mr-2"></i>
              Export
            </button>
            
            {showExportMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                <button
                  onClick={handleExportPDF}
                  className={`w-full text-left px-4 py-2 text-sm hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-t-lg cursor-pointer`}
                >
                  <i className="ri-file-pdf-line mr-2"></i>
                  Compliance Report
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer`}
                >
                  <i className="ri-file-excel-line mr-2"></i>
                  Trading Data
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-b-lg cursor-pointer`}
                >
                  <i className="ri-camera-line mr-2"></i>
                  Chart Screenshot
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} cursor-pointer`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
            </div>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
