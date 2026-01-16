import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'bot' | 'user';
  content: string;
  isTyping?: boolean;
}

const responses: Record<string, string[]> = {
  greeting: [
    "Hey there! 👋 Great to see you! I'm here to help you learn about Pratik's work.",
    "Hello! Welcome to Pratik's portfolio. What would you like to know?",
    "Hi! I'm Pratik's AI assistant. Ask me anything about his skills or projects!"
  ],
  skills: [
    "Pratik is skilled in HTML5, CSS3, JavaScript, React, Sass, and Bootstrap. He's also proficient with Git, NPM, Figma, and responsive design! 💻",
    "His tech stack includes frontend technologies like React, JavaScript, and CSS frameworks. He's passionate about clean, efficient code!",
  ],
  projects: [
    "Pratik has built awesome projects! 🚀 Including PirateOne (streaming platform), Exciler (temp email service), Nest (real-time chat app), and more. Check out the Projects section!",
    "Some highlights: PirateOne for entertainment, Exciler for privacy-focused temp emails, and Nest for real-time messaging. All built with modern web tech!",
  ],
  contact: [
    "You can reach Pratik at pratikxdev@outlook.com 📧 or connect on Discord. He's currently available for freelance work!",
    "Best way to reach out: pratikxdev@outlook.com. He's open to exciting freelance opportunities!",
  ],
  experience: [
    "Pratik has 2+ years of web development experience with 15+ projects completed and happy clients! 🎯",
    "With over 2 years in the field and 15+ successful projects, Pratik brings solid experience to every project.",
  ],
  hire: [
    "Great news! Pratik is available for freelance projects! 🎉 Email him at pratikxdev@outlook.com with your project details.",
    "Looking to hire? Pratik's ready for new opportunities! Reach out at pratikxdev@outlook.com with your requirements.",
  ],
  thanks: [
    "You're welcome! 😊 Let me know if there's anything else you'd like to know!",
    "Happy to help! Feel free to ask more questions anytime!",
  ],
  default: [
    "I can help you learn about Pratik's skills, projects, experience, or how to contact him. What interests you? 🤔",
    "Not sure I understood that. Try asking about skills, projects, contact info, or freelance availability!",
  ],
};

const quickReplies = [
  { label: "Skills", query: "What are your skills?" },
  { label: "Projects", query: "Show me your projects" },
  { label: "Contact", query: "How can I contact you?" },
  { label: "Hire", query: "Are you available for hire?" },
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  let category = 'default';
  
  if (lower.match(/^(hi|hello|hey|howdy|greetings)/)) category = 'greeting';
  else if (lower.includes('skill') || lower.includes('tech') || lower.includes('know') || lower.includes('stack')) category = 'skills';
  else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) category = 'projects';
  else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('discord')) category = 'contact';
  else if (lower.includes('experience') || lower.includes('year') || lower.includes('background')) category = 'experience';
  else if (lower.includes('hire') || lower.includes('freelance') || lower.includes('available') || lower.includes('job')) category = 'hire';
  else if (lower.includes('thank') || lower.includes('thanks') || lower.includes('awesome') || lower.includes('great')) category = 'thanks';
  
  const options = responses[category];
  return options[Math.floor(Math.random() * options.length)];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hey there! 👋 I'm Pratik's AI assistant. Ask me about skills, projects, or how to get in touch!" },
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
    const userMessage = (text || input).trim();
    if (!userMessage) return;
    
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay for more natural feel
    const typingDelay = 800 + Math.random() * 700;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', content: getResponse(userMessage) }]);
    }, typingDelay);
  };

  return (
    <>
      {/* Floating Bot Button */}
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
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-sm">Pratik's Assistant</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-secondary rounded-bl-md'}`}>
                      {msg.content}
                    </div>
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
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-secondary p-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  onClick={() => handleSend(reply.query)}
                  className="px-3 py-1 text-xs rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="bg-secondary border-0"
              />
              <Button size="icon" onClick={() => handleSend()} className="shrink-0" disabled={isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
