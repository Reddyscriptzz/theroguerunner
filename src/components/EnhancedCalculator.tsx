
import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

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

const EnhancedCalculator = () => {
  const [amount, setAmount] = useState<string>('100');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [isCompound, setIsCompound] = useState<boolean>(true);
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
        // Compound interest: 3% daily compounded
        grossTotal = principal * Math.pow(1.03, days);
      } else {
        // Simple interest: 3% daily simple
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

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 30) {
      setResults(calculateProfits(numAmount));
    } else {
      setResults([]);
    }
  }, [amount, isCompound]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const isValidAmount = parseFloat(amount) >= 30;

  return (
    <section id="calculator" className="py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <CalculatorIcon className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-orbitron">Advanced Profit Calculator</h2>
          </div>
          <p className="text-gray-400 text-lg font-exo">
            Calculate your potential profits with 3% daily returns (10% fee applies to all profits)
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 animate-pulse-glow mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <Label htmlFor="investment" className="text-white text-lg mb-2 block font-exo">
                Investment Amount (USDT)
              </Label>
              <Input
                id="investment"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="30"
                placeholder="Minimum 30 USDT"
                className="text-lg h-12 bg-gray-800 border-gray-700 text-white focus:border-cyan-400 font-space-mono"
              />
              {amount && parseFloat(amount) < 30 && (
                <p className="text-red-400 text-sm mt-2 font-exo">Minimum investment is 30 USDT</p>
              )}
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-3">
                <Label className="text-white font-exo">Simple Interest</Label>
                <Switch
                  checked={isCompound}
                  onCheckedChange={setIsCompound}
                  className="data-[state=checked]:bg-cyan-600"
                />
                <Label className="text-white font-exo">Compound Interest</Label>
              </div>
              <p className="text-gray-400 text-sm mt-2 font-exo">
                {isCompound 
                  ? "Profits are reinvested daily for compound growth" 
                  : "Fixed 3% daily return on initial investment"
                }
              </p>
            </div>
          </div>

          {isValidAmount && results.length > 0 && (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Total Fees (3 Months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400 font-space-mono">
                      {formatCurrency(results[3]?.fees || 0)} USDT
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Net Profit (3 Months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400 font-space-mono">
                      {formatCurrency(results[3]?.netProfit || 0)} USDT
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-cyan-400 text-sm font-exo flex items-center">
                      <Percent className="h-4 w-4 mr-2" />
                      ROI (3 Months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-cyan-400 font-space-mono">
                      {results[3]?.roi.toFixed(1) || 0}%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Results */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((result, index) => (
                  <div
                    key={result.period}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-cyan-400 font-semibold text-lg mb-4 font-orbitron">
                      {result.period}
                    </h3>
                    <div className="space-y-3 font-exo">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Initial:</span>
                        <span className="text-white font-space-mono">{formatCurrency(parseFloat(amount))} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Gross Profit:</span>
                        <span className="text-blue-400 font-space-mono">+{formatCurrency(result.grossProfit)} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fees (10%):</span>
                        <span className="text-red-400 font-space-mono">-{formatCurrency(result.fees)} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Net Profit:</span>
                        <span className="text-green-400 font-space-mono">+{formatCurrency(result.netProfit)} USDT</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-3">
                        <span className="text-white font-semibold">Final Balance:</span>
                        <span className="text-cyan-400 font-bold font-space-mono">{formatCurrency(result.netTotal)} USDT</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 font-exo">
                          ROI: {result.roi.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!isValidAmount && amount && (
            <div className="text-center py-8">
              <p className="text-gray-400 font-exo">Enter a minimum of 30 USDT to see profit calculations</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm font-exo">
            * Calculations based on 3% daily returns with 10% fee on profits. Trading involves risk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCalculator;
