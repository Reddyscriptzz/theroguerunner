
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useMarketData } from '@/hooks/useMarketData';

const MarketIndicators = () => {
  const marketData = useMarketData();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`;
    return volume.toString();
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-white mb-4 font-orbitron flex items-center">
        <DollarSign className="h-5 w-5 mr-2 text-cyan-400" />
        Live Market Data
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.pairs.map((pair) => (
          <Card key={pair.symbol} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/30 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 text-sm font-exo flex items-center justify-between">
                {pair.symbol}
                <div className={`flex items-center text-xs ${
                  pair.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {pair.change24h >= 0 ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {formatChange(pair.change24h)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white font-space-mono mb-1">
                {formatPrice(pair.price)}
              </div>
              <div className="text-xs text-gray-400 font-exo">
                Vol: {formatVolume(pair.volume)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-400 font-exo">Market Sentiment: </span>
        <span className={`font-semibold font-exo ${
          marketData.sentiment === 'bullish' ? 'text-green-400' :
          marketData.sentiment === 'bearish' ? 'text-red-400' : 'text-yellow-400'
        }`}>
          {marketData.sentiment.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default MarketIndicators;
