
import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, TrendingUp, DollarSign, Percent, BarChart3, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CalculationResult {
  period: string;
  days: number;
  grossTotal: number;
  grossProfit: number;
  fees: number;
  netProfit: number;
  netTotal: number;
  roi: number;
  annualizedROI: number;
}

interface ChartData {
  day: number;
  balance: number;
  profit: number;
}

const InteractiveCalculator = () => {
  const [amount, setAmount] = useState<string>('100');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isCompound, setIsCompound] = useState<boolean>(true);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(90);
  const feeRate = 0.10; // 10% fee on profits

  const calculateProfits = (principal: number): CalculationResult[] => {
    const periods = [
      { period: '1 Day', days: 1 },
      { period: '7 Days', days: 7 },
      { period: '1 Month', days: 30 },
      { period: '3 Months', days: 90 }
    ];

    return periods.map(({ period, days }) => {
      let grossTotal: number;
      
      if (isCompound) {
        grossTotal = principal * Math.pow(1.03, days);
      } else {
        grossTotal = principal * (1 + (0.03 * days));
      }
      
      const grossProfit = grossTotal - principal;
      const fees = grossProfit * feeRate;
      const netProfit = grossProfit - fees;
      const netTotal = principal + netProfit;
      const roi = (netProfit / principal) * 100;
      const annualizedROI = Math.pow(netTotal / principal, 365 / days) - 1;
      
      return {
        period,
        days,
        grossTotal,
        grossProfit,
        fees,
        netProfit,
        netTotal,
        roi,
        annualizedROI: annualizedROI * 100
      };
    });
  };

  const generateChartData = (principal: number, days: number): ChartData[] => {
    const data: ChartData[] = [];
    let currentBalance = principal;
    
    for (let day = 0; day <= days; day++) {
      if (day === 0) {
        data.push({ day, balance: principal, profit: 0 });
      } else {
        if (isCompound) {
          currentBalance = principal * Math.pow(1.03, day);
        } else {
          currentBalance = principal * (1 + (0.03 * day));
        }
        
        const grossProfit = currentBalance - principal;
        const fees = grossProfit * feeRate;
        const netBalance = currentBalance - fees;
        const netProfit = netBalance - principal;
        
        data.push({ 
          day, 
          balance: Math.round(netBalance), 
          profit: Math.round(netProfit) 
        });
      }
    }
    
    return data;
  };

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 30) {
      const calculatedResults = calculateProfits(numAmount);
      setResults(calculatedResults);
      setChartData(generateChartData(numAmount, selectedPeriod));
    } else {
      setResults([]);
      setChartData([]);
    }
  }, [amount, isCompound, selectedPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const isValidAmount = parseFloat(amount) >= 30;

  return (
    <section id="calculator" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <CalculatorIcon className="h-10 w-10 text-cyan-400 mr-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl font-bold text-white font-orbitron">
              Profit <span className="text-cyan-400">Calculator</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xl font-exo max-w-3xl mx-auto">
            Visualize your potential returns with our advanced calculation engine featuring real-time analytics
          </p>
        </div>

        {/* Main Calculator Container */}
        <div className="relative">
          {/* Glass Morphism Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-blue-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Input Section */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Amount Input */}
              <div className="lg:col-span-1">
                <Label htmlFor="investment" className="text-white text-lg mb-4 block font-exo flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-cyan-400" />
                  Investment Amount
                </Label>
                <div className="relative">
                  <Input
                    id="investment"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="30"
                    placeholder="Minimum 30 USDT"
                    className="text-xl h-14 bg-gray-800/50 border-gray-600 text-white focus:border-cyan-400 font-space-mono pl-12"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">$</span>
                </div>
                {amount && parseFloat(amount) < 30 && (
                  <p className="text-red-400 text-sm mt-2 font-exo">Minimum investment is 30 USDT</p>
                )}
              </div>
              
              {/* Interest Type Toggle */}
              <div className="lg:col-span-1 flex flex-col justify-center">
                <Label className="text-white font-exo mb-4 flex items-center">
                  <Percent className="h-5 w-5 mr-2 text-cyan-400" />
                  Interest Type
                </Label>
                <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                  <span className={`font-exo transition-colors ${!isCompound ? 'text-white' : 'text-gray-400'}`}>
                    Simple
                  </span>
                  <Switch
                    checked={isCompound}
                    onCheckedChange={setIsCompound}
                    className="data-[state=checked]:bg-cyan-600"
                  />
                  <span className={`font-exo transition-colors ${isCompound ? 'text-white' : 'text-gray-400'}`}>
                    Compound
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2 font-exo">
                  {isCompound 
                    ? "Daily compounding for maximum growth" 
                    : "Fixed 3% daily on initial investment"
                  }
                </p>
              </div>

              {/* Period Selector */}
              <div className="lg:col-span-1 flex flex-col justify-center">
                <Label className="text-white font-exo mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
                  Chart Period
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {[30, 90].map((days) => (
                    <button
                      key={days}
                      onClick={() => setSelectedPeriod(days)}
                      className={`px-4 py-2 rounded-lg font-exo transition-all ${
                        selectedPeriod === days
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {days === 30 ? '1 Month' : '3 Months'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isValidAmount && results.length > 0 && (
              <>
                {/* Visual Chart Section */}
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="h-6 w-6 text-cyan-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white font-orbitron">Growth Visualization</h3>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Balance Chart */}
                    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-cyan-400 font-exo">Balance Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                              dataKey="day" 
                              stroke="#9ca3af"
                              fontSize={12}
                            />
                            <YAxis 
                              stroke="#9ca3af"
                              fontSize={12}
                              tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                              formatter={(value) => [`$${formatCurrency(Number(value))}`, 'Balance']}
                            />
                            <Area
                              type="monotone"
                              dataKey="balance"
                              stroke="#06b6d4"
                              strokeWidth={2}
                              fill="url(#balanceGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Profit Chart */}
                    <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-green-400 font-exo">Profit Accumulation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                              dataKey="day" 
                              stroke="#9ca3af"
                              fontSize={12}
                            />
                            <YAxis 
                              stroke="#9ca3af"
                              fontSize={12}
                              tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                              formatter={(value) => [`$${formatCurrency(Number(value))}`, 'Profit']}
                            />
                            <Line
                              type="monotone"
                              dataKey="profit"
                              stroke="#10b981"
                              strokeWidth={3}
                              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm font-exo">Total Fees (3M)</p>
                          <p className="text-2xl font-bold text-red-400 font-space-mono">
                            ${formatCurrency(results[3]?.fees || 0)}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-red-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm font-exo">Net Profit (3M)</p>
                          <p className="text-2xl font-bold text-green-400 font-space-mono">
                            ${formatCurrency(results[3]?.netProfit || 0)}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm font-exo">ROI (3M)</p>
                          <p className="text-2xl font-bold text-cyan-400 font-space-mono">
                            {results[3]?.roi.toFixed(1) || 0}%
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                          <Percent className="h-6 w-6 text-cyan-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Results Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((result, index) => (
                    <Card
                      key={result.period}
                      className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-cyan-400 font-orbitron text-lg flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          {result.period}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm font-exo">Initial:</span>
                          <span className="text-white font-space-mono">${formatCurrency(parseFloat(amount))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm font-exo">Gross Profit:</span>
                          <span className="text-blue-400 font-space-mono">+${formatCurrency(result.grossProfit)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm font-exo">Fees (10%):</span>
                          <span className="text-red-400 font-space-mono">-${formatCurrency(result.fees)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm font-exo">Net Profit:</span>
                          <span className="text-green-400 font-space-mono">+${formatCurrency(result.netProfit)}</span>
                        </div>
                        <div className="border-t border-gray-700 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold font-exo">Final Balance:</span>
                            <span className="text-cyan-400 font-bold font-space-mono">${formatCurrency(result.netTotal)}</span>
                          </div>
                          <div className="text-center mt-2">
                            <span className="text-xs text-gray-500 font-exo">
                              ROI: {result.roi.toFixed(1)}% | Annual: {result.annualizedROI.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {!isValidAmount && amount && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalculatorIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-gray-400 text-lg font-exo">Enter a minimum of 30 USDT to see profit calculations</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm font-exo">
            * Calculations based on 3% daily returns with 10% fee on profits. Trading involves risk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCalculator;
