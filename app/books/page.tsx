"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookCard } from "@/components/book-card"
import { BookOpen } from "lucide-react"

const allBooks = [
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
      "A lone astronaut must save humanity in this thrilling science fiction adventure.",
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "http://books.google.com/books/content?id=SbjrDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.3,
    reviewCount: 567,
    description:
      "A haunting story told from the perspective of an artificial friend.",
  },
  {
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "http://books.google.com/books/content?id=Eka9DAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.5,
    reviewCount: 2201,
    description:
      "After building what should be a perfect life with neurosurgeon Ryle Kincaid, Lily finds herself in a troubled relationship with an abusive husband and must make a decision about her future, as she reencounters Atlas Corrigan, a man with links to her past.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "http://books.google.com/books/content?id=NpvGCwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.7,
    reviewCount: 2437,
    description:
      "This heartfelt book, never left my bedside for the duration of the read... Colm is a force of goodness and his strength and determination has a way of helping the reader feel safe and held throughout this journey of transformation.",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    cover: "http://books.google.com/books/content?id=Df290AEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    rating: 4.6,
    reviewCount: 109,
    description:
      "An intelligent, moving and gripping read' Gillian McAllister What would you do if your husband became another person overnight? When Molly married Alex Frazer, she knew it was for ever.",
  },
  {
    title: "The Stand",
    author: "Stephen King",
    cover: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXo-b88QhSgSuDp9m4J8KTKVPQeu3GQWfsN8t29Gq_RvjDYtpU1wwrM8BMMqcOT5bmI8lGfwz3eDWQwdd3ONfaoTUEDbdxP0B1a48rHRs",
    rating: 4.7,
    reviewCount: 405,
    description:
      "When Brooks volunteered to be a stand-in for Burdette's cousin who got stood up for Homecoming, it was with the noblest of intentions—helping a fellow human being, free of charge.",
  },
  {
    title: "The Secret",
    author: "Rhonda Byrne",
    cover: "http://books.google.com/books/content?id=MagHtB5NKVcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.7,
    reviewCount: 1232,
    description:
      "The tenth-anniversary edition of the book that changed lives in profound ways, now with a new foreword and afterword.",
  },
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    cover: "http://books.google.com/books/content?id=GynbBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.8,
    reviewCount: 175,
    description:
      "The first instalment of the GLOBAL PHENOMENON and TikTok sensation, from multi-million selling and #1 Sunday Times bestselling author Sarah J. Maas Maas has established herself as a fantasy fiction titan – Time Harry Potter magic, Taylor Swift sass, Fifty Shades-level athleticism – The Sunday Times With bits of Buffy, Game of Thrones and Outlander, this is a glorious series of total joy – Stylist Spiced with slick plotting and atmospheric world-building ... a page-turning delight – Guardian ****** Feyre is a huntress, but when she kills what she thinks is a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor, Tamlin, is not truly a beast, but one of the lethal, immortal Fae. And there's more to the Fae than the legends suggest.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
    cover: "http://books.google.com/books/content?id=ScdAEQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    rating: 4.6,
    reviewCount: 631,
    description:
      "The Catcher in the Rye,\" written by J.D. Salinger and published in 1951, is a classic American novel that explores the themes of adolescence, alienation, and identity through the eyes of its protagonist, Holden Caulfield. The novel is set in the 1950s and follows Holden, a 16-year-old who has just been expelled from his prep school, Pencey Prep.",
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
              {allBooks.map((book, index) => {
                const { title, author, cover, rating, reviewCount, description } = book;
                return (
                  <BookCard
                    key={index}
                    title={title}
                    author={author}
                    cover={cover}
                    rating={rating}
                    reviewCount={reviewCount}
                    description={description}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
