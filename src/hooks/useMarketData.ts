
import { useState, useEffect } from 'react';

interface MarketData {
  pairs: {
    symbol: string;
    price: number;
    change24h: number;
    volume: number;
  }[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  marketCap: number;
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    pairs: [
      { symbol: 'ETH/USDT', price: 2680.30, change24h: -1.23, volume: 890000 },
      { symbol: 'BNB/USDT', price: 315.45, change24h: 0.89, volume: 420000 },
      { symbol: 'SOL/USDT', price: 98.75, change24h: 4.12, volume: 320000 },
    ],
    sentiment: 'bullish',
    marketCap: 1650000000000,
  });

  useEffect(() => {
    const updateMarketData = () => {
      setMarketData(prev => ({
        ...prev,
        pairs: prev.pairs.map(pair => ({
          ...pair,
          price: pair.price * (1 + (Math.random() * 0.02 - 0.01)), // ±1% fluctuation
          change24h: pair.change24h + (Math.random() * 0.4 - 0.2), // ±0.2% change
          volume: pair.volume * (1 + (Math.random() * 0.1 - 0.05)), // ±5% volume change
        })),
        sentiment: Math.random() > 0.7 ? 'bullish' : Math.random() > 0.3 ? 'neutral' : 'bearish',
      }));
    };

    const interval = setInterval(updateMarketData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return marketData;
};
