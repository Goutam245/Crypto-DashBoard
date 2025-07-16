
'use client';

import { useState, useEffect } from 'react';

interface OrderBookProps {
  theme: string;
  selectedPair: string;
}

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export default function OrderBook({ theme, selectedPair }: OrderBookProps) {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState(0);
  const [spreadPercent, setSpreadPercent] = useState(0);

  useEffect(() => {
    const generateOrderBook = () => {
      const basePrice = selectedPair === 'BTC/USDT' ? 67234.50 : 3456.78;
      
      // Generate asks (sell orders)
      const newAsks: OrderBookEntry[] = [];
      let total = 0;
      for (let i = 0; i < 15; i++) {
        const price = basePrice * (1 + (i + 1) * 0.0001);
        const size = Math.random() * 5 + 0.1;
        total += size;
        newAsks.push({
          price: parseFloat(price.toFixed(2)),
          size: parseFloat(size.toFixed(4)),
          total: parseFloat(total.toFixed(4))
        });
      }

      // Generate bids (buy orders)
      const newBids: OrderBookEntry[] = [];
      total = 0;
      for (let i = 0; i < 15; i++) {
        const price = basePrice * (1 - (i + 1) * 0.0001);
        const size = Math.random() * 5 + 0.1;
        total += size;
        newBids.push({
          price: parseFloat(price.toFixed(2)),
          size: parseFloat(size.toFixed(4)),
          total: parseFloat(total.toFixed(4))
        });
      }

      setAsks(newAsks);
      setBids(newBids);

      // Calculate spread
      const bestAsk = newAsks[0].price;
      const bestBid = newBids[0].price;
      const spreadValue = bestAsk - bestBid;
      setSpread(spreadValue);
      setSpreadPercent((spreadValue / bestAsk) * 100);
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 1000);
    return () => clearInterval(interval);
  }, [selectedPair]);

  const maxTotal = Math.max(
    Math.max(...asks.map(a => a.total)),
    Math.max(...bids.map(b => b.total))
  );

  return (
    <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Order Book</h3>
          <div className="text-xs text-gray-400">
            Spread: ${spread.toFixed(2)} ({spreadPercent.toFixed(3)}%)
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
          <div>Price (USDT)</div>
          <div className="text-right">Size</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="space-y-1 mb-4">
          {asks.slice().reverse().map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 text-xs py-1 relative cursor-pointer hover:bg-red-900/10"
            >
              <div
                className="absolute inset-y-0 right-0 bg-red-500/10"
                style={{ width: `${(ask.total / maxTotal) * 100}%` }}
              />
              <div className="text-red-500 relative z-10">{ask.price.toFixed(2)}</div>
              <div className="text-right relative z-10">{ask.size.toFixed(4)}</div>
              <div className="text-right text-gray-400 relative z-10">{ask.total.toFixed(4)}</div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className={`text-center py-3 my-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="text-lg font-bold text-green-500">
            $67,234.50
          </div>
          <div className="text-xs text-gray-400">Mark Price</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-1">
          {bids.map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 text-xs py-1 relative cursor-pointer hover:bg-green-900/10"
            >
              <div
                className="absolute inset-y-0 right-0 bg-green-500/10"
                style={{ width: `${(bid.total / maxTotal) * 100}%` }}
              />
              <div className="text-green-500 relative z-10">{bid.price.toFixed(2)}</div>
              <div className="text-right relative z-10">{bid.size.toFixed(4)}</div>
              <div className="text-right text-gray-400 relative z-10">{bid.total.toFixed(4)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Book Controls */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className={`px-3 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
              0.01
            </button>
            <button className={`px-3 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
              0.1
            </button>
            <button className={`px-3 py-1 text-xs rounded bg-blue-600 text-white whitespace-nowrap cursor-pointer`}>
              1
            </button>
          </div>
          <div className="text-xs text-gray-400">
            Precision
          </div>
        </div>
      </div>
    </div>
  );
}
