"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PostCard } from "@/components/post-card"
import { ReviewCard } from "@/components/review-card"
import { MapPin, Calendar, LinkIcon, Users, BookOpen, Star, MessageCircle, Edit, Camera } from "lucide-react"
import Image from "next/image"

const userData = {
  name: "John Doe",
  username: "johndoe",
  bio: "Passionate reader, coffee enthusiast, and lover of literary fiction. Always looking for my next great read! 📚☕",
  location: "San Francisco, CA",
  joinDate: "March 2023",
  website: "johndoe.blog",
  avatar: "/placeholder-user.jpg",
  coverImage: "/placeholder.svg?height=200&width=800",
  stats: {
    followers: 156,
    following: 89,
    booksRead: 23,
    reviewsWritten: 18,
    postsCreated: 42,
  },
  favoriteGenres: ["Fiction", "Mystery", "Sci-Fi", "Biography", "Fantasy"],
}

const userPosts = [
  {
    user: userData,
    book: {
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "/placeholder.svg?height=120&width=80",
    },
    content:
      "Just finished this masterpiece! The way Taylor Jenkins Reid weaves together love, ambition, and sacrifice is absolutely brilliant. Evelyn's story had me completely captivated from start to finish. 📚✨",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    user: userData,
    book: {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "/placeholder.svg?height=120&width=80",
    },
    content:
      "Currently reading this and Ishiguro's prose is just... *chef's kiss* 👌 The way he writes from Klara's perspective is so unique and touching. Anyone else reading this? Would love to discuss!",
    timestamp: "1 day ago",
    likes: 18,
    comments: 12,
  },
]

const userReviews = [
  {
    user: userData,
    book: {
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "/placeholder.svg?height=120&width=80",
    },
    rating: 5,
    title: "A Scientific Adventure That Will Blow Your Mind",
    content:
      "Andy Weir has done it again! This book combines hard science with humor and heart in a way that's absolutely addictive. Grace's journey is both hilarious and deeply moving. The friendship that develops is one of the most beautiful things I've read all year.",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 15,
  },
  {
    user: userData,
    book: {
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/placeholder.svg?height=120&width=80",
    },
    rating: 4,
    title: "A Beautiful Exploration of Life's Possibilities",
    content:
      "This book really made me think about the choices we make and the lives we could have lived. Haig's writing is both philosophical and accessible. While some parts felt a bit repetitive, the overall message about finding meaning in our current life is powerful.",
    timestamp: "2 days ago",
    likes: 31,
    comments: 9,
  },
]

const currentlyReading = [
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg?height=120&width=80",
    progress: 65,
  },
  {
    title: "The Atlas Six",
    author: "Olivie Blake",
    cover: "/placeholder.svg?height=120&width=80",
    progress: 23,
  },
]

const readingGoals = {
  yearly: 50,
  current: 23,
  percentage: 46,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-[#D9BDF4] to-purple-200">
          <Image src={userData.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover opacity-50" />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/80 border-white hover:bg-white"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Header */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4 sm:mb-0">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-2xl bg-[#D9BDF4] text-purple-800">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 bg-white border-white hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-purple-800">{userData.name}</h1>
                  <p className="text-purple-600">@{userData.username}</p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="border-[#D9BDF4] text-purple-700 hover:bg-[#D9BDF4]/10"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button className="bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-purple-800 leading-relaxed">{userData.bio}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-purple-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {userData.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {userData.joinDate}
                </div>
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a href={`https://${userData.website}`} className="hover:underline text-purple-700">
                    {userData.website}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="font-bold text-purple-800">{userData.stats.followers}</div>
                  <div className="text-sm text-purple-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">{userData.stats.following}</div>
                  <div className="text-sm text-purple-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">{userData.stats.booksRead}</div>
                  <div className="text-sm text-purple-600">Books Read</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">{userData.stats.reviewsWritten}</div>
                  <div className="text-sm text-purple-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-[#D9BDF4]/20">
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Posts ({userData.stats.postsCreated})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Reviews ({userData.stats.reviewsWritten})
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-6">
                  {userPosts.map((post, index) => (
                    <PostCard key={index} {...post} />
                  ))}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  {userReviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                  ))}
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-purple-800">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm text-purple-800">
                            Rated <strong>Project Hail Mary</strong> 5 stars
                          </p>
                          <p className="text-xs text-purple-600">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                        <MessageCircle className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-purple-800">
                            Commented on <strong>The Seven Husbands of Evelyn Hugo</strong>
                          </p>
                          <p className="text-xs text-purple-600">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                        <BookOpen className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm text-purple-800">
                            Started reading <strong>Klara and the Sun</strong>
                          </p>
                          <p className="text-xs text-purple-600">3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Currently Reading */}
              <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                    Currently Reading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentlyReading.map((book, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          width={40}
                          height={60}
                          className="rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-purple-800 line-clamp-1">{book.title}</p>
                          <p className="text-xs text-purple-600 line-clamp-1">{book.author}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-purple-600">
                          <span>Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-full h-2">
                          <div
                            className="bg-[#D9BDF4] h-2 rounded-full transition-all"
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Reading Goal */}
              <Card className="border-[#D9BDF4]/20 bg-gradient-to-br from-[#D9BDF4]/10 to-purple-100/30">
                <CardHeader>
                  <CardTitle className="text-purple-800">2024 Reading Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-purple-100"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#D9BDF4]"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${readingGoals.percentage}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-800">{readingGoals.percentage}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-purple-700">
                        <span className="font-bold">{readingGoals.current}</span> of{" "}
                        <span className="font-bold">{readingGoals.yearly}</span> books
                      </p>
                      <p className="text-xs text-purple-600 mt-1">You're doing great! Keep it up! 📚</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Favorite Genres */}
              <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800">Favorite Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.favoriteGenres.map((genre) => (
                      <Badge key={genre} variant="outline" className="border-[#D9BDF4] text-purple-700 bg-[#D9BDF4]/10">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
