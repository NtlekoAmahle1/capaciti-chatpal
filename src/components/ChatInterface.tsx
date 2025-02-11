
import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

interface Message {
  text: string;
  isBot: boolean;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm the CAPACITI AI Assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isBot: false }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. I'm a demo version, but I'll be fully functional soon!",
          isBot: true,
        },
      ]);
      setIsLoading(false);
    }, 1000);
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
