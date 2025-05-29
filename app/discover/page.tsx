"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookCard } from "@/components/book-card"
import { Search, Filter, Star, TrendingUp, Clock, Heart } from "lucide-react"

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
]

const featuredBooks = [
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.8,
    reviewCount: 1234,
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets about her glamorous and scandalous life.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.7,
    reviewCount: 892,
    description:
      "A lone astronaut must save humanity in this thrilling science fiction adventure filled with humor and heart.",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.3,
    reviewCount: 567,
    description:
      "A haunting story told from the perspective of an artificial friend, exploring love, sacrifice, and what it means to be human.",
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.5,
    reviewCount: 743,
    description:
      "Between life and death lies the Midnight Library, where Nora Seed must choose what kind of life to live.",
  },
]

const trendingBooks = [
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.8,
    reviewCount: 2156,
    description:
      "Dragons, war college, and a deadly curriculum. Violet Sorrengail was supposed to enter the Scribe Quadrant, but she's thrust into the riders.",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.6,
    reviewCount: 1432,
    description:
      "A novel about friendship, art, and identity, following two friends who create a groundbreaking video game.",
  },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Discover Books</h1>
          <p className="text-purple-600">Find your next great read from our curated collection</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                <Input
                  placeholder="Search books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#D9BDF4]/30 focus:border-[#D9BDF4]"
                />
              </div>
              <Button variant="outline" className="border-[#D9BDF4] text-purple-700">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            {/* Genre Tags */}
            <div className="mt-4">
              <p className="text-sm font-medium text-purple-700 mb-3">Browse by Genre:</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
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
            <TabsTrigger value="new" className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900">
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
            <CardTitle className="text-purple-800">Personalized for You</CardTitle>
            <p className="text-purple-600">Based on your reading history and preferences</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredBooks.slice(0, 3).map((book, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                  <div className="flex items-center space-x-3">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-12 h-18 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-purple-800 line-clamp-1">{book.title}</p>
                      <p className="text-xs text-purple-600 line-clamp-1">{book.author}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1 text-purple-700">{book.rating}</span>
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
  )
}
