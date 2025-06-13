
import { useState } from 'react';
import { Star, MessageSquare, User, DollarSign, Link2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Testimonial {
  id: string;
  username: string;
  comment: string;
  rating: number;
  date: string;
  transactionAmount?: number;
  profitEarned?: number;
  transactionDate?: string;
  blockchainTxId?: string;
  blockchainChain?: string;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      username: '@crypto_trader_99',
      comment: 'Incredible returns! Made over $5,000 in my first month. The bot works flawlessly and the support team is amazing.',
      rating: 5,
      date: '2024-06-10',
      transactionAmount: 1000,
      profitEarned: 5000,
      transactionDate: '2024-05-15',
      blockchainTxId: '0x742d35Cc6634C0532925a3b8D2c1d1c5b8A6A8B',
      blockchainChain: 'ethereum'
    },
    {
      id: '2',
      username: '@financial_freedom',
      comment: 'Best investment decision I ever made. The compound interest feature is a game changer!',
      rating: 5,
      date: '2024-06-08'
    },
    {
      id: '3',
      username: '@smart_investor',
      comment: 'Professional setup, transparent fees, and consistent profits. Highly recommend to everyone.',
      rating: 4,
      date: '2024-06-05'
    }
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    username: '',
    comment: '',
    rating: 5,
    transactionAmount: '',
    profitEarned: '',
    transactionDate: '',
    blockchainTxId: '',
    blockchainChain: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [includeTransactionDetails, setIncludeTransactionDetails] = useState(false);

  const blockchainChains = [
    { value: 'ethereum', label: 'Ethereum (ETH)' },
    { value: 'bitcoin', label: 'Bitcoin (BTC)' },
    { value: 'binance', label: 'Binance Smart Chain (BSC)' },
    { value: 'polygon', label: 'Polygon (MATIC)' },
    { value: 'solana', label: 'Solana (SOL)' },
    { value: 'avalanche', label: 'Avalanche (AVAX)' },
    { value: 'cardano', label: 'Cardano (ADA)' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTestimonial.username && newTestimonial.comment) {
      const testimonial: Testimonial = {
        id: Date.now().toString(),
        username: newTestimonial.username.startsWith('@') ? newTestimonial.username : `@${newTestimonial.username}`,
        comment: newTestimonial.comment,
        rating: newTestimonial.rating,
        date: new Date().toISOString().split('T')[0]
      };
      
      if (includeTransactionDetails) {
        if (newTestimonial.transactionAmount) testimonial.transactionAmount = parseFloat(newTestimonial.transactionAmount);
        if (newTestimonial.profitEarned) testimonial.profitEarned = parseFloat(newTestimonial.profitEarned);
        if (newTestimonial.transactionDate) testimonial.transactionDate = newTestimonial.transactionDate;
        if (newTestimonial.blockchainTxId) testimonial.blockchainTxId = newTestimonial.blockchainTxId;
        if (newTestimonial.blockchainChain) testimonial.blockchainChain = newTestimonial.blockchainChain;
      }
      
      setTestimonials([testimonial, ...testimonials]);
      setNewTestimonial({ username: '', comment: '', rating: 5, transactionAmount: '', profitEarned: '', transactionDate: '', blockchainTxId: '', blockchainChain: '' });
      setIncludeTransactionDetails(false);
      setShowForm(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const getChainLabel = (chainValue: string) => {
    const chain = blockchainChains.find(c => c.value === chainValue);
    return chain ? chain.label : chainValue;
  };

  const truncateTxId = (txId: string) => {
    if (txId.length <= 16) return txId;
    return `${txId.substring(0, 8)}...${txId.substring(txId.length - 8)}`;
  };

  return (
    <section id="testimonials" className="py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-orbitron">User Testimonials</h2>
          </div>
          <p className="text-gray-400 text-lg font-exo mb-4">
            Real feedback from our trading community
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-cyan-400 font-semibold font-space-mono">
              {averageRating.toFixed(1)} / 5.0
            </span>
            <span className="text-gray-400 font-exo">
              ({testimonials.length} reviews)
            </span>
          </div>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 font-exo"
          >
            Share Your Experience
          </Button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <Card className="bg-gray-900/50 border-gray-700 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-cyan-400 font-orbitron">Share Your Testimonial</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-white font-exo">
                    Telegram Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={newTestimonial.username}
                    onChange={(e) => setNewTestimonial({...newTestimonial, username: e.target.value})}
                    placeholder="@your_username"
                    className="bg-gray-800 border-gray-700 text-white font-space-mono"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="comment" className="text-white font-exo">
                    Your Experience
                  </Label>
                  <Textarea
                    id="comment"
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                    placeholder="Share your experience with our trading bot..."
                    className="bg-gray-800 border-gray-700 text-white font-exo min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-white font-exo mb-2 block">Rating</Label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewTestimonial({...newTestimonial, rating: i + 1})}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            i < newTestimonial.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-400 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeTransaction"
                    checked={includeTransactionDetails}
                    onCheckedChange={(checked) => setIncludeTransactionDetails(!!checked)}
                  />
                  <Label htmlFor="includeTransaction" className="text-cyan-400 font-exo text-sm">
                    Include transaction details (optional)
                  </Label>
                </div>

                {includeTransactionDetails && (
                  <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/30">
                    <p className="text-cyan-400 text-sm font-exo">Share your trading success (all fields optional)</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transactionAmount" className="text-white font-exo text-sm">
                          Initial Investment ($)
                        </Label>
                        <Input
                          id="transactionAmount"
                          type="number"
                          value={newTestimonial.transactionAmount}
                          onChange={(e) => setNewTestimonial({...newTestimonial, transactionAmount: e.target.value})}
                          placeholder="1000"
                          className="bg-gray-700 border-gray-600 text-white font-space-mono"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="profitEarned" className="text-white font-exo text-sm">
                          Profit Earned ($)
                        </Label>
                        <Input
                          id="profitEarned"
                          type="number"
                          value={newTestimonial.profitEarned}
                          onChange={(e) => setNewTestimonial({...newTestimonial, profitEarned: e.target.value})}
                          placeholder="2500"
                          className="bg-gray-700 border-gray-600 text-white font-space-mono"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="transactionDate" className="text-white font-exo text-sm">
                        Transaction Date
                      </Label>
                      <Input
                        id="transactionDate"
                        type="date"
                        value={newTestimonial.transactionDate}
                        onChange={(e) => setNewTestimonial({...newTestimonial, transactionDate: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white font-space-mono"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blockchainChain" className="text-white font-exo text-sm">
                          Blockchain Chain
                        </Label>
                        <Select
                          value={newTestimonial.blockchainChain}
                          onValueChange={(value) => setNewTestimonial({...newTestimonial, blockchainChain: value})}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white font-space-mono">
                            <SelectValue placeholder="Select chain" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {blockchainChains.map((chain) => (
                              <SelectItem key={chain.value} value={chain.value} className="text-white hover:bg-gray-700">
                                {chain.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="blockchainTxId" className="text-white font-exo text-sm">
                          Transaction ID
                        </Label>
                        <Input
                          id="blockchainTxId"
                          type="text"
                          value={newTestimonial.blockchainTxId}
                          onChange={(e) => setNewTestimonial({...newTestimonial, blockchainTxId: e.target.value})}
                          placeholder="0x742d35Cc6634C0532925a..."
                          className="bg-gray-700 border-gray-600 text-white font-space-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-exo"
                  >
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 font-exo"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-cyan-600 rounded-full p-2 mr-3">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-semibold font-space-mono text-sm">
                      {testimonial.username}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-gray-500 text-xs font-exo">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 font-exo leading-relaxed mb-4">
                  "{testimonial.comment}"
                </p>

                {(testimonial.transactionAmount || testimonial.profitEarned || testimonial.blockchainTxId) && (
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex items-center text-green-400 text-xs font-exo mb-2">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>Verified Transaction</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      {testimonial.transactionAmount && (
                        <div>
                          <span className="text-gray-400">Invested: </span>
                          <span className="text-white font-space-mono">${testimonial.transactionAmount}</span>
                        </div>
                      )}
                      {testimonial.profitEarned && (
                        <div>
                          <span className="text-gray-400">Earned: </span>
                          <span className="text-green-400 font-space-mono">${testimonial.profitEarned}</span>
                        </div>
                      )}
                    </div>
                    {testimonial.transactionDate && (
                      <div className="text-xs text-gray-500 mb-2">
                        Date: {new Date(testimonial.transactionDate).toLocaleDateString()}
                      </div>
                    )}
                    {testimonial.blockchainTxId && (
                      <div className="space-y-1">
                        {testimonial.blockchainChain && (
                          <div className="flex items-center text-xs">
                            <Zap className="h-3 w-3 mr-1 text-cyan-400" />
                            <span className="text-gray-400">Chain: </span>
                            <span className="text-cyan-400 font-space-mono ml-1">
                              {getChainLabel(testimonial.blockchainChain)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center text-xs">
                          <Link2 className="h-3 w-3 mr-1 text-cyan-400" />
                          <span className="text-gray-400">TX: </span>
                          <span className="text-cyan-400 font-space-mono ml-1 break-all">
                            {truncateTxId(testimonial.blockchainTxId)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-exo">
            * Testimonials are from verified users of our platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
