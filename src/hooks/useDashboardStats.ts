
import { useState, useEffect, useCallback } from 'react';

interface DashboardStats {
  activeUsers: number;
  totalProfits: number;
  tradesExecuted: number;
  successRate: number;
  lastUpdate: number;
  lastUserIncrease: number;
  lastProfitIncrease: number;
  lastTradeIncrease: number;
}

const STORAGE_KEY = 'dashboard_stats';
const USER_INTERVAL = 30 * 60 * 1000; // 30 minutes
const PROFIT_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours
const TRADE_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours

const getInitialStats = (): DashboardStats => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  
  const now = Date.now();
  return {
    activeUsers: 1400,
    totalProfits: 42000,
    tradesExecuted: 248,
    successRate: 91.5,
    lastUpdate: now,
    lastUserIncrease: now,
    lastProfitIncrease: now,
    lastTradeIncrease: now,
  };
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(getInitialStats);

  const saveStats = useCallback((newStats: DashboardStats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    setStats(newStats);
  }, []);

  const updateStats = useCallback(() => {
    const now = Date.now();
    const currentStats = { ...stats };
    let hasChanges = false;

    // Update active users (2-10 every 30 minutes)
    if (now - currentStats.lastUserIncrease >= USER_INTERVAL) {
      const newUsers = Math.floor(Math.random() * 9) + 2; // 2-10 users
      currentStats.activeUsers += newUsers;
      currentStats.totalProfits += newUsers * 30; // $30 per new user
      currentStats.lastUserIncrease = now;
      hasChanges = true;
    }

    // Update total profits (0.2-0.3% every 2 hours)
    if (now - currentStats.lastProfitIncrease >= PROFIT_INTERVAL) {
      const growthRate = 0.002 + (Math.random() * 0.001); // 0.2-0.3%
      currentStats.totalProfits = Math.floor(currentStats.totalProfits * (1 + growthRate));
      currentStats.lastProfitIncrease = now;
      hasChanges = true;
    }

    // Update trades executed (+1 every 3 hours)
    if (now - currentStats.lastTradeIncrease >= TRADE_INTERVAL) {
      currentStats.tradesExecuted += 1;
      currentStats.lastTradeIncrease = now;
      hasChanges = true;
    }

    // Update success rate (minor fluctuations)
    const baseSuccessRate = 91.5;
    currentStats.successRate = baseSuccessRate + (Math.random() * 3 - 1.5); // ±1.5%

    currentStats.lastUpdate = now;

    if (hasChanges) {
      saveStats(currentStats);
    } else {
      setStats(currentStats);
    }
  }, [stats, saveStats]);

  useEffect(() => {
    updateStats();
    const interval = setInterval(updateStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [updateStats]);

  return {
    stats,
    getTimeUntilNextUserIncrease: () => Math.max(0, USER_INTERVAL - (Date.now() - stats.lastUserIncrease)),
    getTimeUntilNextProfitIncrease: () => Math.max(0, PROFIT_INTERVAL - (Date.now() - stats.lastProfitIncrease)),
    getTimeUntilNextTradeIncrease: () => Math.max(0, TRADE_INTERVAL - (Date.now() - stats.lastTradeIncrease)),
  };
};
