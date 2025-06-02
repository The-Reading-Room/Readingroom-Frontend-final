"use client"
import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const readingLists: ReadingList[] = [
  {
    id: "want-to-read",
    title: "Want to Read",
    description: "Books you want to read",
    bookCount: 12,
    lastUpdated: "Yesterday",
    type: "default",
    icon: "fas fa-clock",
    iconColor: "bg-blue-500",
  },
  {
    id: "currently-reading",
    title: "Currently Reading",
    description: "Books you are currently reading",
    bookCount: 3,
    lastUpdated: "Today",
    type: "default",
    icon: "fas fa-book-open",
    iconColor: "bg-orange-500",
  },
  {
    id: "completed",
    title: "Completed",
    description: "Books you have finished reading",
    bookCount: 24,
    lastUpdated: "Today",
    type: "default",
    icon: "fas fa-check-circle",
    iconColor: "bg-green-500",
  },
  {
    id: "list-1",
    title: "Sci-Fi Adventures",
    description: "A collection of thrilling sci-fi novels",
    bookCount: 8,
    lastUpdated: "2 days ago",
    type: "custom",
    icon: "fas fa-rocket",
    iconColor: "bg-purple-500",
  },
  {
    id: "list-2",
    title: "Fantasy Epics",
    description: "Epic fantasy books with magic and mythical creatures",
    bookCount: 5,
    lastUpdated: "3 days ago",
    type: "custom",
    icon: "fas fa-dragon",
    iconColor: "bg-red-500",
  },
]

export default function ListsView({ onBack }: ListsViewProps) {
  const [lists, setLists] = useState<ReadingList[]>(readingLists)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newList, setNewList] = useState({
    title: "",
    description: "",
    iconColor: "bg-blue-500",
    icon: "fas fa-book",
  })

  const defaultLists = lists.filter((list) => list.type === "default")
  const customLists = lists.filter((list) => list.type === "custom")

  const handleCreateList = () => {
    if (newList.title.trim() === "") return

    const newListItem: ReadingList = {
      id: `list-${Date.now()}`,
      title: newList.title,
      description: newList.description,
      bookCount: 0,
      lastUpdated: "Just now",
      type: "custom",
      icon: newList.icon,
      iconColor: newList.iconColor,
    }

    setLists([...lists, newListItem])
    setNewList({
      title: "",
      description: "",
      iconColor: "bg-blue-500",
      icon: "fas fa-book",
    })
    setIsDialogOpen(false)
  }

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
      value: customLists.length.toString(),
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
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {stats.map((stat, index) => (
            <Card key={index} className="flex flex-col justify-between p-4">
              <div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${stat.color}`}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <h3 className="text-xl font-semibold mt-2">{stat.label}</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Reading Lists</h2>
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New List
          </Button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Default Lists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {defaultLists.map((list) => (
              <Card key={list.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${list.iconColor}`}>
                    <i className={`fas ${list.icon}`}></i>
                  </div>
                  <h4 className="font-semibold">{list.title}</h4>
                </div>
                <p className="text-sm text-gray-500">{list.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">{list.bookCount} books</span>
                  <span className="text-xs text-gray-400">Updated {list.lastUpdated}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Custom Lists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customLists.map((list) => (
              <Card key={list.id} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${list.iconColor}`}>
                    <i className={`fas ${list.icon}`}></i>
                  </div>
                  <h4 className="font-semibold">{list.title}</h4>
                </div>
                <p className="text-sm text-gray-500">{list.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-600">{list.bookCount} books</span>
                  <span className="text-xs text-gray-400">Updated {list.lastUpdated}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* Create New List Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Reading List</DialogTitle>
              <DialogDescription>
                Create a new list to organize your books. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">List Title</Label>
                <Input
                  id="title"
                  value={newList.title}
                  onChange={(e) => setNewList({ ...newList, title: e.target.value })}
                  placeholder="My Favorite Fantasy Books"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newList.description}
                  onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                  placeholder="A collection of my favorite fantasy novels"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon-color">Icon Color</Label>
                <Select
                  value={newList.iconColor}
                  onValueChange={(value) => setNewList({ ...newList, iconColor: value })}
                >
                  <SelectTrigger id="icon-color">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-blue-500">Blue</SelectItem>
                    <SelectItem value="bg-green-500">Green</SelectItem>
                    <SelectItem value="bg-red-500">Red</SelectItem>
                    <SelectItem value="bg-yellow-500">Yellow</SelectItem>
                    <SelectItem value="bg-purple-500">Purple</SelectItem>
                    <SelectItem value="bg-cyan-500">Cyan</SelectItem>
                    <SelectItem value="bg-orange-500">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={newList.icon} onValueChange={(value) => setNewList({ ...newList, icon: value })}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fas fa-book">Book</SelectItem>
                    <SelectItem value="fas fa-heart">Heart</SelectItem>
                    <SelectItem value="fas fa-star">Star</SelectItem>
                    <SelectItem value="fas fa-rocket">Rocket</SelectItem>
                    <SelectItem value="fas fa-bookmark">Bookmark</SelectItem>
                    <SelectItem value="fas fa-glasses">Glasses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateList}>Create List</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
