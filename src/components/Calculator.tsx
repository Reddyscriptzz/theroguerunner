
import { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Calculator = () => {
  const [amount, setAmount] = useState<string>('100');
  const [results, setResults] = useState<Array<{period: string, days: number, total: number, profit: number}>>([]);

  const calculateProfits = (principal: number) => {
    const periods = [
      { period: '1 Day', days: 1 },
      { period: '7 Days', days: 7 },
      { period: '1 Month', days: 30 },
      { period: '3 Months', days: 90 },
      { period: '1 Year', days: 365 }
    ];

    return periods.map(({ period, days }) => {
      const total = principal * Math.pow(1.03, days);
      const profit = total - principal;
      return { period, days, total, profit };
    });
  };

  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 30) {
      setResults(calculateProfits(numAmount));
    } else {
      setResults([]);
    }
  }, [amount]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const isValidAmount = parseFloat(amount) >= 30;

  return (
    <section id="calculator" className="py-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <CalculatorIcon className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">Profit Calculator</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Calculate your potential profits with 3% daily returns
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 animate-pulse-glow">
          <div className="mb-8">
            <Label htmlFor="investment" className="text-white text-lg mb-2 block">
              Investment Amount (USDT)
            </Label>
            <Input
              id="investment"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="30"
              placeholder="Minimum 30 USDT"
              className="text-lg h-12 bg-gray-800 border-gray-700 text-white focus:border-cyan-400"
            />
            {amount && parseFloat(amount) < 30 && (
              <p className="text-red-400 text-sm mt-2">Minimum investment is 30 USDT</p>
            )}
          </div>

          {isValidAmount && results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <div
                  key={result.period}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-cyan-400 font-semibold text-lg mb-4">
                    {result.period}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Initial:</span>
                      <span className="text-white">{formatCurrency(parseFloat(amount))} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profit:</span>
                      <span className="text-green-400">+{formatCurrency(result.profit)} USDT</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-3">
                      <span className="text-white font-semibold">Total:</span>
                      <span className="text-cyan-400 font-bold">{formatCurrency(result.total)} USDT</span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-500">
                        {((result.profit / parseFloat(amount)) * 100).toFixed(0)}% gain
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isValidAmount && amount && (
            <div className="text-center py-8">
              <p className="text-gray-400">Enter a minimum of 30 USDT to see profit calculations</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            * Calculations based on 3% daily compound returns. Trading involves risk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
