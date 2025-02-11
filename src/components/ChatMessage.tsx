
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  avatar?: string;
}

export const ChatMessage = ({ message, isBot = false, avatar }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-4 animate-fade-up",
        isBot ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-white font-semibold",
          isBot ? "bg-capaciti-red shadow-md shadow-capaciti-red/20" : "bg-capaciti-navy shadow-md shadow-capaciti-navy/20"
        )}
      >
        {avatar || (isBot ? "AI" : "U")}
      </div>
      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[80%] shadow-sm",
          isBot
            ? "bg-white text-capaciti-navy border border-capaciti-red/10"
            : "bg-gradient-to-r from-capaciti-navy to-capaciti-navy-light text-white"
        )}
      >
        {message}
      </div>
    </div>
  );
};
