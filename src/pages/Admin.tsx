import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, LogOut, Trash2, Eye, EyeOff, 
  Monitor, Smartphone, Tablet, Globe, Clock,
  Chrome, RefreshCw, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Feedback {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface Visitor {
  id: string;
  session_id: string;
  user_agent: string | null;
  ip_hash: string | null;
  page_path: string | null;
  created_at: string;
}

interface ParsedVisitor extends Visitor {
  browser: string;
  os: string;
  device: string;
  deviceIcon: React.ReactNode;
}

function parseUserAgent(ua: string | null): { browser: string; os: string; device: string; deviceIcon: React.ReactNode } {
  if (!ua) return { browser: 'Unknown', os: 'Unknown', device: 'Unknown', deviceIcon: <Monitor className="w-4 h-4" /> };
  
  // Browser detection
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
  
  // OS detection
  let os = 'Unknown';
  if (ua.includes('Windows NT 10')) os = 'Windows 10/11';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux')) os = 'Linux';
  
  // Device detection
  let device = 'Desktop';
  let deviceIcon = <Monitor className="w-4 h-4" />;
  if (ua.includes('Mobile') || ua.includes('Android') && !ua.includes('Tablet')) {
    device = 'Mobile';
    deviceIcon = <Smartphone className="w-4 h-4" />;
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    device = 'Tablet';
    deviceIcon = <Tablet className="w-4 h-4" />;
  }
  
  return { browser, os, device, deviceIcon };
}

function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return past.toLocaleDateString();
}

export default function Admin() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [visitors, setVisitors] = useState<ParsedVisitor[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
    setRefreshing(true);
    const [{ data: fb }, { data: vc }, { data: vs }] = await Promise.all([
      supabase.from('feedback').select('*').order('created_at', { ascending: false }),
      supabase.from('visitor_count').select('count').eq('id', 1).single(),
      supabase.from('visitors').select('*').order('created_at', { ascending: false }).limit(100),
    ]);
    
    setFeedbacks(fb || []);
    setVisitorCount(vc?.count || 0);
    
    // Parse visitor data
    const parsedVisitors: ParsedVisitor[] = (vs || []).map((v: Visitor) => ({
      ...v,
      ...parseUserAgent(v.user_agent),
    }));
    setVisitors(parsedVisitors);
    
    setLoadingData(false);
    setRefreshing(false);
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

  // Calculate statistics
  const todayVisitors = visitors.filter(v => {
    const today = new Date();
    const visitDate = new Date(v.created_at);
    return visitDate.toDateString() === today.toDateString();
  }).length;

  const deviceStats = visitors.reduce((acc, v) => {
    acc[v.device] = (acc[v.device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserStats = visitors.reduce((acc, v) => {
    acc[v.browser] = (acc[v.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const osStats = visitors.reduce((acc, v) => {
    acc[v.os] = (acc[v.os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center relative z-10">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Button variant="aurora" onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm p-4 md:p-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={fetchData} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="aurora-outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Visitors</p>
                <p className="text-2xl font-bold">{visitorCount.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Today</p>
                <p className="text-2xl font-bold">{todayVisitors}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Feedback</p>
                <p className="text-2xl font-bold">{feedbacks.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Unread</p>
                <p className="text-2xl font-bold">{feedbacks.filter(f => !f.is_read).length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="visitors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="visitors" className="space-y-6">
            {/* Device/Browser/OS Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Devices
                </h3>
                <div className="space-y-2">
                  {Object.entries(deviceStats).map(([device, count]) => (
                    <div key={device} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{device}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(count / visitors.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Chrome className="w-4 h-4" /> Browsers
                </h3>
                <div className="space-y-2">
                  {Object.entries(browserStats).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([browser, count]) => (
                    <div key={browser} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{browser}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${(count / visitors.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Operating Systems
                </h3>
                <div className="space-y-2">
                  {Object.entries(osStats).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([os, count]) => (
                    <div key={os} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{os}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${(count / visitors.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Recent Visitors (Last 100)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Device</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Browser</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">OS</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Page</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Session ID</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingData ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-muted-foreground">Loading...</td>
                      </tr>
                    ) : visitors.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-muted-foreground">No visitors yet</td>
                      </tr>
                    ) : (
                      visitors.map((v) => (
                        <tr key={v.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {v.deviceIcon}
                              <span className="text-sm">{v.device}</span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{v.browser}</td>
                          <td className="p-3 text-sm">{v.os}</td>
                          <td className="p-3 text-sm text-muted-foreground">{v.page_path || '/'}</td>
                          <td className="p-3">
                            <code className="text-xs bg-secondary px-2 py-1 rounded">{v.session_id.slice(0, 8)}...</code>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(v.created_at)}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-heading font-semibold mb-4">Feedback Messages</h2>
              {loadingData ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : feedbacks.length === 0 ? (
                <p className="text-muted-foreground">No feedback yet.</p>
              ) : (
                <div className="space-y-4">
                  {feedbacks.map((fb) => (
                    <motion.div 
                      key={fb.id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className={`p-4 rounded-lg border ${fb.is_read ? 'border-border bg-card/50' : 'border-primary/30 bg-primary/5'}`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium truncate">{fb.name}</span>
                            <span className="text-muted-foreground text-sm">({fb.email})</span>
                            {!fb.is_read && (
                              <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">New</span>
                            )}
                          </div>
                          <p className="font-medium text-primary mb-1">{fb.subject}</p>
                          <p className="text-muted-foreground text-sm whitespace-pre-wrap">{fb.message}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                            <Clock className="w-3 h-3" />
                            {new Date(fb.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="icon" variant="ghost" onClick={() => toggleRead(fb.id, fb.is_read)} title={fb.is_read ? 'Mark as unread' : 'Mark as read'}>
                            {fb.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteFeedback(fb.id)} title="Delete feedback">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
