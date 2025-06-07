"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/post-card";
import { ReviewCard } from "@/components/review-card";
import {
  Loader2,
  Star,
  Bookmark,
  Share,
  MessageCircle,
  Users,
  Calendar,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/lib/api-client";

// Define the actual response type based on the backend
interface BookResponse {
  id: string;
  title: string;
  authors: string[];
  description: string;
  cover_image: string;
  published_date: string;
  publisher: string;
  page_count: number;
  language: string;
  average_rating: number;
  categories: string[];
}

export default function BookPage() {
  const params = useParams();
  const { toast } = useToast();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Fetching book with ID:", params.id);
        const response = await apiClient.books.searchBooks(params.id as string);
        console.log("API Response:", response);

        if (
          response.data &&
          response.data.items &&
          response.data.items.length > 0
        ) {
          // Transform the Google Books API response to match our backend format
          const googleBook = response.data.items[0];
          const transformedBook: BookResponse = {
            id: googleBook.id,
            title: googleBook.volumeInfo?.title || "",
            authors: googleBook.volumeInfo?.authors || [],
            description: googleBook.volumeInfo?.description || "",
            cover_image:
              googleBook.volumeInfo?.imageLinks?.thumbnail ||
              "/placeholder.svg",
            published_date: googleBook.volumeInfo?.publishedDate || "",
            publisher: googleBook.volumeInfo?.publisher || "",
            page_count: googleBook.volumeInfo?.pageCount || 0,
            language: googleBook.volumeInfo?.language || "",
            average_rating: googleBook.volumeInfo?.averageRating || 0,
            categories: googleBook.volumeInfo?.categories || [],
          };
          console.log("Transformed book data:", transformedBook);
          setBook(transformedBook);
        } else {
          console.error("No book found in search results");
          toast({
            title: "Error",
            description: "Book not found in search results.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        toast({
          title: "Error",
          description: "Failed to load book details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-purple-600">Book not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6">
        {/* Book Header */}
        <Card className="mb-8 border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  width={280}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-purple-800 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-purple-600 mb-4">
                    by {book.authors.join(", ")}
                  </p>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(book.average_rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-purple-800">
                        {book.average_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {book.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {book.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="border-[#D9BDF4] text-purple-700"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-purple-800 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Calendar className="h-4 w-4" />
                      <span>Published {book.published_date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Users className="h-4 w-4" />
                      <span>{book.publisher}</span>
                    </div>
                    {book.page_count > 0 && (
                      <div className="flex items-center space-x-2 text-purple-600">
                        <Globe className="h-4 w-4" />
                        <span>{book.page_count} pages</span>
                      </div>
                    )}
                    {book.language && (
                      <div className="flex items-center space-x-2 text-purple-600">
                        <Globe className="h-4 w-4" />
                        <span>{book.language}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <Link href="/create-post">
                      <Button className="bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900">
                        Write Review
                      </Button>
                    </Link>
                    <Link href="/create-post">
                      <Button
                        variant="outline"
                        className="border-[#D9BDF4] text-purple-700"
                      >
                        Create Post
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-[#D9BDF4] text-purple-700"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark
                        className={`h-4 w-4 mr-2 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#D9BDF4] text-purple-700"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-[#D9BDF4]/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-800">Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-purple max-w-none">
                  <p>{book.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {/* Posts will be fetched separately */}
            <p className="text-center text-purple-600">Loading posts...</p>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Reviews will be fetched separately */}
            <p className="text-center text-purple-600">Loading reviews...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
