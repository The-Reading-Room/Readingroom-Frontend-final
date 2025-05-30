"use client"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/post-card"
import { ReviewCard } from "@/components/review-card"
import {
  Star,
  Bookmark,
  Share,
  MessageCircle,
  Users,
  Calendar,
  Globe,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Mock book data - this would come from your backend/Google Books API
const bookData = {
  id: "1",
  title: "The Seven Husbands of Evelyn Hugo",
  author: "Taylor Jenkins Reid",
  cover: "/placeholder.svg?height=400&width=280",
  rating: 4.8,
  reviewCount: 1234,
  postCount: 89,
  description:
    "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets about her glamorous and scandalous life. From the 1950s to the present day, Evelyn Hugo's story is one of ruthless ambition, unexpected friendship, and a great forbidden love.",
  publishedDate: "2017-06-13",
  pageCount: 400,
  genres: ["Fiction", "Historical Fiction", "Romance", "LGBTQ+"],
  isbn: "9781501161933",
  publisher: "Atria Books",
  language: "English",
  googleBooksId: "abc123",
}

const mockPosts = [
  {
    user: {
      name: "Sarah Chen",
      username: "sarahreads",
      avatar: "/placeholder-user.jpg",
    },
    book: bookData,
    content:
      "Just finished this masterpiece! The way Taylor Jenkins Reid weaves together love, ambition, and sacrifice is absolutely brilliant. Evelyn's story had me completely captivated from start to finish. 📚✨",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    user: {
      name: "Emma Rodriguez",
      username: "literaryemma",
      avatar: "/placeholder-user.jpg",
    },
    book: bookData,
    content:
      "Currently reading this and I'm obsessed! Evelyn is such a complex character. Anyone else think she's based on Elizabeth Taylor? The parallels are uncanny! 👀",
    timestamp: "1 day ago",
    likes: 18,
    comments: 12,
  },
]

const mockReviews = [
  {
    user: {
      name: "Michael Torres",
      username: "bookworm_mike",
      avatar: "/placeholder-user.jpg",
    },
    book: bookData,
    rating: 5,
    title: "A Masterclass in Storytelling",
    content:
      "Taylor Jenkins Reid has crafted something truly special here. This isn't just a story about Hollywood glamour - it's a profound exploration of love, identity, and the prices we pay for our dreams. Evelyn Hugo is a character that will stay with me forever.",
    timestamp: "3 days ago",
    likes: 42,
    comments: 15,
  },
  {
    user: {
      name: "David Kim",
      username: "davidreads",
      avatar: "/placeholder-user.jpg",
    },
    book: bookData,
    rating: 4,
    title: "Compelling but Predictable",
    content:
      "While I enjoyed the glamorous setting and Evelyn's voice, I found some plot points a bit predictable. That said, the emotional core of the story is powerful, and the representation matters. Worth the read for sure.",
    timestamp: "1 week ago",
    likes: 31,
    comments: 9,
  },
]

export default function BookPage() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

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
                  src={bookData.cover || "/placeholder.svg"}
                  alt={bookData.title}
                  width={280}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-purple-800 mb-2">
                    {bookData.title}
                  </h1>
                  <p className="text-xl text-purple-600 mb-4">
                    by {bookData.author}
                  </p>

                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.floor(bookData.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-purple-800">
                        {bookData.rating}
                      </span>
                      <span className="text-purple-600">
                        ({bookData.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-purple-600">
                      <MessageCircle className="h-4 w-4" />
                      <span>{bookData.postCount} posts</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {bookData.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="border-[#D9BDF4] text-purple-700"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-purple-800 leading-relaxed">
                  {bookData.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Published {new Date(bookData.publishedDate).getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Globe className="h-4 w-4" />
                    <span>{bookData.pageCount} pages</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Users className="h-4 w-4" />
                    <span>{bookData.publisher}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Globe className="h-4 w-4" />
                    <span>{bookData.language}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
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
              Posts ({bookData.postCount})
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
            >
              Reviews ({bookData.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPosts.slice(0, 2).map((post, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[#D9BDF4]/5 border border-[#D9BDF4]/20"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm text-purple-800">
                          {post.user.name}
                        </span>
                        <span className="text-purple-600 text-sm">posted</span>
                        <span className="text-purple-400 text-sm">
                          {post.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-purple-800 line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800">Top Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockReviews.slice(0, 2).map((review, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[#D9BDF4]/5 border border-[#D9BDF4]/20"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm text-purple-800">
                          {review.user.name}
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-purple-400 text-sm">
                          {review.timestamp}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm text-purple-800 mb-1">
                        {review.title}
                      </h4>
                      <p className="text-sm text-purple-700 line-clamp-2">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {mockPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {mockReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
