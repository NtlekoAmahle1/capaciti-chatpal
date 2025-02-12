
import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

const SYSTEM_PROMPT = `You are CAPACITI's AI Assistant. CAPACITI is a leading digital skills training provider in Africa. 
Here are key details about CAPACITI:
- Offers programs in Digital Skills, Career Development, and Business Skills
- Provides industry-led training with real-world projects
- Focuses on practical, hands-on learning experiences
- Offers career support and placement assistance
- Has flexible learning options
- Main website: https://uvuafrica.com/capaciti/

Please provide helpful, accurate information about CAPACITI's programs and services. Be professional but friendly.`;

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm the CAPACITI AI Assistant. How can I help you learn more about our programs?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    try {
      // Add user message
      setMessages((prev) => [...prev, { text: message, isBot: false }]);
      setIsLoading(true);

      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      }));

      // Make API call to Supabase Edge Function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: "user", content: message }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add AI response
      setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-white to-capaciti-red/5 rounded-lg shadow-lg overflow-hidden border border-capaciti-navy/10">
      <div className="bg-capaciti-navy text-white px-4 py-3">
        <h2 className="text-lg font-semibold">CAPACITI Chat Assistant</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};
