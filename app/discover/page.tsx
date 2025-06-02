"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookCard } from "@/components/book-card";
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Clock,
  Heart,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useToast } from "@/lib/hooks/use-toast";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Poetry",
  "Thriller",
  "Young Adult",
];

const featuredBooks = [
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover:
      "http://books.google.com/books/content?id=njVpDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 1234,
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets about her glamorous and scandalous life.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover:
      "http://books.google.com/books/content?id=iEiHEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.7,
    reviewCount: 892,
    description:
      "A lone astronaut must save humanity in this thrilling science fiction adventure filled with humor and heart.",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover:
      "http://books.google.com/books/content?id=SbjrDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.3,
    reviewCount: 567,
    description:
      "A haunting story told from the perspective of an artificial friend, exploring love, sacrifice, and what it means to be human.",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover:
      "http://books.google.com/books/content?id=ho-rEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.5,
    reviewCount: 743,
    description:
      "Between life and death lies the Midnight Library, where Nora Seed must choose what kind of life to live.",
  },
  {
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover:
      "http://books.google.com/books/content?id=Eka9DAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.5,
    reviewCount: 2201,
    description:
      "After building what should be a perfect life with neurosurgeon Ryle Kincaid, Lily finds herself in a troubled relationship with an abusive husband and must make a decision about her future, as she reencounters Atlas Corrigan, a man with links to her past.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover:
      "http://books.google.com/books/content?id=NpvGCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.7,
    reviewCount: 2437,
    description:
      "This heartfelt book, never left my bedside for the duration of the read... Colm is a force of goodness and his strength and determination has a way of helping the reader feel safe and held throughout this journey of transformation.",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    cover:
      "http://books.google.com/books/content?id=Df290AEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.6,
    reviewCount: 109,
    description:
      "An intelligent, moving and gripping read' Gillian McAllister What would you do if your husband became another person overnight? When Molly married Alex Frazer, she knew it was for ever.",
  },
  {
    title: "The Stand",
    author: "Stephen King",
    cover:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXo-b88QhSgSuDp9m4J8KTKVPQeu3GQWfsN8t29Gq_RvjDYtpU1wwrM8BMMqcOT5bmI8lGfwz3eDWQwdd3ONfaoTUEDbdxP0B1a48rHRs",
    rating: 4.7,
    reviewCount: 405,
    description:
      "When Brooks volunteered to be a stand-in for Burdette's cousin who got stood up for Homecoming, it was with the noblest of intentions—helping a fellow human being, free of charge.",
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    cover:
      "http://books.google.com/books/content?id=MagHtB5NKVcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.7,
    reviewCount: 1232,
    description:
      "The tenth-anniversary edition of the book that changed lives in profound ways, now with a new foreword and afterword.",
  },
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    cover:
      "http://books.google.com/books/content?id=GynbBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 175,
    description:
      "The first instalment of the GLOBAL PHENOMENON and TikTok sensation, from multi-million selling and #1 Sunday Times bestselling author Sarah J. Maas Maas has established herself as a fantasy fiction titan – Time Harry Potter magic, Taylor Swift sass, Fifty Shades-level athleticism – The Sunday Times With bits of Buffy, Game of Thrones and Outlander, this is a glorious series of total joy – Stylist Spiced with slick plotting and atmospheric world-building ... a page-turning delight – Guardian ****** Feyre is a huntress, but when she kills what she thinks is a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor, Tamlin, is not truly a beast, but one of the lethal, immortal Fae. And there's more to the Fae than the legends suggest.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
    cover:
      "http://books.google.com/books/content?id=ScdAEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.6,
    reviewCount: 631,
    description:
      'The Catcher in the Rye," written by J.D. Salinger and published in 1951, is a classic American novel that explores the themes of adolescence, alienation, and identity through the eyes of its protagonist, Holden Caulfield. The novel is set in the 1950s and follows Holden, a 16-year-old who has just been expelled from his prep school, Pencey Prep.',
  },
];

const trendingBooks = [
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    cover:
      "http://books.google.com/books/content?id=EP-gEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 2156,
    description:
      "Dragons, war college, and a deadly curriculum. Violet Sorrengail was supposed to enter the Scribe Quadrant, but she's thrust into the riders.",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover:
      "http://books.google.com/books/content?id=uW_8EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.6,
    reviewCount: 1432,
    description:
      "A novel about friendship, art, and identity, following two friends who create a groundbreaking video game.",
  },
];

interface SearchResult {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  reviewCount: number;
  publishedDate?: string;
  publisher?: string;
}

type TransformedBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  reviewCount: number;
  publishedDate?: string;
  publisher?: string;
};

interface GoogleBookResponse {
  kind: string;
  totalItems: number;
  items?: Array<{
    id: string;
    volumeInfo?: {
      title?: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
      averageRating?: number;
      ratingsCount?: number;
      publishedDate?: string;
      publisher?: string;
    };
  }>;
}

export default function DiscoverPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/search/?q=${encodeURIComponent(
          searchQuery.trim()
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Search failed with status: ${response.status}`
        );
      }

      const data: GoogleBookResponse = await response.json();
      console.log("Raw API response:", data); // Log the raw response

      if (!data.items || !Array.isArray(data.items)) {
        console.log("No items array in response:", data);
        setSearchResults([]);
        return;
      }

      console.log("Number of items:", data.items.length);
      console.log("First item:", data.items[0]); // Log the first item

      // Transform the Google Books data to match our SearchResult interface
      const transformedData = data.items
        .filter((book) => {
          const hasVolumeInfo = Boolean(book?.volumeInfo);
          if (!hasVolumeInfo) {
            console.log("Filtered out item without volumeInfo:", book);
          }
          return hasVolumeInfo;
        })
        .map((book): TransformedBook | null => {
          try {
            const volumeInfo = book.volumeInfo!;
            console.log("Processing book:", book.id, volumeInfo.title);

            return {
              id: book.id || String(Math.random()),
              title: volumeInfo.title || "Untitled",
              author: volumeInfo.authors?.join(", ") || "Unknown Author",
              cover:
                volumeInfo.imageLinks?.thumbnail ||
                volumeInfo.imageLinks?.smallThumbnail ||
                "/placeholder-book.png",
              description: volumeInfo.description || "No description available",
              rating: volumeInfo.averageRating || 0,
              reviewCount: volumeInfo.ratingsCount || 0,
              publishedDate: volumeInfo.publishedDate,
              publisher: volumeInfo.publisher,
            };
          } catch (error) {
            console.error("Error processing book:", book, error);
            return null;
          }
        })
        .filter((book): book is TransformedBook => book !== null);

      console.log("Final transformed data:", transformedData);
      setSearchResults(transformedData as SearchResult[]);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      toast({
        title: "Search Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to connect to search server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            Discover Books
          </h1>
          <p className="text-purple-600">
            Find your next great read from our curated collection
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative" ref={searchContainerRef}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                    <Input
                      placeholder="Search books, authors, or genres..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (!e.target.value.trim()) {
                          setSearchResults([]);
                          setShowResults(false);
                        }
                      }}
                      onKeyPress={handleKeyPress}
                      onFocus={() => {
                        if (searchQuery.trim()) {
                          setShowResults(true);
                        }
                      }}
                      className="pl-10 border-[#D9BDF4]/30 focus:border-[#D9BDF4]"
                    />
                    {isSearching && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400 animate-spin" />
                    )}
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#D9BDF4] text-purple-700"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Genre Tags */}
            <div className="mt-4">
              <p className="text-sm font-medium text-purple-700 mb-3">
                Browse by Genre:
              </p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={
                      selectedGenres.includes(genre) ? "default" : "outline"
                    }
                    className={`cursor-pointer transition-colors ${
                      selectedGenres.includes(genre)
                        ? "bg-[#D9BDF4] text-purple-900 hover:bg-[#C9A9E4]"
                        : "border-[#D9BDF4] text-purple-700 hover:bg-[#D9BDF4]/10"
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results Section */}
        {searchQuery.trim() && (
          <Card className="mb-8 border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center">
                <Search className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                Search Results for "{searchQuery}"
              </CardTitle>
              <p className="text-sm text-purple-600">
                {isSearching
                  ? "Searching..."
                  : searchResults.length > 0
                  ? `Found ${searchResults.length} books`
                  : "No books found"}
              </p>
            </CardHeader>
            <CardContent>
              {isSearching ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((book) => (
                    <div
                      key={book.id}
                      className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-12 h-18 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <Link href={`/books/${book.id}`}>
                            <button className="font-medium text-sm text-purple-800 line-clamp-1">
                              {book.title}
                            </button>
                          </Link>
                          <p className="text-xs text-purple-600 line-clamp-1">
                            {book.author}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1 text-purple-700">
                              {book.rating.toFixed(1)}
                            </span>
                            <span className="text-xs ml-1 text-purple-500">
                              ({book.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-purple-600">
                  {searchQuery.trim()
                    ? "No books found matching your search criteria"
                    : "Enter a search term to find books"}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 border border-[#D9BDF4]/20">
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              <Star className="h-4 w-4 mr-2" />
              Featured
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              <Clock className="h-4 w-4 mr-2" />
              New Releases
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              <Heart className="h-4 w-4 mr-2" />
              Most Loved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                  Editor's Picks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredBooks.map((book, index) => (
                    <BookCard key={index} {...book} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendingBooks.map((book, index) => (
                    <BookCard key={index} {...book} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                  Fresh Releases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredBooks.slice(0, 2).map((book, index) => (
                    <BookCard key={index} {...book} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                  Community Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredBooks.slice(1, 3).map((book, index) => (
                    <BookCard key={index} {...book} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reading Recommendations */}
        <Card className="mt-8 border-[#D9BDF4]/20 bg-gradient-to-r from-[#D9BDF4]/10 to-purple-100/30">
          <CardHeader>
            <CardTitle className="text-purple-800">
              Personalized for You
            </CardTitle>
            <p className="text-purple-600">
              Based on your reading history and preferences
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredBooks.slice(0, 3).map((book, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-12 h-18 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <Link href={`/books/${book.title}`}>
                        <button className="font-medium text-sm text-purple-800 line-clamp-1">
                          {book.title}
                        </button>
                      </Link>
                      <p className="text-xs text-purple-600 line-clamp-1">
                        {book.author}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1 text-purple-700">
                          {book.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
