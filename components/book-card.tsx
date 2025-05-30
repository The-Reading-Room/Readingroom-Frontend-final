import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookCardProps {
  title: string
  author: string
  cover: string
  rating: number
  reviewCount: number
  description: string
}

export function BookCard({ title, author, cover, rating, reviewCount, description }: BookCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Image
            src={cover || "/placeholder.svg"}
            alt={title}
            width={80}
            height={120}
            className="rounded-md object-cover"
          />
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
              <p className="text-sm text-muted-foreground">by {author}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{rating}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm ml-1">{reviewCount} reviews</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>

            <div className="flex space-x-2 pt-2">
              <Link href={`/books/${title}`}>
                <Button 
                  variant="outline" 
                  className="text-sm px-4 py-2 h-9 border-[#D9BDF4] text-purple-700 hover:bg-[#D9BDF4]/10"
                >
                  View Book
                </Button>
              </Link>
              <Link href={'/create-post'}>
                <Button 
                  className="text-sm px-4 py-2 h-9 bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
                >
                  Add Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
