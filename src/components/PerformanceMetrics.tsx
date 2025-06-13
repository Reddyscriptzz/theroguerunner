
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface PerformanceData {
  daily: { profit: number; change: number };
  weekly: { profit: number; change: number };
  monthly: { profit: number; change: number };
}

const PerformanceMetrics = () => {
  const [performance, setPerformance] = useState<PerformanceData>({
    daily: { profit: 1250, change: 3.2 },
    weekly: { profit: 8900, change: 12.5 },
    monthly: { profit: 35600, change: 28.7 },
  });

  useEffect(() => {
    const updatePerformance = () => {
      setPerformance(prev => ({
        daily: {
          profit: prev.daily.profit * (1 + (Math.random() * 0.02 - 0.01)),
          change: prev.daily.change + (Math.random() * 0.2 - 0.1),
        },
        weekly: {
          profit: prev.weekly.profit * (1 + (Math.random() * 0.015 - 0.0075)),
          change: prev.weekly.change + (Math.random() * 0.15 - 0.075),
        },
        monthly: {
          profit: prev.monthly.profit * (1 + (Math.random() * 0.01 - 0.005)),
          change: prev.monthly.change + (Math.random() * 0.1 - 0.05),
        },
      }));
    };

    const interval = setInterval(updatePerformance, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => `$${value.toFixed(0)}`;
  const formatChange = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Daily Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white font-space-mono">
            {formatCurrency(performance.daily.profit)}
          </div>
          <div className={`text-xs flex items-center font-exo ${
            performance.daily.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {performance.daily.change >= 0 ? 
              <TrendingUp className="h-3 w-3 mr-1" /> : 
              <TrendingDown className="h-3 w-3 mr-1" />
            }
            {formatChange(performance.daily.change)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Weekly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white font-space-mono">
            {formatCurrency(performance.weekly.profit)}
          </div>
          <div className={`text-xs flex items-center font-exo ${
            performance.weekly.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {performance.weekly.change >= 0 ? 
              <TrendingUp className="h-3 w-3 mr-1" /> : 
              <TrendingDown className="h-3 w-3 mr-1" />
            }
            {formatChange(performance.weekly.change)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Monthly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white font-space-mono">
            {formatCurrency(performance.monthly.profit)}
          </div>
          <div className={`text-xs flex items-center font-exo ${
            performance.monthly.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {performance.monthly.change >= 0 ? 
              <TrendingUp className="h-3 w-3 mr-1" /> : 
              <TrendingDown className="h-3 w-3 mr-1" />
            }
            {formatChange(performance.monthly.change)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
