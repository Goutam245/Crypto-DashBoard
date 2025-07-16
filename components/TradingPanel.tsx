
'use client';

import { useState } from 'react';

interface TradingPanelProps {
  theme: string;
  selectedPair: string;
}

export default function TradingPanel({ theme, selectedPair }: TradingPanelProps) {
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  const [price, setPrice] = useState('67234.50');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');

  const [openOrders, setOpenOrders] = useState([
    { id: 1, pair: 'BTC/USDT', type: 'Limit', side: 'Buy', amount: '0.1234', price: '66500.00', filled: '0%' },
    { id: 2, pair: 'ETH/USDT', type: 'Stop', side: 'Sell', amount: '2.5678', price: '3400.00', filled: '45%' },
  ]);

  const handlePlaceOrder = () => {
    if (!amount || !price) return;
    
    const newOrder = {
      id: Date.now(),
      pair: selectedPair,
      type: orderType.charAt(0).toUpperCase() + orderType.slice(1),
      side: side.charAt(0).toUpperCase() + side.slice(1),
      amount,
      price,
      filled: '0%'
    };
    
    setOpenOrders(prev => [newOrder, ...prev]);
    setAmount('');
    setTotal('');
  };

  const calculateTotal = (price: string, amount: string) => {
    const p = parseFloat(price) || 0;
    const a = parseFloat(amount) || 0;
    return (p * a).toFixed(2);
  };

  return (
    <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Trading Panel</h3>
        
        {/* Order Type Tabs */}
        <div className="flex space-x-1 mb-4 bg-gray-700 rounded-lg p-1">
          {['limit', 'market', 'stop'].map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`flex-1 py-2 text-sm rounded-md whitespace-nowrap cursor-pointer ${
                orderType === type
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Buy/Sell Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setSide('buy')}
            className={`py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer ${
              side === 'buy'
                ? 'bg-green-600 text-white'
                : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Buy {selectedPair.split('/')[0]}
          </button>
          <button
            onClick={() => setSide('sell')}
            className={`py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer ${
              side === 'sell'
                ? 'bg-red-600 text-white'
                : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Sell {selectedPair.split('/')[0]}
          </button>
        </div>

        {/* Order Form */}
        <div className="space-y-3">
          {orderType === 'limit' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Price (USDT)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="0.00"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount ({selectedPair.split('/')[0]})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setTotal(calculateTotal(price, e.target.value));
              }}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="0.00"
            />
          </div>

          {/* Percentage Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <button
                key={percent}
                className={`py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}
              >
                {percent}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Total (USDT)</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="0.00"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-lg font-semibold text-white whitespace-nowrap cursor-pointer ${
              side === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[0]}
          </button>
        </div>

        {/* Balance Info */}
        <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available:</span>
            <span>12.3456 BTC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">In Order:</span>
            <span>0.1234 BTC</span>
          </div>
        </div>
      </div>

      {/* Open Orders */}
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <h4 className="text-sm font-semibold mb-3">Open Orders ({openOrders.length})</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {openOrders.map((order) => (
            <div key={order.id} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <div className="font-medium">{order.pair}</div>
                  <div className="text-gray-400">{order.type} • {order.side}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{order.amount}</div>
                  <div className="text-gray-400">${order.price}</div>
                </div>
                <button className="text-red-500 hover:text-red-400 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-close-line"></i>
                  </div>
                </button>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Filled: {order.filled}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
