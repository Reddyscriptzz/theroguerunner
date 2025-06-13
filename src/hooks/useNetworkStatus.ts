
import { useState, useEffect } from 'react';

interface NetworkStatus {
  uptime: number;
  responseTime: number;
  activeConnections: number;
  serverLoad: number;
  apiCalls: number;
}

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>({
    uptime: 99.9,
    responseTime: 0.2,
    activeConnections: 4200,
    serverLoad: 15.8,
    apiCalls: 125000,
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(prev => ({
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() * 0.02 - 0.01))),
        responseTime: Math.max(0.1, Math.min(1.0, prev.responseTime + (Math.random() * 0.02 - 0.01))),
        activeConnections: Math.floor(prev.activeConnections * (1 + (Math.random() * 0.02 - 0.01))),
        serverLoad: Math.max(5, Math.min(30, prev.serverLoad + (Math.random() * 2 - 1))),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10) + 5,
      }));
    };

    const interval = setInterval(updateStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return status;
};
