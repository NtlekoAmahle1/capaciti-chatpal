
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { FAQSection } from "@/components/FAQSection";
import { Dashboard } from "@/components/Dashboard";
import { AdminDashboard } from "@/components/AdminDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-capaciti-navy via-capaciti-navy-light to-capaciti-red/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-block px-3 py-1 rounded-full bg-capaciti-red/10 text-capaciti-red text-sm font-medium mb-4">
            AskCapa - CAPACITI AI Assistant
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to CAPACITI Dashboard
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Access CAPACITI's programs, chat with our AI assistant, and explore opportunities
            all in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="chat">AskCapa</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="chat" className="mt-0">
              <ChatInterface />
            </TabsContent>
            <TabsContent value="faq" className="mt-0">
              <FAQSection />
            </TabsContent>
            <TabsContent value="admin" className="mt-0">
              <AdminDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
