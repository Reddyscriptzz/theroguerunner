
import { useEffect } from 'react';
import { Zap, Shield, BarChart3, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RRLogo from '@/components/RRLogo';
import LiveDashboard from '@/components/LiveDashboard';
import InteractiveCalculator from '@/components/InteractiveCalculator';
import MarketIndicators from '@/components/MarketIndicators';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import SecuritySection from '@/components/SecuritySection';
import TestimonialSection from '@/components/TestimonialSection';

const Index = () => {
  useEffect(() => {
    document.title = 'Rogue Runner - Advanced Telegram Trading Bot';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <RRLogo size="md" />
          <span className="text-2xl font-bold font-orbitron">Rogue Runner</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo">Features</a>
          <a href="#dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo">Dashboard</a>
          <a href="#calculator" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo">Calculator</a>
          <a href="#security" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo">Security</a>
        </div>
        <Button 
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo"
          onClick={() => window.open('https://t.me/RogueRunnerAiBot', '_blank')}
        >
          Start Trading
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center bg-cyan-900/30 border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
            <Zap className="h-4 w-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400 text-sm font-exo">Advanced AI-Powered Trading</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-orbitron">
            Trade Smarter with
            <span className="text-cyan-400 block animate-glitch">Rogue Runner</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-exo max-w-3xl mx-auto">
            Experience next-generation algorithmic trading with our advanced Telegram bot. 
            Automate your strategies with precision and speed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo text-lg px-8 py-4"
              onClick={() => window.open('https://t.me/RogueRunnerAiBot', '_blank')}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Join Telegram Bot
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-exo text-lg px-8 py-4"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Performance
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 font-orbitron">Powerful Features</h2>
            <p className="text-gray-400 text-lg font-exo">Everything you need for successful automated trading</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Execution",
                description: "Execute trades in milliseconds with our optimized algorithms and direct exchange connections."
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Your funds and data are protected with military-grade encryption and security protocols."
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Real-time market analysis, profit tracking, and detailed performance metrics at your fingertips."
              }
            ].map((feature, index) => (
              <Card key={feature.title} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
                  <CardTitle className="text-white font-orbitron">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 font-exo">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Indicators - Centralized */}
      <section id="market" className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <MarketIndicators />
        </div>
      </section>

      {/* Live Dashboard */}
      <section id="dashboard">
        <LiveDashboard />
      </section>

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Interactive Calculator */}
      <section id="calculator">
        <InteractiveCalculator />
      </section>

      {/* Security Section */}
      <section id="security">
        <SecuritySection />
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-6 font-orbitron">Ready to Start Trading?</h2>
            <p className="text-xl text-gray-300 mb-8 font-exo">
              Join thousands of traders who are already using Rogue Runner to maximize their profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo"
                onClick={() => window.open('https://t.me/RogueRunnerz', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-exo"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Sci-Fi Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 relative z-10 bg-gradient-to-b from-transparent to-black/50">
        {/* Animated Matrix-like particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Glowing border effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <RRLogo size="md" />
            <span className="text-2xl font-bold font-orbitron">Rogue Runner</span>
          </div>
          
          {/* Sci-fi data streams */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-xs font-space-mono text-cyan-400/60">
            <div className="bg-gray-900/30 border border-cyan-500/20 rounded p-3">
              <div>SYSTEM_STATUS: ONLINE</div>
              <div>UPTIME: 99.99%</div>
              <div>TRADES_EXECUTED: 2,847,592</div>
            </div>
            <div className="bg-gray-900/30 border border-purple-500/20 rounded p-3">
              <div>NETWORK_HEALTH: OPTIMAL</div>
              <div>LATENCY: 0.2ms</div>
              <div>ACTIVE_NODES: 47</div>
            </div>
            <div className="bg-gray-900/30 border border-cyan-500/20 rounded p-3">
              <div>SECURITY_LEVEL: MAXIMUM</div>
              <div>ENCRYPTION: AES-256</div>
              <div>THREAT_STATUS: CLEAR</div>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 pt-6">
            <p className="text-gray-400 font-exo mb-2">
              © 2024-2025 Rogue Runner. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 font-space-mono">
              ROGUE_RUNNER_v2.4.7 | BUILD_20241213 | NEURAL_NET_ACTIVE
            </p>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-1.5 h-1.5 bg-cyan-300/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </footer>
    </div>
  );
};

export default Index;
