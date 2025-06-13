
import { useState, useEffect } from 'react';
import { ArrowRight, Bot, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Simulate loading time and glitch effects
    const glitchInterval = setInterval(() => {
      setGlitchActive(prev => !prev);
    }, 150);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
      clearInterval(glitchInterval);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(glitchInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className={`text-8xl font-bold text-cyan-400 mb-4 transition-all duration-75 ${
            glitchActive ? 'animate-pulse filter blur-sm' : ''
          }`}>
            <div className="relative inline-block">
              <span className="inline-block transform">R</span>
              <span className="inline-block transform rotate-180 -ml-4">R</span>
              {glitchActive && (
                <>
                  <div className="absolute inset-0 text-red-500 opacity-70 transform translate-x-1">
                    <span className="inline-block transform">R</span>
                    <span className="inline-block transform rotate-180 -ml-4">R</span>
                  </div>
                  <div className="absolute inset-0 text-green-500 opacity-70 transform -translate-x-1">
                    <span className="inline-block transform">R</span>
                    <span className="inline-block transform rotate-180 -ml-4">R</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="text-cyan-300 text-xl font-light tracking-[0.3em] animate-pulse">
            INITIALIZING...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-bold text-cyan-400">
              <span className="inline-block transform">R</span>
              <span className="inline-block transform rotate-180 -ml-2">R</span>
            </div>
            <div className="text-lg font-light tracking-wider">ROGUE RUNNER</div>
          </div>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Logo */}
          <div className="mb-8 animate-fade-in">
            <div className="text-9xl font-bold text-cyan-400 mb-4 hover:animate-pulse cursor-pointer transition-all duration-300">
              <div className="relative inline-block group">
                <span className="inline-block transform group-hover:scale-110 transition-transform">R</span>
                <span className="inline-block transform rotate-180 -ml-6 group-hover:scale-110 transition-transform">R</span>
                <div className="absolute inset-0 bg-cyan-400 opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              </div>
            </div>
            <h1 className="text-4xl font-light tracking-[0.3em] text-cyan-300 mb-2">ROGUE RUNNER</h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
          </div>

          {/* Tagline */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-300">
              Advanced Telegram Trading Bot
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Automate your trading strategies with precision and speed. 
              Experience next-generation algorithmic trading through our secure Telegram interface.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
              onClick={() => window.open('https://t.me/your_bot_username', '_blank')}
            >
              Launch Bot
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 group">
              <Bot className="h-8 w-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">Automated Trading</h3>
              <p className="text-gray-400">Execute trades 24/7 with advanced algorithms and real-time market analysis.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 group">
              <TrendingUp className="h-8 w-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Analytics</h3>
              <p className="text-gray-400">Get detailed insights and performance metrics to optimize your trading strategy.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 group">
              <Zap className="h-8 w-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
              <p className="text-gray-400">Execute orders in milliseconds with our high-performance infrastructure.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-xl text-cyan-400">
              <span className="inline-block transform">R</span>
              <span className="inline-block transform rotate-180 -ml-1">R</span>
            </div>
            <span className="text-gray-400">Rogue Runner</span>
          </div>
          <p className="text-gray-500 text-sm">
            Advanced algorithmic trading solutions. Trade responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
