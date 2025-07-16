
'use client';

import { useState, useEffect } from 'react';

interface AlertsPanelProps {
  theme: string;
}

export default function AlertsPanel({ theme }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'price',
      title: 'BTC Price Alert',
      message: 'Bitcoin crossed $67,000 resistance level',
      time: '2 min ago',
      severity: 'info',
      icon: 'ri-arrow-up-line'
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Flash Crash Detected',
      message: 'LUNA experienced 15% drop in 30 seconds',
      time: '5 min ago',
      severity: 'critical',
      icon: 'ri-alert-line'
    },
    {
      id: 3,
      type: 'arbitrage',
      title: 'Arbitrage Opportunity',
      message: 'ETH price gap detected: Binance vs Coinbase (0.3%)',
      time: '8 min ago',
      severity: 'warning',
      icon: 'ri-exchange-line'
    },
    {
      id: 4,
      type: 'volume',
      title: 'Volume Spike',
      message: 'SOL trading volume increased 340% in last hour',
      time: '12 min ago',
      severity: 'info',
      icon: 'ri-sound-module-line'
    },
    {
      id: 5,
      type: 'compliance',
      title: 'Daily Report Ready',
      message: 'SOC 2 Type II compliance report generated',
      time: '15 min ago',
      severity: 'success',
      icon: 'ri-file-shield-line'
    }
  ]);

  const [performance, setPerformance] = useState({
    anomaliesDetected: 3,
    arbitrageAlerts: 12,
    latency: '0.5s',
    uptime: '99.98%',
    dataPoints: '10M+'
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'success': return 'text-green-500 bg-green-500/10 border-green-500/30';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* AI Analytics Performance */}
      <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <h3 className="text-lg font-semibold mb-4">AI Performance (July 2025)</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Anomalies Detected</span>
            <span className="font-semibold text-red-500">{performance.anomaliesDetected}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Arbitrage Alerts</span>
            <span className="font-semibold text-yellow-500">{performance.arbitrageAlerts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">WebSocket Latency</span>
            <span className="font-semibold text-green-500">{performance.latency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">System Uptime</span>
            <span className="font-semibold">{performance.uptime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Data Points Processed</span>
            <span className="font-semibold">{performance.dataPoints}</span>
          </div>
        </div>

        {/* Key Achievements */}
        <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="text-sm font-semibold mb-2">Key Achievements (July 2025)</h4>
          <ul className="text-xs space-y-1 text-gray-400">
            <li>• 0.5s latency WebSocket feeds for 10,000+ pairs</li>
            <li>• AI-powered anomaly detection (3 flash crashes flagged)</li>
            <li>• 62% client-side load time reduction via WASM</li>
            <li>• MiCA compliance-ready data logging</li>
          </ul>
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className={`col-span-2 rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Real-time Alerts & Notifications</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Feed</span>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className={`${alert.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{alert.message}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{alert.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-300 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-close-line"></i>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Alert Controls */}
        <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className={`px-3 py-1 text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
                <i className="ri-settings-line mr-1"></i>
                Configure
              </button>
              <button className={`px-3 py-1 text-sm rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} whitespace-nowrap cursor-pointer`}>
                <i className="ri-notification-line mr-1"></i>
                Sound Alerts
              </button>
            </div>
            
            <div className="text-xs text-gray-400">
              Last sync: {new Date().toLocaleTimeString()} • MiCA Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
