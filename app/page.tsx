
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MarketOverview from '@/components/MarketOverview';
import TradingPanel from '@/components/TradingPanel';
import WatchList from '@/components/WatchList';
import OrderBook from '@/components/OrderBook';
import TechnicalChart from '@/components/TechnicalChart';
import AlertsPanel from '@/components/AlertsPanel';

export default function CryptoDashPro() {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initialize WebSocket connections for real-time data
    const btcSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
    const ethSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
    
    return () => {
      btcSocket.close();
      ethSocket.close();
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header theme={theme} setTheme={setTheme} />
      
      <div className="flex flex-col space-y-4 p-4">
        {/* Market Overview */}
        <MarketOverview theme={theme} />
        
        {/* Main Trading Interface - 3 Panel Layout */}
        <div className="grid grid-cols-12 gap-4 min-h-[800px]">
          {/* Left Panel - Watchlist */}
          <div className="col-span-3">
            <WatchList 
              theme={theme} 
              selectedPair={selectedPair}
              onPairSelect={setSelectedPair}
            />
          </div>
          
          {/* Center Panel - Chart */}
          <div className="col-span-6">
            <TechnicalChart 
              theme={theme}
              selectedPair={selectedPair}
            />
          </div>
          
          {/* Right Panel - OrderBook & Trading */}
          <div className="col-span-3 space-y-4">
            <OrderBook theme={theme} selectedPair={selectedPair} />
            <TradingPanel theme={theme} selectedPair={selectedPair} />
          </div>
        </div>
        
        {/* Bottom Panel - Alerts & Analytics */}
        <AlertsPanel theme={theme} />
      </div>
    </div>
  );
}
