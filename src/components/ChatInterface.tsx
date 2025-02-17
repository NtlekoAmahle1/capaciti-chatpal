
import { useState, useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  text: string;
  isBot: boolean;
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
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
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
      toast({
        title: "Listening",
        description: "Speak now...",
      });
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

  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const handleSendMessage = async (message: string) => {
    try {
      setMessages((prev) => [...prev, { text: message, isBot: false }]);
      setIsLoading(true);

      // Format conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text
      }));

      // Add current message to history
      const fullConversation = [
        ...conversationHistory,
        { role: "user", content: message }
      ];

      console.log("Sending conversation to Supabase function:", fullConversation);

      const { data, error } = await Promise.race([
        supabase.functions.invoke('chat', {
          body: { messages: fullConversation },
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
      ]) as any;

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Received response from Supabase function:", data);

      if (data?.reply) {
        setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);

        if (isSpeechEnabled) {
          const speech = new SpeechSynthesisUtterance(data.reply);
          speech.rate = 0.9;
          speech.pitch = 1;
          window.speechSynthesis.speak(speech);
        }
      } else {
        throw new Error('No response received from the chatbot');
      }
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });

      setMessages((prev) => [...prev, {
        text: "I apologize, but I'm having trouble connecting to my backend service. Please try again in a moment.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-white to-capaciti-red/5 rounded-lg shadow-lg overflow-hidden border border-capaciti-navy/10">
      <div className="bg-capaciti-navy text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">AskCapa</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="hover:bg-white/20"
            onClick={toggleSpeech}
          >
            {isSpeechEnabled ? 
              <Volume2 className="h-4 w-4" /> : 
              <VolumeX className="h-4 w-4" />
            }
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`hover:bg-white/20 ${isListening ? 'text-capaciti-red' : 'text-white'}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
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
