"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/api-client";
import { Book } from "@/lib/api-client";

export function CreatePost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [postContent, setPostContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await apiClient.books.searchBooks(searchQuery);
      setSearchResults(response.data.items);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      // First save the book if one is selected
      let bookId;
      if (selectedBook) {
        const saveResponse = await apiClient.books.saveGoogleBook(
          selectedBook.id
        );
        bookId = saveResponse.data.id;
      }

      // Create the post
      await apiClient.posts.createPost({
        content: postContent,
        book: bookId,
      });

      // Reset form
      setPostContent("");
      setSelectedBook(null);
      setSearchQuery("");
      setSearchResults([]);

      toast({
        title: "Success",
        description: "Your post has been created!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Book Search */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Search for a book..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={book.imageLinks?.thumbnail || "/placeholder-book.jpg"}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {book.authors.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Book */}
          {selectedBook && (
            <div className="mt-2 flex items-center gap-2 p-2 bg-accent rounded-md">
              <img
                src={
                  selectedBook.imageLinks?.thumbnail || "/placeholder-book.jpg"
                }
                alt={selectedBook.title}
                className="w-10 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{selectedBook.title}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedBook.authors.join(", ")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedBook(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="space-y-2">
          <textarea
            className="w-full min-h-[100px] p-2 rounded-md border bg-background"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleCreatePost}
              disabled={isCreating || !postContent.trim()}
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
