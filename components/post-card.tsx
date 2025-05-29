"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PostCardProps {
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
  content: string
  timestamp: string
  likes: number
  comments: number
  image?: string
}

export function PostCard({ user, book, content, timestamp, likes, comments, image }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card className="w-full">
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
                  {book.title} by {book.author}
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
        <p className="text-sm leading-relaxed">{content}</p>
        {image && (
          <div className="mt-3">
            <Image
              src={image || "/placeholder.svg"}
              alt="Post image"
              width={500}
              height={300}
              className="rounded-lg w-full object-cover"
            />
          </div>
        )}
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
