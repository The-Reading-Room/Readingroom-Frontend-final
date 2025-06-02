"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/post-card";
import { ReviewCard } from "@/components/review-card";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import {
  MapPin,
  Calendar,
  LinkIcon,
  Users,
  BookOpen,
  Star,
  MessageCircle,
  Edit,
  Camera,
} from "lucide-react";
import Image from "next/image";

interface ProfileData {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  location?: string | null;
  website?: string | null;
  joinDate?: string | null;
  stats?: {
    followers: number;
    following: number;
    booksRead: number;
    reviewsWritten: number;
    postsCreated: number;
  } | null;
  favoriteGenres?: string[] | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("posts");

  // Debug logging
  useEffect(() => {
    console.log("Profile Page - Auth State:", { user, authLoading });
  }, [user, authLoading]);

  // Handle auth state
  useEffect(() => {
    if (!authLoading && !user) {
      console.log("Profile Page - No user, redirecting to login");
      router.replace("/auth/login");
      return;
    }
  }, [user, authLoading, router]);

  // Show loading state while auth is being checked
  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
        <Sidebar />
        <div className="flex-1 max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-32 w-32 rounded-full bg-gray-200 mb-4" />
            <div className="h-8 w-48 bg-gray-200 mb-2" />
            <div className="h-4 w-32 bg-gray-200 mb-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative pt-16 px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                {/* Avatar */}
                <div className="flex justify-between">
                  <div className="relative justify-between mb-4 sm:mb-0">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={
                          user.avatar ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                        }
                        alt={user.username}
                      />
                      <AvatarFallback className="text-2xl bg-[#D9BDF4] text-purple-800">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 bg-white border-white hover:bg-gray-50"
                      onClick={() =>
                        toast({
                          title: "Coming Soon",
                          description:
                            "Profile picture upload will be available soon!",
                        })
                      }
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-10 ml-10">
                    <h1 className="text-2xl font-bold text-purple-800">
                      {user.username}
                    </h1>
                    <p className="text-purple-600">{user.email}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    className="border-[#D9BDF4] text-purple-700 hover:bg-[#D9BDF4]/10"
                    onClick={() =>
                      toast({
                        title: "Coming Soon",
                        description: "Profile editing will be available soon!",
                      })
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              {user.bio && (
                <p className="mt-4 text-purple-800 leading-relaxed">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="font-bold text-purple-800">0</div>
                  <div className="text-sm text-purple-600">Books Read</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">0</div>
                  <div className="text-sm text-purple-600">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">0</div>
                  <div className="text-sm text-purple-600">Posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-3 bg-white/70 border border-[#D9BDF4]/20">
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Posts (0)
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Reviews (0)
                  </TabsTrigger>
                  <TabsTrigger
                    value="reading"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Reading
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">
                        No posts yet. Start sharing your reading journey!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">
                        No reviews yet. Share your thoughts on the books you've
                        read!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reading" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-muted-foreground">
                        No active reading progress. Start reading a book!
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Currently Reading */}
              <Card className="border-[#D9BDF4]/20 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-800 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#D9BDF4]" />
                    Currently Reading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-purple-800">
                        No currently reading book.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reading Goal */}
              <Card className="border-[#D9BDF4]/20 bg-gradient-to-br from-[#D9BDF4]/10 to-purple-100/30">
                <CardHeader>
                  <CardTitle className="text-purple-800">
                    2024 Reading Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="relative w-24 h-24 mx-auto">
                      <svg
                        className="w-24 h-24 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-purple-100"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#D9BDF4]"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${0}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-800">
                          0%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-purple-700">
                        <span className="font-bold">0</span> of{" "}
                        <span className="font-bold">50</span> books
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        You're doing great! Keep it up! 📚
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
