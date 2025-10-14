import { ChatInterface } from "@/components/ChatInterface";
import { Navigation } from "@/components/Navigation";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Chat with Mumbai Mitr</h1>
          <p className="text-lg text-muted-foreground">
            Ask anything about Mumbai - attractions, food, culture, travel tips, and more!
          </p>
        </div>

        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;