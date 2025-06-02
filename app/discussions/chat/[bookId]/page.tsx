"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import { ArrowLeft, Send, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface BookData {
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  isPrepared?: boolean;
}

interface ChatResponse {
  status: string;
  response: string | null;
  history: string[];
  message?: string;
}

export default function BookChatPage({
  params,
}: {
  params: { bookId: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to start a discussion",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    // Get book data from session storage
    const storedBookData = sessionStorage.getItem(`book_${params.bookId}`);
    if (storedBookData) {
      const parsedData = JSON.parse(storedBookData);
      setBookData(parsedData);
      initializeChat(parsedData);
    } else {
      // If no stored data, redirect back to discussions
      toast({
        title: "Error",
        description: "Book data not found. Please select a book again.",
        variant: "destructive",
      });
      router.push("/discussions");
    }
  }, [params.bookId, user, router, toast]);

  const initializeChat = (data: BookData) => {
    if (!data.isPrepared) {
      toast({
        title: "Error",
        description:
          "Book data is not prepared. Please try selecting the book again.",
        variant: "destructive",
      });
      router.push("/discussions");
      return;
    }

    setMessages([
      {
        role: "bot",
        content: `Welcome! I'm ready to discuss "${data.title}" with you. What would you like to know about this book?`,
      },
    ]);
    setIsInitialized(true);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || !isInitialized || !params.bookId || !user) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.post<ChatResponse>("/api/chat/query", {
        book_id: params.bookId,
        question: userMessage,
        history: messages.map(
          (m) => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`
        ),
      });

      if (response.data.status === "error") {
        throw new Error(response.data.message || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            response.data.response ||
            "Sorry, I couldn't process your question.",
        },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get response";

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `Sorry, I encountered an error: ${errorMessage}`,
        },
      ]);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  if (!bookData) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/discussions")}
            className="text-purple-800 hover:bg-purple-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-purple-800 text-center flex-1">
            {bookData.title}
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <Card className="h-[calc(100vh-12rem)]">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "bot" && (
                    <Avatar className="h-8 w-8 bg-purple-100">
                      <AvatarFallback className="text-purple-800">
                        <BookOpen className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-purple-800 text-white"
                        : "bg-purple-50 text-purple-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 bg-purple-800">
                      <AvatarFallback className="text-white">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 bg-purple-100">
                    <AvatarFallback className="text-purple-800">
                      <BookOpen className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-2 w-2 bg-purple-200 rounded-full" />
                      <div className="h-2 w-2 bg-purple-200 rounded-full" />
                      <div className="h-2 w-2 bg-purple-200 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about the book..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-purple-800 hover:bg-purple-900"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
