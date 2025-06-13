
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Bell } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'user_join' | 'milestone' | 'achievement';
  message: string;
  timestamp: number;
}

const UserActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', type: 'user_join', message: 'User @trader_pro joined the network', timestamp: Date.now() - 300000 },
    { id: '2', type: 'milestone', message: '1500+ active users milestone reached!', timestamp: Date.now() - 600000 },
    { id: '3', type: 'achievement', message: 'Daily profit target exceeded by 15%', timestamp: Date.now() - 900000 },
  ]);

  useEffect(() => {
    const addRandomActivity = () => {
      const activityTypes = [
        { type: 'user_join' as const, messages: [
          'User @crypto_king joined the network',
          'User @profit_hunter joined the network',
          'User @trade_master joined the network',
          'User @bot_enthusiast joined the network',
        ]},
        { type: 'milestone' as const, messages: [
          'New profit milestone achieved!',
          'Trading volume milestone reached!',
          'User growth target exceeded!',
        ]},
        { type: 'achievement' as const, messages: [
          'Perfect trading streak: 10 consecutive wins',
          'Daily profit target exceeded',
          'New efficiency record set',
        ]},
      ];

      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)];

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: randomType.type,
        message: randomMessage,
        timestamp: Date.now(),
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    };

    const interval = setInterval(addRandomActivity, 45000); // New activity every 45 seconds
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_join': return <Users className="h-3 w-3" />;
      case 'milestone': return <Bell className="h-3 w-3" />;
      default: return <Bell className="h-3 w-3" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_join': return 'text-blue-400';
      case 'milestone': return 'text-green-400';
      case 'achievement': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-cyan-400 text-lg font-exo flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-2 rounded bg-gray-800/30">
              <div className={`mt-1 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-exo">{activity.message}</p>
                <p className="text-xs text-gray-400 font-exo">{getTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivityFeed;
