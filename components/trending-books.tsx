import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star } from "lucide-react"
import Image from "next/image"

const trendingBooks = [
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    cover: "/placeholder.svg?height=80&width=60",
    rating: 4.8,
    trend: "+12%",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "/placeholder.svg?height=80&width=60",
    rating: 4.6,
    trend: "+8%",
  },
  {
    title: "The Atlas Six",
    author: "Olivie Blake",
    cover: "/placeholder.svg?height=80&width=60",
    rating: 4.2,
    trend: "+15%",
  },
  {
    title: "Book Lovers",
    author: "Emily Henry",
    cover: "/placeholder.svg?height=80&width=60",
    rating: 4.5,
    trend: "+6%",
  },
]

const suggestedUsers = [
  {
    name: "Literary Luna",
    username: "literaryluna",
    avatar: "/placeholder-user.jpg",
    followers: "2.3k",
  },
  {
    name: "BookWorm Ben",
    username: "bookwormben",
    avatar: "/placeholder-user.jpg",
    followers: "1.8k",
  },
  {
    name: "Novel Nora",
    username: "novelnora",
    avatar: "/placeholder-user.jpg",
    followers: "3.1k",
  },
]

export function TrendingBooks() {
  return (
    <div className="space-y-6">
      {/* Trending Books */}
      <Card className="border-[#D9BDF4]/20 bg-gradient-to-br from-[#D9BDF4]/5 to-purple-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-purple-800">
            <TrendingUp className="h-5 w-5 mr-2 text-[#D9BDF4]" />
            Trending Books
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingBooks.map((book, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#D9BDF4]/10 transition-colors"
            >
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                width={40}
                height={60}
                className="rounded-sm object-cover shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{book.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{book.rating}</span>
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-1 rounded">{book.trend}</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full border-[#D9BDF4] text-purple-700 hover:bg-[#D9BDF4]/10">
            View All Trending
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-[#D9BDF4]/20 bg-gradient-to-br from-purple-50/50 to-[#D9BDF4]/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800">Your Reading Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded-lg bg-[#D9BDF4]/10">
            <span className="text-sm text-purple-700">Books Read</span>
            <span className="font-semibold text-purple-800">23</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-[#D9BDF4]/10">
            <span className="text-sm text-purple-700">Reviews Written</span>
            <span className="font-semibold text-purple-800">18</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-[#D9BDF4]/10">
            <span className="text-sm text-purple-700">Posts Created</span>
            <span className="font-semibold text-purple-800">42</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg bg-[#D9BDF4]/10">
            <span className="text-sm text-purple-700">Followers</span>
            <span className="font-semibold text-purple-800">156</span>
          </div>
        </CardContent>
      </Card>

      {/* Reading Goal */}
      <Card className="border-[#D9BDF4]/20 bg-gradient-to-br from-[#D9BDF4]/10 to-purple-100/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-purple-800">2024 Reading Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-700">Progress</span>
              <span className="text-purple-800 font-medium">23/50 books</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div className="bg-[#D9BDF4] h-2 rounded-full" style={{ width: "46%" }}></div>
            </div>
            <p className="text-xs text-purple-600 text-center mt-2">You're doing great! Keep it up! 📚</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
