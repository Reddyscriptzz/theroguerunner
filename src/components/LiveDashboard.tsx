
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

  const [baseUsers] = useState(1400); // Starting user base
  const [dailyGrowthRate] = useState(0.03); // 3% compound interest per user daily
  const baseProfitPerUser = 30; // $30 base profit per user to reach $42,000 with 1400 users

  // Calculate realistic trading statistics
  useEffect(() => {
    const calculateStats = () => {
      // Calculate current active users (grows by 6-30 new users daily, capped at 30)
      const daysSinceStart = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % 30; // Cycle every 30 days
      const newUsersToday = Math.min(Math.floor(Math.random() * 25) + 6, 30); // 6-30 random users, capped at 30
      const currentUsers = baseUsers + (daysSinceStart * newUsersToday);
      
      // Calculate total profits based on compound interest per user
      // Base: $42,000 grows by 3% compound daily per user
      const compoundMultiplier = Math.pow(1 + dailyGrowthRate, daysSinceStart);
      const totalProfits = Math.floor(currentUsers * baseProfitPerUser * compoundMultiplier);
      
      // Calculate trades executed - 1 trade every 3 hours = 8 trades per day max, we'll use 10 max
      const currentHour = new Date().getHours();
      const tradesPerDay = Math.min(Math.floor(currentHour / 3) + 1, 10); // Max 10 trades per day
      const baseTrades = daysSinceStart * 10; // 10 trades per day historical
      const tradesExecuted = baseTrades + tradesPerDay;
      
      // Success rate (89-94% range)
      const successRate = Math.floor(Math.random() * 6) + 89;

      return {
        activeUsers: currentUsers,
        totalProfits,
        tradesExecuted,
        successRate,
        newUsersToday
      };
    };

    // Real-time updates every 3 seconds with realistic fluctuations
    const interval = setInterval(() => {
      const baseStats = calculateStats();
      
      setStats({
        activeUsers: baseStats.activeUsers + Math.floor(Math.random() * 10) - 5, // Small random fluctuation
        totalProfits: baseStats.totalProfits + Math.floor(Math.random() * 1000) - 500, // Small profit fluctuation
        tradesExecuted: baseStats.tradesExecuted + Math.floor(Math.random() * 2), // Small trades fluctuation
        successRate: baseStats.successRate + (Math.random() * 2 - 1) // Small success rate fluctuation
      });
    }, 3000);

    // Initial load
    const initialStats = calculateStats();
    setStats(initialStats);

    return () => clearInterval(interval);
  }, [baseUsers, dailyGrowthRate, baseProfitPerUser]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };

  const formatProfits = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${formatNumber(num)}`;
  };

  // Calculate new users for display (max 30)
  const newUsersToday = Math.min(Math.floor(Math.random() * 25) + 6, 30);

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
              <div className="text-xs text-green-400 font-exo">+{newUsersToday} new today</div>
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
                {formatProfits(stats.totalProfits)}
              </div>
              <div className="text-xs text-green-400 font-exo">+3% compound daily</div>
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
              <div className="text-xs text-blue-400 font-exo">Every 3hrs (Max 10/day)</div>
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
                {stats.successRate.toFixed(1)}%
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
