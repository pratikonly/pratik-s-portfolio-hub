import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

const responses: Record<string, { keywords: string[]; response: string }[]> = {
  greetings: [
    { keywords: ['hi', 'hello', 'hey', 'hola', 'sup'], response: "Hey there! 👋 Great to meet you! I'm here to tell you all about Pratik's work. What would you like to know?" }
  ],
  help: [
    { keywords: ['help', 'what can you do', 'how can you help', 'capabilities'], response: "🤖 **How I Can Help:**\n\n• Tell you about **Pratik's skills** and technologies\n• Share details about **specific projects**\n• Provide **contact information** (email, Discord, GitHub)\n• Explain how to **send feedback** or reach out\n• Share **availability** for freelance/hire\n• Guide you through the **portfolio sections**\n\nJust ask me anything!" }
  ],
  skills: [
    { keywords: ['skill', 'tech', 'know', 'language', 'framework', 'tool'], response: "💻 **Technical Skills:**\n\n• **Frontend:** HTML5, CSS3, JavaScript, React, TypeScript\n• **Styling:** Tailwind CSS, Sass, Bootstrap\n• **Tools:** Git, GitHub, VS Code, Figma, NPM\n• **Other:** Responsive Design, API Integration, UI/UX\n\nWant to know about specific projects using these?" }
  ],
  projects: [
    { keywords: ['project', 'work', 'portfolio', 'build', 'made', 'create', 'all project'], response: "🚀 **All Projects:**\n\n1. **PirateOne** - Streaming platform\n2. **Nest** - Real-time chat app\n3. **Exciler** - Temp email service\n4. **Devtri Seczone** - Corporate website\n5. **NotaForge** - Note-taking app\n6. **CloudVault v2** - Resource sharing\n7. **CloudVault** - Digital arsenal\n8. **Window Activation** - Windows tool\n9. **Portfolio** - This website!\n\nAsk about any specific project for details!" }
  ],
  pirateone: [
    { keywords: ['pirate', 'pirateone', 'streaming', 'movie', 'anime', 'watch'], response: "🏴‍☠️ **PirateOne:**\n\nAn advanced web-based entertainment platform featuring:\n• Browse movies, TV shows & anime\n• Powerful search functionality\n• Personal watchlist management\n• Watch history tracking\n• Clean, intuitive interface\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** piratexone.vercel.app\n\nGreat for binge-watchers! 🎬" }
  ],
  nest: [
    { keywords: ['nest', 'chat', 'messaging', 'real-time', 'realtime'], response: "🪺 **Nest:**\n\nA minimalist real-time chat application:\n• User authentication & login\n• Clean, modern interface\n• Real-time messaging\n• Chat history management\n• Option to clear conversations\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** nestxmain.vercel.app\n\nSimple yet effective communication! 💬" }
  ],
  exciler: [
    { keywords: ['exciler', 'burner', 'temp', 'temporary', 'email', 'mail'], response: "📧 **Exciler - Burner Mails:**\n\nA free temporary email service:\n• Instant burner addresses\n• Custom email creation\n• Auto-deleting inbox\n• No registration required\n• Privacy-focused design\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** exciler.vercel.app\n\nPerfect for protecting your privacy! 🔒" }
  ],
  cloudvault: [
    { keywords: ['cloudvault', 'cloud', 'vault', 'resource', 'arsenal', 'digital'], response: "☁️ **CloudVault (v1 & v2):**\n\n**CloudVault v2:**\n• Community-driven platform\n• Categorized online resources\n• Password-protected edits\n• Easy resource sharing\n\n**CloudVault v1 (Digital Arsenal):**\n• Tech resources for developers\n• Curated collection of tools\n• Developer-focused content\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** cloudxvault2.vercel.app & cloudxvault.vercel.app" }
  ],
  notaforge: [
    { keywords: ['notaforge', 'nota', 'note', 'notepad'], response: "📝 **NotaForge:**\n\nA feature-rich note-taking app:\n• Image & file uploads\n• Color customization\n• Note organization\n• Built with Express & PostgreSQL\n• Cloud-synced notes\n\n**Tech:** HTML, CSS, JavaScript, Node.js, PostgreSQL\n**Live:** notepad-main-ftid.onrender.com\n\nYour digital notebook! 📓" }
  ],
  devtri: [
    { keywords: ['devtri', 'seczone', 'corporate', 'company', 'business'], response: "🏢 **Devtri Seczone Private Limited:**\n\nA professional corporate website:\n• Responsive design\n• Modern UI/UX\n• Professional layout\n• Industry-focused content\n• Clean navigation\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** devtriseczone.vercel.app\n\nEmpowering industries! 💼" }
  ],
  window: [
    { keywords: ['window', 'activation', 'activate', 'microsoft'], response: "🪟 **Window Activation Page:**\n\nA helpful utility website:\n• 2 activation methods\n• Easy-to-follow steps\n• Windows OS activation guide\n• Clean, simple interface\n\n**Tech:** HTML, CSS, JavaScript\n**Live:** window-activate.vercel.app" }
  ],
  contact: [
    { keywords: ['contact', 'reach', 'connect', 'get in touch'], response: "📬 **Contact Pratik:**\n\n• **Email:** pratikxdev@outlook.com\n• **Discord:** Check the Contact section\n• **GitHub:** github.com/pratik11500\n\n**Ways to reach out:**\n1. Send an email directly\n2. Connect on Discord for quick chats\n3. Check GitHub for code & contributions\n4. Use the Contact form on this site!\n\nI respond to all messages! 📩" }
  ],
  email: [
    { keywords: ['email', 'mail', 'outlook'], response: "📧 **Email:**\n\n**pratikxdev@outlook.com**\n\nFeel free to email for:\n• Project inquiries\n• Freelance opportunities\n• Collaboration proposals\n• General questions\n\nI usually respond within 24 hours! ⚡" }
  ],
  discord: [
    { keywords: ['discord', 'server', 'dm'], response: "💬 **Discord:**\n\nYou can find my Discord in the Contact section of this portfolio. It's great for:\n• Quick conversations\n• Real-time discussions\n• Casual chats about tech\n• Project brainstorming\n\nDon't hesitate to DM! 🎮" }
  ],
  github: [
    { keywords: ['github', 'git', 'repo', 'repository', 'code', 'source'], response: "💻 **GitHub:**\n\n**github.com/pratik11500**\n\nOn my GitHub you'll find:\n• Source code for projects\n• Open-source contributions\n• Code samples & experiments\n• Project documentation\n\nFeel free to star repos you like! ⭐" }
  ],
  feedback: [
    { keywords: ['feedback', 'review', 'comment', 'suggestion', 'opinion'], response: "💭 **Send Feedback:**\n\nI'd love to hear from you! You can:\n\n1. **Use the Contact Form** - Scroll to the Contact section and fill out the form\n2. **Email directly** - pratikxdev@outlook.com\n3. **Discord** - For quick feedback\n\nAll feedback helps me improve! Whether it's about:\n• This portfolio\n• My projects\n• Suggestions for new features\n• Bug reports\n\nYour input is valued! 🙏" }
  ],
  experience: [
    { keywords: ['experience', 'year', 'long', 'background', 'journey'], response: "📊 **Experience:**\n\n• **2+ Years** in Web Development\n• **15+ Projects** Completed\n• **Multiple Happy Clients**\n• Specialized in Frontend Development\n• Self-taught & continuously learning\n\nI'm passionate about creating beautiful, functional web experiences!" }
  ],
  hire: [
    { keywords: ['hire', 'freelance', 'available', 'job', 'work together', 'collaborate', 'opportunity'], response: "✨ **Hire Me:**\n\nCurrently available for:\n• **Freelance Projects**\n• **Full-time Opportunities**\n• **Collaborations**\n• **Contract Work**\n\n**How to proceed:**\n1. Email: pratikxdev@outlook.com\n2. Include project details\n3. Share your timeline & budget\n4. I'll get back within 24 hours!\n\nLet's build something amazing! 🚀" }
  ],
  about: [
    { keywords: ['about', 'who', 'yourself', 'pratik', 'you', 'introduce'], response: "👨‍💻 **About Pratik:**\n\nA passionate Frontend Developer who:\n• Creates beautiful web experiences\n• Focuses on clean, maintainable code\n• Values modern design & UX\n• Loves learning new technologies\n• Builds projects that solve problems\n\nCheck the 'Who I Am' section for the full story! 🌟" }
  ],
  thanks: [
    { keywords: ['thank', 'thanks', 'thx', 'appreciate', 'awesome', 'great', 'cool'], response: "You're welcome! 😊 I'm glad I could help!\n\nAnything else you'd like to know about Pratik's work, projects, or how to get in touch?" }
  ],
  bye: [
    { keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'exit'], response: "Goodbye! 👋 Thanks for chatting!\n\nRemember:\n📧 pratikxdev@outlook.com\n💻 github.com/pratik11500\n\nFeel free to come back anytime. Best of luck! ✨" }
  ]
};

const suggestions = [
  "What can you help with?",
  "Tell me about PirateOne",
  "How can I contact you?",
  "Show all projects"
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Check each category for matching keywords
  for (const category of Object.values(responses)) {
    for (const item of category) {
      if (item.keywords.some(keyword => lower.includes(keyword))) {
        return item.response;
      }
    }
  }
  
  return "🤔 I'm not sure about that, but I can help with:\n\n• **Skills** - Technologies I know\n• **Projects** - Work I've built (PirateOne, Nest, etc.)\n• **Contact** - Email, Discord, GitHub\n• **Feedback** - How to share thoughts\n• **Hire** - Availability for work\n\nTry asking about any of these! 💡";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "👋 Hi! I'm Pratik's AI assistant.\n\nI can help you with:\n• Project details\n• Contact info (email, Discord, GitHub)\n• Skills & experience\n• How to send feedback\n\nWhat would you like to know?" },
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
