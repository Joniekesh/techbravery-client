import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to TechBravery. How can we help you today?",
      sender: "agent",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages];
    const userMessage = {
      id: newMessages.length + 1,
      text: inputMessage.trim(),
      sender: "user" as const,
      timestamp: new Date()
    };

    newMessages.push(userMessage);
    setMessages(newMessages);
    setInputMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: newMessages.length + 1,
        text: "Thank you for your message! Our team will get back to you shortly. For immediate assistance, please call us at +234 800 123 4567.",
        sender: "agent" as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary-glow animate-glow-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 z-50">
          <Card className="h-full flex flex-col shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Live Support</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80">
                We're here to help! Ask us anything.
              </p>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 h-full overflow-hidden">
              <ScrollArea className="flex-1 p-4 min-h-0 max-h-64 overflow-y-auto">
                <div className="space-y-4 min-h-[200px]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t border-border bg-background sticky bottom-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChat;