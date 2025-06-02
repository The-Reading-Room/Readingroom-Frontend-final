"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import { Search, BookOpen, Calendar } from "lucide-react";
import Image from "next/image";
import axios from "axios";

interface Book {
  book_id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  published_date?: string;
  publisher?: string;
  categories?: string[];
  page_count?: number;
  language?: string;
}

interface SearchResponse {
  status: string;
  results: Book[];
  total_items?: number;
  message?: string;
}

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter a book title or author to search",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      const response = await api.get<SearchResponse>(`/search-books`, {
        params: {
          q: searchQuery.trim(),
          type: "books",
        },
      });

      if (response.data.status === "error") {
        throw new Error(response.data.message || "Search failed");
      }

      if (response.data.results) {
        response.data.results.forEach((book) => {
          sessionStorage.setItem(`book_${book.book_id}`, JSON.stringify(book));
        });
      }

      setSearchResults(response.data.results || []);
      setTotalItems(response.data.total_items || 0);
    } catch (error) {
      console.error("Search error:", error);
      let errorMessage = "Failed to search books";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        console.error("API Error Details:", {
          status: error.response?.status,
          data: error.response?.data,
          endpoint: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          params: error.config?.params,
        });

        if (error.response?.status === 404) {
          errorMessage =
            "Search endpoint not found. Please check the API configuration.";
        } else if (error.response?.status === 401) {
          errorMessage =
            "Authentication required. Please log in to search books.";
        } else {
          errorMessage = error.response?.data?.message || error.message;
        }
      }

      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive",
      });

      setSearchResults([]);
      setTotalItems(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookSelect = async (book: Book) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to start a discussion",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    try {
      // Show initial loading toast
      toast({
        title: "Checking book data...",
        description: "Verifying if book data is ready",
      });

      // First check if book data exists
      const checkResponse = await api.get("/books/check", {
        params: { book_id: book.book_id },
      });

      let isPrepared = false;
      let message = "";

      if (
        checkResponse.data.status === "success" &&
        checkResponse.data.exists
      ) {
        // Book data already exists
        isPrepared = true;
        message = "Book data is ready";
      } else {
        // Need to prepare the book
        toast({
          title: "Preparing book data...",
          description: "This may take a few moments",
        });

        const prepareResponse = await api.post("/books/prepare", null, {
          params: {
            book_id: book.book_id,
            book_title: book.title,
            author: book.authors?.[0],
          },
        });

        if (prepareResponse.data.status === "error") {
          throw new Error(
            prepareResponse.data.message || "Failed to prepare book data"
          );
        }

        isPrepared = true;
        message = prepareResponse.data.data?.already_exists
          ? "Book data was already ready"
          : "Book data prepared successfully";
      }

      // Store the prepared book data
      sessionStorage.setItem(
        `book_${book.book_id}`,
        JSON.stringify({
          ...book,
          isPrepared,
        })
      );

      // Show success toast
      toast({
        title: "Ready to discuss!",
        description: message,
      });

      // Navigate to chat
      router.push(`/discussions/chat/${book.book_id}`);
    } catch (error) {
      console.error("Error preparing book:", error);
      let errorMessage = "Failed to prepare book data";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
        console.error("API Error:", {
          status: error.response?.status,
          data: error.response?.data,
          endpoint: error.config?.url,
        });
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Book Discussions
          </h1>
          <p className="text-lg text-purple-600">
            Search for a book and start a conversation about it
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              placeholder="Search for a book..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pr-12"
              disabled={isSearching}
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isSearching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800 mx-auto mb-4" />
            <p className="text-purple-600">Searching books...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <>
            <p className="text-center text-purple-600 mb-6">
              Found {totalItems} results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((book) => (
                <Card
                  key={book.book_id}
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => handleBookSelect(book)}
                >
                  <CardHeader className="p-0">
                    <div className="relative w-full h-48">
                      <Image
                        src={book.thumbnail || "/placeholder-book.png"}
                        alt={book.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-purple-800 line-clamp-2 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-purple-600 text-sm mb-2">
                      by {book.authors?.join(", ") || "Unknown Author"}
                    </p>
                    {book.published_date && (
                      <p className="text-sm text-purple-500 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(book.published_date).getFullYear()}
                      </p>
                    )}
                    <p className="text-sm text-purple-600 mt-2 line-clamp-3">
                      {book.description || "No description available."}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-purple-100 text-purple-800 hover:bg-purple-200"
                      variant="ghost"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Discussion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}

        {searchResults.length === 0 && !isSearching && searchQuery && (
          <div className="text-center py-8">
            <p className="text-lg text-purple-600">
              No books found. Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
