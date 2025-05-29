"use client"

import { PostCard } from "@/components/post-card"
import { ReviewCard } from "@/components/review-card"
import { TrendingBooks } from "@/components/trending-books"
import { FeedHeader } from "@/components/feed-header"
import { Card, CardContent } from "@/components/ui/card"

export function MainContent() {
  return (
    <div className="flex-1 flex">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl mx-auto">
        <FeedHeader />

        <div className="space-y-6 p-6">
          {/* Welcome Message */}
          <Card className="border-[#D9BDF4]/20 bg-gradient-to-r from-[#D9BDF4]/10 to-purple-100/30">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Welcome to Reading Room! 📚</h2>
              <p className="text-purple-600">Discover, discuss, and share your love for books with fellow readers</p>
            </CardContent>
          </Card>

          {/* Sample Posts */}
          <PostCard
            user={{
              name: "Sarah Chen",
              username: "sarahreads",
              avatar: "/placeholder-user.jpg",
            }}
            book={{
              title: "The Seven Husbands of Evelyn Hugo",
              author: "Taylor Jenkins Reid",
              cover: "/placeholder.svg?height=120&width=80",
            }}
            content="Just finished this masterpiece! The way Taylor Jenkins Reid weaves together love, ambition, and sacrifice is absolutely brilliant. Evelyn's story had me completely captivated from start to finish. 📚✨"
            timestamp="2 hours ago"
            likes={24}
            comments={8}
            image="/placeholder.svg?height=300&width=500"
          />

          <ReviewCard
            user={{
              name: "Michael Torres",
              username: "bookworm_mike",
              avatar: "/placeholder-user.jpg",
            }}
            book={{
              title: "Project Hail Mary",
              author: "Andy Weir",
              cover: "/placeholder.svg?height=120&width=80",
            }}
            rating={5}
            title="A Scientific Adventure That Will Blow Your Mind"
            content="Andy Weir has done it again! This book combines hard science with humor and heart in a way that's absolutely addictive. Grace's journey is both hilarious and deeply moving. The friendship that develops is one of the most beautiful things I've read all year."
            timestamp="5 hours ago"
            likes={42}
            comments={15}
          />

          <PostCard
            user={{
              name: "Emma Rodriguez",
              username: "literaryemma",
              avatar: "/placeholder-user.jpg",
            }}
            book={{
              title: "Klara and the Sun",
              author: "Kazuo Ishiguro",
              cover: "/placeholder.svg?height=120&width=80",
            }}
            content="Currently reading this and Ishiguro's prose is just... *chef's kiss* 👌 The way he writes from Klara's perspective is so unique and touching. Anyone else reading this? Would love to discuss!"
            timestamp="1 day ago"
            likes={18}
            comments={12}
          />

          <ReviewCard
            user={{
              name: "David Kim",
              username: "davidreads",
              avatar: "/placeholder-user.jpg",
            }}
            book={{
              title: "The Midnight Library",
              author: "Matt Haig",
              cover: "/placeholder.svg?height=120&width=80",
            }}
            rating={4}
            title="A Beautiful Exploration of Life's Possibilities"
            content="This book really made me think about the choices we make and the lives we could have lived. Haig's writing is both philosophical and accessible. While some parts felt a bit repetitive, the overall message about finding meaning in our current life is powerful."
            timestamp="2 days ago"
            likes={31}
            comments={9}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-6 border-l bg-card/30 backdrop-blur-sm">
        <TrendingBooks />
      </div>
    </div>
  )
}
