
'use client';

import { useState, useEffect } from 'react';

interface WatchListProps {
  theme: string;
  selectedPair: string;
  onPairSelect: (pair: string) => void;
}

export default function WatchList({ theme, selectedPair, onPairSelect }: WatchListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlistData, setWatchlistData] = useState([
    { pair: 'BTC/USDT', price: 67234.50, change: 2.34, volume: '2.1B', high: 68500, low: 66100 },
    { pair: 'ETH/USDT', price: 3456.78, change: -1.22, volume: '1.8B', high: 3520, low: 3410 },
    { pair: 'BNB/USDT', price: 542.33, change: 4.56, volume: '456M', high: 558, low: 521 },
    { pair: 'ADA/USDT', price: 0.4521, change: 7.89, volume: '234M', high: 0.46, low: 0.42 },
    { pair: 'SOL/USDT', price: 145.67, change: -3.21, volume: '678M', high: 152, low: 142 },
    { pair: 'DOT/USDT', price: 6.789, change: 1.45, volume: '123M', high: 6.92, low: 6.65 },
    { pair: 'AVAX/USDT', price: 28.45, change: 5.67, volume: '189M', high: 29.1, low: 27.8 },
    { pair: 'MATIC/USDT', price: 0.8934, change: -2.11, volume: '345M', high: 0.92, low: 0.87 },
  ]);

  const filteredPairs = watchlistData.filter(item =>
    item.pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlistData(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.001),
        change: item.change + (Math.random() - 0.5) * 0.1
      })));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border h-full`}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Watchlist</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400 text-sm"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search pairs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div className="p-2">
        <div className="space-y-1 max-h-[600px] overflow-y-auto">
          {filteredPairs.map((item) => (
            <div
              key={item.pair}
              onClick={() => onPairSelect(item.pair)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedPair === item.pair
                  ? theme === 'dark' ? 'bg-blue-900/30 border-blue-500/50' : 'bg-blue-50 border-blue-200'
                  : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              } ${selectedPair === item.pair ? 'border' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-sm">{item.pair}</div>
                  <div className="text-xs text-gray-400">Vol: {item.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">${item.price.toFixed(item.price < 1 ? 4 : 2)}</div>
                  <div className={`text-xs ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">H: </span>
                  <span className="font-medium">{item.high}</span>
                </div>
                <div>
                  <span className="text-gray-400">L: </span>
                  <span className="font-medium">{item.low}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
