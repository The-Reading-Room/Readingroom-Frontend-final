"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

export default function DiscussionsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center">
            <MessageCircle className="h-8 w-8 mr-3 text-[#D9BDF4]" />
            Discussions
          </h1>
          <p className="text-purple-600">Join conversations about your favorite books</p>
        </div>

        <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-800">Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-600">Book discussions and community forums are coming soon. Stay tuned!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
