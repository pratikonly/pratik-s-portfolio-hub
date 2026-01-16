import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, LogOut, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function Admin() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    const [{ data: fb }, { data: vc }] = await Promise.all([
      supabase.from('feedback').select('*').order('created_at', { ascending: false }),
      supabase.from('visitor_count').select('count').eq('id', 1).single(),
    ]);
    setFeedbacks(fb || []);
    setVisitorCount(vc?.count || 0);
    setLoadingData(false);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    await supabase.from('feedback').update({ is_read: !currentStatus }).eq('id', id);
    setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, is_read: !currentStatus } : f)));
  };

  const deleteFeedback = async (id: string) => {
    await supabase.from('feedback').delete().eq('id', id);
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    toast({ title: 'Feedback deleted' });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Visitors</p>
                <p className="text-3xl font-bold">{visitorCount.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="gradient-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Feedback Messages</p>
                <p className="text-3xl font-bold">{feedbacks.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feedback List */}
        <div className="gradient-border p-6">
          <h2 className="text-xl font-heading font-semibold mb-4">Feedback Messages</h2>
          {loadingData ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-muted-foreground">No feedback yet.</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((fb) => (
                <motion.div key={fb.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-lg border ${fb.is_read ? 'border-border bg-card/50' : 'border-primary/30 bg-primary/5'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium truncate">{fb.name}</span>
                        <span className="text-muted-foreground text-sm">({fb.email})</span>
                      </div>
                      <p className="font-medium text-primary mb-1">{fb.subject}</p>
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">{fb.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{new Date(fb.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => toggleRead(fb.id, fb.is_read)}>
                        {fb.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteFeedback(fb.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
