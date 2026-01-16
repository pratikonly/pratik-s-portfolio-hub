import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Generate or get session ID
        let sessionId = sessionStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          sessionStorage.setItem('visitor_session_id', sessionId);
          
          // Track new visitor
          await supabase.from('visitors').insert({
            session_id: sessionId,
            user_agent: navigator.userAgent,
            page_path: window.location.pathname,
          });
        }

        // Fetch current count
        const { data, error } = await supabase
          .from('visitor_count')
          .select('count')
          .eq('id', 1)
          .single();

        if (!error && data) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      } finally {
        setLoading(false);
      }
    };

    trackAndFetchVisitor();
  }, []);

  return { count, loading };
}
