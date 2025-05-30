"use client"
import Link from "next/link"
import {
  ArrowLeft,
  Bookmark,
  Star,
  Palette,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ReadingList {
  id: string
  title: string
  description: string
  bookCount: number
  lastUpdated: string
  type: "default" | "custom"
  icon: string
  iconColor: string
}

interface ListsViewProps {
  onBack: () => void
}

export const readingLists: ReadingList[] = [
  {
    id: "want-to-read",
    title: "Want to Read",
    description: "Books you're planning to read",
    bookCount: 12,
    lastUpdated: "Updated 2 days ago",
    type: "default",
    icon: "fas fa-clock",
    iconColor: "bg-blue-500",
  },
  {
    id: "completed",
    title: "Completed",
    description: "Books you've finished reading",
    bookCount: 24,
    lastUpdated: "Updated today",
    type: "default",
    icon: "fas fa-check-circle",
    iconColor: "bg-green-500",
  },
  {
    id: "favorites",
    title: "Favorites",
    description: "My all-time favorite books that I'd recommend to anyone",
    bookCount: 8,
    lastUpdated: "Updated 1 week ago",
    type: "custom",
    icon: "fas fa-heart",
    iconColor: "bg-red-500",
  },
  {
    id: "classics",
    title: "Must Read Classics",
    description: "Timeless literature that shaped the world",
    bookCount: 15,
    lastUpdated: "Updated 3 days ago",
    type: "custom",
    icon: "fas fa-star",
    iconColor: "bg-yellow-500",
  },
  {
    id: "sci-fi",
    title: "Sci-Fi Adventures",
    description: "Mind-bending science fiction journeys",
    bookCount: 6,
    lastUpdated: "Updated 5 days ago",
    type: "custom",
    icon: "fas fa-rocket",
    iconColor: "bg-cyan-500",
  },
]

export default function ListsView({ onBack }: ListsViewProps) {
  const defaultLists = readingLists.filter((list) => list.type === "default")
  const customLists = readingLists.filter((list) => list.type === "custom")

  const stats = [
    {
      label: "Want to Read",
      value: "12",
      icon: "fas fa-clock",
      color: "bg-blue-500",
    },
    {
      label: "Completed",
      value: "24",
      icon: "fas fa-check-circle",
      color: "bg-green-500",
    },
    {
      label: "Custom Lists",
      value: "5",
      icon: "fas fa-heart",
      color: "bg-orange-500",
    },
    {
      label: "Total Books",
      value: "41",
      icon: "fas fa-books",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-7">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="ml-20">
              <h1 className="text-3xl font-bold text-gray-900 flex  gap-3">
                <Bookmark className="w-8 h-8 text-indigo-600 fill-indigo-600" />
                My Reading Lists
              </h1>
              <p className="text-gray-600 mt-1">
                Organize and track your reading journey
              </p>
            </div>
          </div>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Create New List
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="flex items-center gap-4 p-2">
              <div
                className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-white`}
              >
                <i className={`${stat.icon} text-xl`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-medium font-medium">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Default Lists */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
            <Star className="w-6 h-6 text-indigo-600 fill-indigo-600" />
            Default Lists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaultLists.map((list) => (
              <Card key={list.id} className="group cursor-pointer p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${list.iconColor} flex items-center justify-center text-white`}
                  >
                    <i className={`${list.icon} text-xl`} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {list.title}
                </h3>
                <p className="text-gray-600 mb-4">{list.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-indigo-600">
                    {list.bookCount} books
                  </span>
                  <span className="text-gray-500">{list.lastUpdated}</span>
                </div>

                {/* Book previews */}
                <div className="flex items-center gap-1 mt-4 -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={'https://i.pinimg.com/736x/7d/ff/bd/7dffbd95728599e6ab432fe9d2bc34ea.jpg'}
                      alt="Book cover"
                      className="w-8 h-12 object-cover rounded border-2 border-white shadow-sm"
                    />
                  ))}
                  <div className="w-8 h-12 bg-gray-100 rounded border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                    +{list.bookCount - 3}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Lists */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
            <Palette className="w-6 h-6 text-indigo-600" />
            Custom Lists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {customLists.map((list) => (
              <Card key={list.id} className="group cursor-pointer p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${list.iconColor} flex items-center justify-center text-white`}
                  >
                    <i className={`${list.icon} text-xl`} />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {list.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {list.description}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-indigo-600">
                    {list.bookCount} books
                  </span>
                  <span className="text-gray-500">{list.lastUpdated}</span>
                </div>

                {/* Book previews */}
                <div className="flex items-center gap-1 mt-4 -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pinimg.com/736x/58/48/2e/58482e2963a9fad5d0af003c981928e2.jpg`}
                      alt="Book cover"
                      className="w-8 h-12 object-cover rounded border-2 border-white shadow-sm hover:scale-110 hover:z-10 transition-transform duration-200"
                    />
                  ))}
                  <div className="w-8 h-12 bg-gray-100 rounded border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                    +{list.bookCount - 3}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
