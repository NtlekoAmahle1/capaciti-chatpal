
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
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-capaciti-navy text-white",
          isBot ? "bg-capaciti-red" : "bg-capaciti-navy"
        )}
      >
        {avatar || (isBot ? "AI" : "U")}
      </div>
      <div
        className={cn(
          "rounded-lg px-4 py-3 max-w-[80%]",
          isBot
            ? "bg-white text-capaciti-navy shadow-sm"
            : "bg-capaciti-navy text-white"
        )}
      >
        {message}
      </div>
    </div>
  );
};
