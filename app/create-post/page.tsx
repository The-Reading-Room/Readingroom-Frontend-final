"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ImageIcon, X, BookOpen, Star } from "lucide-react"
import Image from "next/image"

export default function CreatePostPage() {
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [postContent, setPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [postType, setPostType] = useState<"post" | "review">("post")
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")

  const mockBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 3,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "/placeholder.svg?height=120&width=80",
    },
  ]

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Share Your Thoughts</h1>
          <p className="text-purple-600">What book is on your mind today?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Book Selection */}
          <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <BookOpen className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                Select a Book
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                <Input
                  placeholder="Search for a book..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-[#D9BDF4]/30 focus:border-[#D9BDF4]"
                />
              </div>

              {selectedBook ? (
                <div className="p-4 border border-[#D9BDF4]/30 rounded-lg bg-[#D9BDF4]/5">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={selectedBook.cover || "/placeholder.svg"}
                      alt={selectedBook.title}
                      width={60}
                      height={90}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-800">{selectedBook.title}</h3>
                      <p className="text-sm text-purple-600">by {selectedBook.author}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedBook(null)}
                      className="text-purple-400 hover:text-purple-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#D9BDF4]/10 cursor-pointer transition-colors"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Image
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        width={40}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-medium text-sm text-purple-800">{book.title}</p>
                        <p className="text-xs text-purple-600">by {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Post Creation */}
          <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-800">Create Your Content</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={postType === "post" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPostType("post")}
                  className={
                    postType === "post"
                      ? "bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
                      : "border-[#D9BDF4] text-purple-700"
                  }
                >
                  Post
                </Button>
                <Button
                  variant={postType === "review" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPostType("review")}
                  className={
                    postType === "review"
                      ? "bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
                      : "border-[#D9BDF4] text-purple-700"
                  }
                >
                  Review
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {postType === "review" && (
                <>
                  <div>
                    <Label htmlFor="rating" className="text-purple-700">
                      Rating
                    </Label>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reviewTitle" className="text-purple-700">
                      Review Title
                    </Label>
                    <Input
                      id="reviewTitle"
                      placeholder="Give your review a catchy title..."
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="border-[#D9BDF4]/30 focus:border-[#D9BDF4]"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="content" className="text-purple-700">
                  {postType === "post" ? "What's on your mind?" : "Your Review"}
                </Label>
                <Textarea
                  id="content"
                  placeholder={
                    postType === "post"
                      ? "Share your thoughts about this book..."
                      : "Write your detailed review here..."
                  }
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-32 border-[#D9BDF4]/30 focus:border-[#D9BDF4] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" className="border-[#D9BDF4] text-purple-700">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>

                <Button
                  className="bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
                  disabled={!selectedBook || !postContent.trim()}
                >
                  {postType === "post" ? "Share Post" : "Publish Review"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {selectedBook && postContent && (
          <Card className="mt-6 border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-800">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="You" />
                  <AvatarFallback className="bg-[#D9BDF4] text-purple-800">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-purple-800">John Doe</span>
                    <span className="text-purple-600">@johndoe</span>
                    <span className="text-purple-400">·</span>
                    <span className="text-purple-600">now</span>
                  </div>

                  {postType === "review" && (
                    <div className="mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-purple-800">{rating}/5</span>
                      </div>
                      {reviewTitle && <h3 className="font-semibold text-purple-800 mt-1">{reviewTitle}</h3>}
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mb-2">
                    <Image
                      src={selectedBook.cover || "/placeholder.svg"}
                      alt={selectedBook.title}
                      width={20}
                      height={30}
                      className="rounded-sm"
                    />
                    <span className="text-sm text-purple-600">
                      {postType === "post" ? "posted about" : "reviewed"} {selectedBook.title} by {selectedBook.author}
                    </span>
                  </div>

                  <p className="text-purple-800">{postContent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
