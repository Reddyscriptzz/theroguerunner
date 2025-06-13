
import { useState } from 'react';
import { Star, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Testimonial {
  id: string;
  username: string;
  comment: string;
  rating: number;
  date: string;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      username: '@crypto_trader_99',
      comment: 'Incredible returns! Made over $5,000 in my first month. The bot works flawlessly and the support team is amazing.',
      rating: 5,
      date: '2024-06-10'
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
    rating: 5
  });

  const [showForm, setShowForm] = useState(false);

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
      
      setTestimonials([testimonial, ...testimonials]);
      setNewTestimonial({ username: '', comment: '', rating: 5 });
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
                <p className="text-gray-300 font-exo leading-relaxed">
                  "{testimonial.comment}"
                </p>
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
