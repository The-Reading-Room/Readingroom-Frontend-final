"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCard } from "@/components/book-card"
import { TrendingUp } from "lucide-react"

const trendingBooks = [
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    cover: "http://books.google.com/books/content?id=EP-gEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 2156,
    description:
      "Dragons, war college, and a deadly curriculum. Violet Sorrengail was supposed to enter the Scribe Quadrant, but she's thrust into the riders.",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    cover: "http://books.google.com/books/content?id=uW_8EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.6,
    reviewCount: 1432,
    description:
      "A novel about friendship, art, and identity, following two friends who create a groundbreaking video game.",
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "http://books.google.com/books/content?id=njVpDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 1234,
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "http://books.google.com/books/content?id=iEiHEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.7,
    reviewCount: 892,
    description:
      "A lone astronaut must save humanity in this thrilling science fiction adventure filled with humor and heart.",
  },
]

export default function TrendingPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
            <TrendingUp className="h-8 w-8 mr-3 text-[#D9BDF4]" />
            Trending Books
          </h1>
          <p className="text-purple-600">Discover what the Reading Room community is talking about</p>
        </div>

        <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-800">Most Popular This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingBooks.map((book, index) => (
                <BookCard key={index} {...book} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
