
import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LiveDashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalProfits: 0,
    tradesExecuted: 0,
    successRate: 0
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: Math.floor(Math.random() * 50) + 1250,
        totalProfits: Math.floor(Math.random() * 100000) + 2500000,
        tradesExecuted: Math.floor(Math.random() * 1000) + 45000,
        successRate: Math.floor(Math.random() * 5) + 89
      }));
    }, 3000);

    // Initial load
    setStats({
      activeUsers: 1287,
      totalProfits: 2547830,
      tradesExecuted: 45672,
      successRate: 91.7
    });

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-orbitron">Live Performance Dashboard</h2>
          </div>
          <p className="text-gray-400 text-lg font-exo">
            Real-time statistics from our trading network
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-space-mono">
                {formatNumber(stats.activeUsers)}
              </div>
              <div className="text-xs text-green-400 font-exo">+12% from yesterday</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Profits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-space-mono">
                ${formatNumber(stats.totalProfits)}
              </div>
              <div className="text-xs text-green-400 font-exo">Generated for users</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Trades Executed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-space-mono">
                {formatNumber(stats.tradesExecuted)}
              </div>
              <div className="text-xs text-blue-400 font-exo">Today</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-space-mono">
                {stats.successRate}%
              </div>
              <div className="text-xs text-green-400 font-exo">7-day average</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 font-orbitron text-center">
            Market Status: <span className="text-green-400">ACTIVE</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400 font-space-mono">24/7</div>
              <div className="text-gray-400 font-exo">Trading Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 font-space-mono">0.2ms</div>
              <div className="text-gray-400 font-exo">Avg Execution Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 font-space-mono">99.9%</div>
              <div className="text-gray-400 font-exo">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;
