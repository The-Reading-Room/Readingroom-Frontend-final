import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />
      <MainContent />
    </div>
  )
}
