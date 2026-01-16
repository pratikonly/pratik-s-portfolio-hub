import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const responses: Record<string, string> = {
  skills: "I specialize in HTML5, CSS3, JavaScript, React, Sass, and Bootstrap. I'm also proficient with Git, NPM, Figma, and responsive design!",
  projects: "I've built several projects including PirateOne (streaming platform), Exciler (temp email service), Nest (chat app), and more. Check out my Projects section!",
  contact: "You can reach me at pratikxdev@outlook.com or connect with me on Discord. I'm currently available for freelance work!",
  experience: "I have 2+ years of experience in web development, with 15+ projects completed and happy clients.",
  hire: "I'm available for freelance projects! Email me at pratikxdev@outlook.com with your project details.",
  default: "I can help you learn about my skills, projects, or how to contact me. What would you like to know?",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('know')) return responses.skills;
  if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) return responses.projects;
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return responses.contact;
  if (lower.includes('experience') || lower.includes('year')) return responses.experience;
  if (lower.includes('hire') || lower.includes('freelance') || lower.includes('available')) return responses.hire;
  return responses.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi there! 👋 I'm Pratik's portfolio assistant. Ask me about skills, projects, or how to get in touch!" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', content: getResponse(userMessage) }]);
    }, 500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg glow-effect"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-medium">Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="bg-secondary border-0"
              />
              <Button size="icon" onClick={handleSend} className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
