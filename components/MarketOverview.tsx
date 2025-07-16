
'use client';

import { useState, useEffect } from 'react';

interface MarketOverviewProps {
  theme: string;
}

export default function MarketOverview({ theme }: MarketOverviewProps) {
  const [topMovers, setTopMovers] = useState([
    { symbol: 'RNDR', change: 12.4, price: 8.47 },
    { symbol: 'TIA', change: 8.7, price: 12.34 },
    { symbol: 'SEI', change: -5.1, price: 0.89 },
    { symbol: 'ARB', change: 6.2, price: 1.23 },
    { symbol: 'OP', change: -3.8, price: 2.15 }
  ]);

  const [marketMetrics, setMarketMetrics] = useState({
    totalCap: 2.48,
    volume24h: 87.2,
    defiTvl: 78.5,
    fearGreed: 72
  });

  return (
    <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
      <div className="grid grid-cols-4 gap-8">
        {/* Market Metrics */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Market Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Market Cap</span>
              <span className="font-semibold">${marketMetrics.totalCap}T</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">24h Volume</span>
              <span className="font-semibold">${marketMetrics.volume24h}B</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">DeFi TVL</span>
              <span className="font-semibold">${marketMetrics.defiTvl}B</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Fear & Greed</span>
              <span className="font-semibold text-green-500">{marketMetrics.fearGreed}</span>
            </div>
          </div>
        </div>

        {/* Top Movers */}
        <div className="col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Top Movers (24h)</h3>
          <div className="grid grid-cols-5 gap-4">
            {topMovers.map((coin) => (
              <div key={coin.symbol} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-center">
                  <div className="text-sm font-semibold">{coin.symbol}</div>
                  <div className="text-xs text-gray-400">${coin.price}</div>
                  <div className={`text-sm font-semibold ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change > 0 ? '+' : ''}{coin.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Alerts */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">AI Anomaly Detection</h3>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200'} border`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Flash Crash Alert</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">LUNA detected unusual volume spike</p>
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'} border`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Arbitrage Opportunity</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">BTC price gap: Binance vs Coinbase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
