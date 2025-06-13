
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
  nextUserIncrease: number;
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
    nextUserIncrease: Math.floor(Math.random() * 14) + 2, // 2-15
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

    // Update active users (2-15 every 30 minutes)
    if (now - currentStats.lastUserIncrease >= USER_INTERVAL) {
      currentStats.activeUsers += currentStats.nextUserIncrease;
      currentStats.totalProfits += currentStats.nextUserIncrease * 30; // $30 per new user
      currentStats.nextUserIncrease = Math.floor(Math.random() * 14) + 2; // 2-15 users
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

    // Update success rate (slower, more normalized fluctuations)
    const baseSuccessRate = 91.5;
    const slowFluctuation = Math.sin(now / 300000) * 0.5; // Very slow sine wave
    currentStats.successRate = baseSuccessRate + slowFluctuation + (Math.random() * 0.4 - 0.2); // ±0.2%

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
