import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Try sign up first, then sign in
    const { error: signUpError } = await signUp(email, password);
    
    if (signUpError && !signUpError.message.includes('already registered')) {
      // If not already registered error, try sign in
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        toast({ title: 'Error', description: signInError.message, variant: 'destructive' });
        setLoading(false);
        return;
      }
    }
    
    // If signup succeeded or user exists, sign in
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome!' });
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md gradient-border p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold gradient-text">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="pl-11 h-12 bg-card"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="pl-11 h-12 bg-card"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 btn-aurora rounded-full">
            {loading ? 'Signing in...' : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}