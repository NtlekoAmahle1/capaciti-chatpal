
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t border-capaciti-navy/10 bg-white/50 backdrop-blur-sm"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border-capaciti-navy/20 focus-visible:ring-capaciti-red/30"
        disabled={disabled}
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !message.trim()}
        className="bg-capaciti-red hover:bg-capaciti-red/90 shadow-md shadow-capaciti-red/20"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};
