import { useState, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface Message {
  text: string;
  isBot: boolean;
}

const SYSTEM_PROMPT = `You are AskCapa, CAPACITI's AI Assistant. CAPACITI is a leading digital skills training provider in Africa. 
Here are key details about CAPACITI:

Programs:
1. Digital Skills:
   - Web Development (HTML, CSS, JavaScript, React)
   - Data Analytics
   - UX/UI Design
   - Digital Marketing

2. Career Development:
   - Professional Communication
   - Interview Preparation
   - CV Writing
   - Personal Branding

3. Business Skills:
   - Project Management
   - Business Analysis
   - Agile Methodologies
   - Leadership Development

Key Features:
- Industry-led training with real-world projects
- Practical, hands-on learning experiences
- Career support and placement assistance
- Flexible learning options
- Expert mentorship
- Industry-recognized certifications

Locations: Available across Africa with a focus on South Africa
Website: https://uvuafrica.com/capaciti/
Contact: Visit https://uvuafrica.com/capaciti/ for contact information

Please provide helpful, accurate information about CAPACITI's programs and services. Be professional but friendly. When asked about specific programs, include details about curriculum, duration, and career prospects.`;

// Get the Supabase URL from environment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

if (!SUPABASE_URL) {
  console.error('VITE_SUPABASE_URL environment variable is not set');
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm AskCapa, your CAPACITI AI Assistant. How can I help you learn more about our programs?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        if (event.results[0].isFinal) {
          handleSendMessage(transcript);
          stopListening();
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
        toast({
          title: "Error",
          description: "Failed to recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Speech recognition not supported:', error);
      toast({
        title: "Error",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!SUPABASE_URL) {
      toast({
        title: "Configuration Error",
        description: "The application is not properly configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    try {
      setMessages((prev) => [...prev, { text: message, isBot: false }]);
      setIsLoading(true);

      const conversationHistory = messages.map(msg => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      }));

      const response = await fetch(`${SUPABASE_URL}/functions/v1/chat`, {
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
      
      setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);

      // Text-to-speech for bot responses
      const speech = new SpeechSynthesisUtterance(data.reply);
      window.speechSynthesis.speak(speech);
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
      <div className="bg-capaciti-navy text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">AskCapa</h2>
        <Button
          size="sm"
          variant="ghost"
          className={`hover:bg-white/20 ${isListening ? 'text-capaciti-red' : 'text-white'}`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
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
