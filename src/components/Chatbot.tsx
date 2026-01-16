import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'bot' | 'user';
  content: string;
  typing?: boolean;
}

const responses: Record<string, { keywords: string[]; response: string }[]> = {
  greetings: [
    { keywords: ['hi', 'hello', 'hey', 'hola', 'sup'], response: "Hey there! 👋 Great to meet you! I'm here to tell you all about Pratik's work. What would you like to know?" }
  ],
  skills: [
    { keywords: ['skill', 'tech', 'know', 'language', 'framework', 'tool'], response: "💻 **Technical Skills:**\n\n• **Frontend:** HTML5, CSS3, JavaScript, React, TypeScript\n• **Styling:** Tailwind CSS, Sass, Bootstrap\n• **Tools:** Git, GitHub, VS Code, Figma, NPM\n• **Other:** Responsive Design, API Integration, UI/UX\n\nWant to know about specific projects using these?" }
  ],
  projects: [
    { keywords: ['project', 'work', 'portfolio', 'build', 'made', 'create'], response: "🚀 **Featured Projects:**\n\n1. **PirateOne** - Streaming platform for movies & anime\n2. **Exciler** - Temporary email service\n3. **Nest** - Real-time chat application\n4. **CloudVault** - Resource sharing platform\n5. **NotaForge** - Note-taking app with file uploads\n\nScroll to the Projects section to see them all! Any specific one you'd like to know more about?" }
  ],
  contact: [
    { keywords: ['contact', 'email', 'reach', 'message', 'connect', 'discord'], response: "📬 **Get in Touch:**\n\n• **Email:** pratikxdev@outlook.com\n• **Discord:** Available in Contact section\n• **GitHub:** Check out my repositories\n\nFeel free to reach out for collaborations or project inquiries!" }
  ],
  experience: [
    { keywords: ['experience', 'year', 'long', 'background'], response: "📊 **Experience:**\n\n• **2+ Years** in Web Development\n• **15+ Projects** Completed\n• **Multiple Happy Clients**\n• Specialized in Frontend Development\n\nI'm constantly learning and building new things!" }
  ],
  hire: [
    { keywords: ['hire', 'freelance', 'available', 'job', 'work together', 'collaborate'], response: "✨ **Availability:**\n\nYes! I'm currently open for:\n• Freelance Projects\n• Full-time Opportunities\n• Collaborations\n\n📧 Email me at **pratikxdev@outlook.com** with your project details and let's create something amazing together!" }
  ],
  about: [
    { keywords: ['about', 'who', 'yourself', 'pratik', 'you'], response: "👨‍💻 **About Pratik:**\n\nI'm a passionate Frontend Developer who loves creating beautiful, functional web experiences. I focus on clean code, modern design, and user-friendly interfaces.\n\nMy goal is to turn ideas into reality through code! Check out the 'Who I Am' section for more details." }
  ],
  thanks: [
    { keywords: ['thank', 'thanks', 'thx', 'appreciate'], response: "You're welcome! 😊 Is there anything else you'd like to know about Pratik's work or how to get in touch?" }
  ],
  bye: [
    { keywords: ['bye', 'goodbye', 'see you', 'later', 'cya'], response: "Goodbye! 👋 Feel free to come back anytime. Don't forget to check out the projects and reach out if you're interested in working together!" }
  ]
};

const suggestions = [
  "What are your skills?",
  "Tell me about projects",
  "How can I contact you?",
  "Are you available for hire?"
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  
  for (const category of Object.values(responses)) {
    for (const item of category) {
      if (item.keywords.some(keyword => lower.includes(keyword))) {
        return item.response;
      }
    }
  }
  
  return "🤔 I'm not sure about that, but I can help you with:\n\n• My **skills** and technologies\n• **Projects** I've built\n• How to **contact** me\n• My **availability** for work\n\nWhat would you like to explore?";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "👋 Hi! I'm Pratik's AI assistant. I can tell you about skills, projects, experience, or how to get in touch.\n\nTry asking me something or use the quick buttons below!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;
    
    setMessages((prev) => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay for more natural feel
    const typingDelay = Math.random() * 500 + 800;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', content: getResponse(messageText) }]);
    }, typingDelay);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg"
        aria-label="Open chat"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="w-6 h-6 text-primary" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <span className="font-semibold text-sm">Portfolio Assistant</span>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-secondary/20">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-card border border-border rounded-bl-md'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions */}
            <div className="px-4 py-2 border-t border-border bg-card/50 flex gap-2 overflow-x-auto">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(suggestion)}
                  className="shrink-0 px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 rounded-full transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2 bg-card">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="bg-secondary border-0 rounded-full"
              />
              <Button size="icon" onClick={() => handleSend()} className="shrink-0 rounded-full">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
