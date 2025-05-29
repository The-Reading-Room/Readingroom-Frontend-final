"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ReviewCardProps {
  user: {
    name: string
    username: string
    avatar: string
  }
  book: {
    title: string
    author: string
    cover: string
  }
  rating: number
  title: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

export function ReviewCard({ user, book, rating, title, content, timestamp, likes, comments }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="w-full border-l-4 border-l-yellow-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm">{user.name}</p>
                <span className="text-muted-foreground text-sm">@{user.username}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">{timestamp}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  width={20}
                  height={30}
                  className="rounded-sm"
                />
                <span className="text-sm text-muted-foreground">
                  reviewed {book.title} by {book.author}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-sm font-medium">{rating}/5</span>
        </div>
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{content}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-sm">{likes + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{comments}</span>
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Share className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
