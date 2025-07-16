
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts';

interface TechnicalChartProps {
  theme: string;
  selectedPair: string;
}

export default function TechnicalChart({ theme, selectedPair }: TechnicalChartProps) {
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState(['MA', 'RSI']);
  const [chartData, setChartData] = useState([]);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W'];
  const availableIndicators = ['MA', 'EMA', 'RSI', 'MACD', 'BB', 'Volume'];

  useEffect(() => {
    // Generate realistic candlestick data
    const generateData = () => {
      const data = [];
      let basePrice = selectedPair === 'BTC/USDT' ? 67000 : 3400;
      
      for (let i = 0; i < 100; i++) {
        const timestamp = Date.now() - (99 - i) * 3600000;
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility;
        
        basePrice = basePrice * (1 + change);
        const open = basePrice;
        const close = open * (1 + (Math.random() - 0.5) * 0.01);
        const high = Math.max(open, close) * (1 + Math.random() * 0.005);
        const low = Math.min(open, close) * (1 - Math.random() * 0.005);
        const volume = Math.random() * 1000000;

        data.push({
          timestamp,
          time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          open: parseFloat(open.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
          volume: Math.floor(volume),
          price: parseFloat(close.toFixed(2))
        });
      }
      return data;
    };

    setChartData(generateData());
  }, [selectedPair, timeframe]);

  const toggleIndicator = (indicator: string) => {
    setIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border h-full`}>
      {/* Chart Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">{selectedPair}</h3>
            <div className="text-2xl font-bold text-green-500">
              $67,234.50 <span className="text-sm">+2.34%</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Chart Type */}
            <div className="flex rounded-lg overflow-hidden border border-gray-600">
              <button
                onClick={() => setChartType('candlestick')}
                className={`px-3 py-1 text-sm whitespace-nowrap cursor-pointer ${chartType === 'candlestick' ? 'bg-blue-600 text-white' : 'bg-transparent'}`}
              >
                Candles
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 text-sm whitespace-nowrap cursor-pointer ${chartType === 'line' ? 'bg-blue-600 text-white' : 'bg-transparent'}`}
              >
                Line
              </button>
            </div>
            
            {/* Fullscreen */}
            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer`}>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-fullscreen-line text-sm"></i>
              </div>
            </button>
          </div>
        </div>

        {/* Timeframes */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap cursor-pointer ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Indicators:</span>
            <div className="flex space-x-1">
              {availableIndicators.map((indicator) => (
                <button
                  key={indicator}
                  onClick={() => toggleIndicator(indicator)}
                  className={`px-2 py-1 text-xs rounded whitespace-nowrap cursor-pointer ${
                    indicators.includes(indicator)
                      ? 'bg-green-600 text-white'
                      : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {indicator}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-4" style={{ height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="time" 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              fontSize={12}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: theme === 'dark' ? '#ffffff' : '#000000'
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            {indicators.includes('MA') && (
              <Line
                type="monotone"
                dataKey="price"
                stroke="#f59e0b"
                strokeWidth={1}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer - Trading Tools */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className={`px-3 py-1 text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
              <i className="ri-pencil-line mr-1"></i>
              Draw
            </button>
            <button className={`px-3 py-1 text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
              <i className="ri-ruler-line mr-1"></i>
              Measure
            </button>
          </div>
          
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()} • 0.5s latency
          </div>
        </div>
      </div>
    </div>
  );
}
