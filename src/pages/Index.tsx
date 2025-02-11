
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-capaciti-red/10 text-capaciti-red text-sm font-medium mb-4">
            CAPACITI AI Assistant
          </div>
          <h1 className="text-4xl font-bold text-capaciti-navy mb-4">
            Welcome to CAPACITI Chat
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant answers about CAPACITI's programs, courses, and opportunities.
            Our AI assistant is here to help you 24/7.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="mt-0">
              <ChatInterface />
            </TabsContent>
            <TabsContent value="faq" className="mt-0">
              <FAQSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
