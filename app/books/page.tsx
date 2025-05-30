"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCard } from "@/components/book-card"
import { BookOpen } from "lucide-react"

const allBooks = [
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.8,
    reviewCount: 1234,
    description:
      "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets.",
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.7,
    reviewCount: 892,
    description:
      "A lone astronaut must save humanity in this thrilling science fiction adventure.",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "/placeholder.svg?height=200&width=140",
    rating: 4.3,
    reviewCount: 567,
    description:
      "A haunting story told from the perspective of an artificial friend.",
  },
]

export default function BooksPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-[#D9BDF4]" />
            All Books
          </h1>
          <p className="text-purple-600">
            Browse our complete collection of books
          </p>
        </div>

        <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-800">Book Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allBooks.map((book, index) => (
                <BookCard key={index} {...book} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
