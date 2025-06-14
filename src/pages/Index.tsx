
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
import FloatingParticles from '@/components/FloatingParticles';
import TypewriterText from '@/components/TypewriterText';
import GlitchText from '@/components/GlitchText';
import AnimatedCard from '@/components/AnimatedCard';
import EnhancedButton from '@/components/EnhancedButton';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const Index = () => {
  const scrollY = useScrollPosition();
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    document.title = 'Rogue Runner - Advanced Telegram Trading Bot';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Floating Particles System */}
      <FloatingParticles />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] animate-pulse"></div>
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ 
          y: scrollY * 0.5,
          scale: 1 + Math.sin(scrollY * 0.01) * 0.1 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ 
          y: -scrollY * 0.3,
          x: Math.sin(scrollY * 0.005) * 20 
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 backdrop-blur-sm glassmorphism-dark">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RRLogo size="md" />
          <span className="text-2xl font-bold font-orbitron">
            <GlitchText text="Rogue Runner" />
          </span>
        </motion.div>
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo spotlight">Features</a>
          <a href="#dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo spotlight">Dashboard</a>
          <a href="#calculator" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo spotlight">Calculator</a>
          <a href="#security" className="text-gray-300 hover:text-cyan-400 transition-colors font-exo spotlight">Security</a>
        </motion.div>
        <EnhancedButton 
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo"
          href="https://t.me/RogueRunnerAiBot"
          pulse
          glitch
        >
          Start Trading
          <ArrowRight className="ml-2 h-4 w-4" />
        </EnhancedButton>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 text-center py-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center bg-cyan-900/30 border border-cyan-500/30 rounded-full px-6 py-2 mb-8 glassmorphism"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
          >
            <Zap className="h-4 w-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400 text-sm font-exo">Advanced AI-Powered Trading</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-orbitron">
            Trade Smarter with
            <motion.span 
              className="text-cyan-400 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {heroInView && <TypewriterText text="Rogue Runner" speed={100} />}
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 font-exo max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Experience next-generation algorithmic trading with our advanced Telegram bot. 
            Automate your strategies with precision and speed.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 30 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <EnhancedButton 
              size="lg" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo text-lg px-8 py-4 animate-energy-flow"
              href="https://t.me/RogueRunnerAiBot"
              pulse
              glitch
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Join Telegram Bot
            </EnhancedButton>
            <EnhancedButton 
              variant="outline" 
              size="lg" 
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-exo text-lg px-8 py-4"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Performance
            </EnhancedButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              <GlitchText text="Powerful Features" />
            </h2>
            <p className="text-gray-400 text-lg font-exo">Everything you need for successful automated trading</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Execution",
                description: "Execute trades in milliseconds with our optimized algorithms and direct exchange connections.",
                backContent: "Advanced execution engine with sub-millisecond latency, direct API connections to major exchanges, and optimized order routing."
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Your funds and data are protected with military-grade encryption and security protocols.",
                backContent: "AES-256 encryption, multi-factor authentication, cold storage integration, and real-time security monitoring."
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Real-time market analysis, profit tracking, and detailed performance metrics at your fingertips.",
                backContent: "Machine learning-powered market predictions, comprehensive portfolio analytics, and automated risk assessment."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <AnimatedCard 
                  flip3D
                  backContent={
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                      <feature.icon className="h-12 w-12 text-cyan-400 mb-4 mx-auto" />
                      <p className="text-gray-300 text-center font-exo">{feature.backContent}</p>
                    </CardContent>
                  }
                >
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-cyan-400 mb-4 animate-holographic" />
                    <CardTitle className="text-white font-orbitron">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 font-exo">{feature.description}</p>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
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
          <motion.div 
            className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-sm glassmorphism spotlight"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
          >
            <h2 className="text-4xl font-bold mb-6 font-orbitron">
              <GlitchText text="Ready to Start Trading?" />
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-exo">
              Join thousands of traders who are already using Rogue Runner to maximize their profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-exo"
                href="https://t.me/RogueRunnerz"
                pulse
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </EnhancedButton>
              <EnhancedButton 
                variant="outline" 
                size="lg" 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-exo"
              >
                Learn More
              </EnhancedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Sci-Fi Footer */}
      <footer className="border-t border-gray-800 py-12 px-6 relative z-10 bg-gradient-to-b from-transparent to-black/50 spotlight">
        {/* Animated Matrix-like particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Matrix rain effect */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500/30 text-xs font-mono animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {Math.random().toString(36).substr(2, 5)}
            </div>
          ))}
        </div>
        
        {/* Glowing border effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-energy-flow"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <RRLogo size="md" />
            <span className="text-2xl font-bold font-orbitron">
              <GlitchText text="Rogue Runner" />
            </span>
          </div>
          
          {/* Enhanced Sci-fi data streams */}
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-xs font-space-mono text-cyan-400/60">
            <motion.div 
              className="bg-gray-900/30 border border-cyan-500/20 rounded p-3 glassmorphism"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
            >
              <div>SYSTEM_STATUS: <span className="text-green-400 animate-pulse">ONLINE</span></div>
              <div>UPTIME: <span className="text-cyan-400">99.99%</span></div>
              <div>TRADES_EXECUTED: <span className="text-purple-400">2,847,592</span></div>
            </motion.div>
            <motion.div 
              className="bg-gray-900/30 border border-purple-500/20 rounded p-3 glassmorphism"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
            >
              <div>NETWORK_HEALTH: <span className="text-green-400">OPTIMAL</span></div>
              <div>LATENCY: <span className="text-cyan-400">0.2ms</span></div>
              <div>ACTIVE_NODES: <span className="text-purple-400 animate-counter-up">47</span></div>
            </motion.div>
            <motion.div 
              className="bg-gray-900/30 border border-cyan-500/20 rounded p-3 glassmorphism"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
            >
              <div>SECURITY_LEVEL: <span className="text-green-400">MAXIMUM</span></div>
              <div>ENCRYPTION: <span className="text-cyan-400">AES-256</span></div>
              <div>THREAT_STATUS: <span className="text-green-400 animate-pulse">CLEAR</span></div>
            </motion.div>
          </div>
          
          <div className="border-t border-gray-700/50 pt-6">
            <p className="text-gray-400 font-exo mb-2">
              © 2024-2025 Rogue Runner. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 font-space-mono">
              <GlitchText text="ROGUE_RUNNER_v2.4.7 | BUILD_20241213 | NEURAL_NET_ACTIVE" />
            </p>
          </div>
        </div>
        
        {/* Enhanced Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              ['bg-cyan-400/30', 'bg-purple-400/50', 'bg-pink-400/40'][i % 3]
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </footer>
    </div>
  );
};

export default Index;
