
import { TrendingUp, Users, DollarSign, Activity, Monitor, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import PerformanceMetrics from './PerformanceMetrics';

const LiveDashboard = () => {
  const { stats, getTimeUntilNextUserIncrease } = useDashboardStats();

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

  const formatTimeUntilNext = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes === 0) return 'Soon';
    return `${minutes}m`;
  };

  // Calculate display for next user increase
  const nextUserIncrease = getTimeUntilNextUserIncrease();
  const showNextIncrease = nextUserIncrease < 300000; // Show if within 5 minutes

  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-orbitron">Live Performance Dashboard</h2>
          </div>
          <p className="text-gray-400 text-lg font-exo">
            Real-time statistics from our trading network
          </p>
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics />

        {/* Main Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="text-xs text-green-400 font-exo">
                {showNextIncrease ? `+${stats.nextUserIncrease} joining` : `+${stats.nextUserIncrease}`}
              </div>
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
              <div className="text-xs text-green-400 font-exo">+3% daily</div>
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
              <div className="text-xs text-blue-400 font-exo">active trading</div>
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

        {/* Network Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 font-orbitron text-center flex items-center justify-center">
              <Monitor className="h-5 w-5 mr-2 text-cyan-400" />
              System Status: <span className="text-green-400 ml-2">OPTIMAL</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-space-mono">24/7</div>
                <div className="text-gray-400 font-exo">Trading Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 font-space-mono">0.2ms</div>
                <div className="text-gray-400 font-exo">Avg Response Time</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 font-orbitron text-center flex items-center justify-center">
              <Wifi className="h-5 w-5 mr-2 text-cyan-400" />
              Network Health: <span className="text-green-400 ml-2">EXCELLENT</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400 font-space-mono">99.9%</div>
                <div className="text-gray-400 font-exo">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 font-space-mono">{formatNumber(stats.activeUsers * 3)}</div>
                <div className="text-gray-400 font-exo">Active Connections</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;
