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
import apiClient, { Post, UserBookStatus } from "@/lib/api-client";
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
  Loader2,
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

interface UserStats {
  booksRead: number;
  reviewsWritten: number;
  postsCreated: number;
  currentlyReading: number;
  wantToRead: number;
}

interface PostCardProps {
  post: Post;
}

interface ReviewCardProps {
  review: UserBookStatus;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("posts");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    booksRead: 0,
    reviewsWritten: 0,
    postsCreated: 0,
    currentlyReading: 0,
    wantToRead: 0,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<UserBookStatus[]>([]);
  const [readingStatus, setReadingStatus] = useState<UserBookStatus[]>([]);
  const [currentlyReading, setCurrentlyReading] =
    useState<UserBookStatus | null>(null);

  // Simplified auth check useEffect
  useEffect(() => {
    console.log("Profile - Auth state check:", {
      authLoading,
      isAuthenticated: isAuthenticated(),
      hasUser: !!user,
      userId: user?.id,
      hasToken: !!localStorage.getItem("access_token"),
    });

    // If AuthContext is still doing its initial load, wait
    if (authLoading) {
      console.log("Profile - Waiting for AuthContext's initial load");
      return;
    }

    // Check if we have a token first
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("Profile - No token found, redirecting to login");
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    // If we have a token but no user yet, wait for user data
    if (!user) {
      console.log("Profile - Has token but waiting for user data");
      return;
    }

    // At this point we have both token and user data
    console.log("Profile - Auth check passed, user is authenticated");
    setIsLoadingData(false);
  }, [authLoading, isAuthenticated, router, toast, user]);

  // Data fetching useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id || !isAuthenticated() || authLoading) {
        console.log("Profile - Skipping data fetch:", {
          hasUserId: !!user?.id,
          isAuthenticated: isAuthenticated(),
          authLoading,
        });
        return;
      }

      console.log("Profile - Starting data fetch for user:", user.id);
      setIsLoadingData(true);

      try {
        // Fetch user's book statuses and posts
        const [statusResponse, postsResponse] = await Promise.all([
          apiClient.userBookStatus.listUserBookStatuses(),
          apiClient.posts.listPosts(),
        ]);

        console.log("Profile - Data fetch successful:", {
          statuses: statusResponse.data.length,
          posts: postsResponse.data.length,
        });

        const allStatuses = statusResponse.data;
        const allPosts = postsResponse.data.filter(
          (post) => post.user.id === user.id
        );

        // Calculate stats
        const stats: UserStats = {
          booksRead: allStatuses.filter(
            (status) => status.status === "completed"
          ).length,
          reviewsWritten: allStatuses.filter((status) => status.review).length,
          postsCreated: allPosts.length,
          currentlyReading: allStatuses.filter(
            (status) => status.status === "reading"
          ).length,
          wantToRead: allStatuses.filter(
            (status) => status.status === "want_to_read"
          ).length,
        };

        // Set currently reading book
        const reading =
          allStatuses.find((status) => status.status === "reading") || null;

        setUserStats(stats);
        setPosts(allPosts);
        setReviews(
          allStatuses.filter(
            (status) => status.status === "completed" && status.review
          )
        );
        setReadingStatus(allStatuses);
        setCurrentlyReading(reading);
      } catch (error) {
        console.error("Profile - Failed to fetch user data:", error);
        toast({
          title: "Error",
          description:
            "Failed to load your profile data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUserData();
  }, [user?.id, isAuthenticated, authLoading, toast]);

  // Updated loading condition
  if (
    authLoading ||
    (!user && localStorage.getItem("access_token")) ||
    isLoadingData
  ) {
    console.log("Profile - Showing loading state:", {
      authLoading,
      hasUser: !!user,
      hasToken: !!localStorage.getItem("access_token"),
      isLoadingData,
    });
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    );
  }

  // Final authentication check - only redirect if we have no token
  if (!localStorage.getItem("access_token")) {
    console.log("Profile - No token found in final check, redirecting");
    return null; // Let the useEffect handle the redirect
  }

  // If we have a token but no user yet, show loading
  if (!user) {
    console.log("Profile - Has token but waiting for user data in final check");
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50/30 to-[#D9BDF4]/10">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    );
  }

  // At this point, we know user is not null because of the check above
  const { username, email, avatar, bio } = user;

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
                          avatar ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${username}`
                        }
                        alt={username}
                      />
                      <AvatarFallback className="text-2xl bg-[#D9BDF4] text-purple-800">
                        {username.slice(0, 2).toUpperCase()}
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
                      {username}
                    </h1>
                    <p className="text-purple-600">{email}</p>
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

              {bio && (
                <p className="mt-4 text-purple-800 leading-relaxed">{bio}</p>
              )}

              {/* Stats */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="font-bold text-purple-800">
                    {userStats.booksRead}
                  </div>
                  <div className="text-sm text-purple-600">Books Read</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">
                    {userStats.reviewsWritten}
                  </div>
                  <div className="text-sm text-purple-600">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">
                    {userStats.postsCreated}
                  </div>
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
                    Posts ({posts.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Reviews ({reviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="reading"
                    className="data-[state=active]:bg-[#D9BDF4] data-[state=active]:text-purple-900"
                  >
                    Reading ({readingStatus.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-6">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard
                        key={post.id}
                        user={{
                          name: post.user.username,
                          username: post.user.username,
                          avatar: post.user.avatar || "",
                        }}
                        book={
                          post.book
                            ? {
                                title: post.book.title,
                                author: post.book.authors.join(", "),
                                cover: post.book.imageLinks?.thumbnail || "",
                              }
                            : {
                                title: "",
                                author: "",
                                cover: "",
                              }
                        }
                        content={post.content}
                        timestamp={new Date(
                          post.created_at
                        ).toLocaleDateString()}
                        likes={post.likes_count}
                        comments={post.comments_count}
                        image={post.image}
                      />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                          No posts yet. Start sharing your reading journey!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        user={{
                          name: user?.username || "",
                          username: user?.username || "",
                          avatar: user?.avatar || "",
                        }}
                        book={{
                          title: review.book.title,
                          author: review.book.authors.join(", "),
                          cover: review.book.imageLinks?.thumbnail || "",
                        }}
                        rating={review.rating || 0}
                        title={`Review of ${review.book.title}`}
                        content={review.review || ""}
                        timestamp={new Date().toLocaleDateString()} // TODO: Add review timestamp to API
                        likes={0} // TODO: Add likes to API
                        comments={0} // TODO: Add comments to API
                      />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                          No reviews yet. Share your thoughts on the books
                          you've read!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reading" className="space-y-6">
                  {readingStatus.length > 0 ? (
                    readingStatus.map((status) => (
                      <Card key={status.id} className="border-[#D9BDF4]/20">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <Image
                              src={
                                status.book.imageLinks?.thumbnail ||
                                "/book-placeholder.png"
                              }
                              alt={status.book.title}
                              width={80}
                              height={120}
                              className="rounded-md shadow-sm"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-purple-800">
                                {status.book.title}
                              </h3>
                              <p className="text-sm text-purple-600">
                                {status.book.authors.join(", ")}
                              </p>
                              <div className="mt-2">
                                <Badge
                                  variant={
                                    status.status === "reading"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {status.status === "reading"
                                    ? "Currently Reading"
                                    : status.status === "completed"
                                    ? "Completed"
                                    : "Want to Read"}
                                </Badge>
                                {status.progress > 0 && (
                                  <div className="mt-2">
                                    <div className="h-2 bg-purple-100 rounded-full">
                                      <div
                                        className="h-2 bg-[#D9BDF4] rounded-full"
                                        style={{ width: `${status.progress}%` }}
                                      />
                                    </div>
                                    <p className="text-xs text-purple-600 mt-1">
                                      {status.progress}% complete
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                          No active reading progress. Start reading a book!
                        </p>
                      </CardContent>
                    </Card>
                  )}
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
                  {currentlyReading ? (
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                      <Image
                        src={
                          currentlyReading.book.imageLinks?.thumbnail ||
                          "/book-placeholder.png"
                        }
                        alt={currentlyReading.book.title}
                        width={60}
                        height={90}
                        className="rounded-md shadow-sm"
                      />
                      <div>
                        <h4 className="font-medium text-purple-800">
                          {currentlyReading.book.title}
                        </h4>
                        <p className="text-sm text-purple-600">
                          {currentlyReading.book.authors.join(", ")}
                        </p>
                        {currentlyReading.progress > 0 && (
                          <div className="mt-2">
                            <div className="h-2 bg-purple-100 rounded-full w-24">
                              <div
                                className="h-2 bg-[#D9BDF4] rounded-full"
                                style={{
                                  width: `${currentlyReading.progress}%`,
                                }}
                              />
                            </div>
                            <p className="text-xs text-purple-600 mt-1">
                              {currentlyReading.progress}% complete
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#D9BDF4]/5">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-purple-800">
                          No currently reading book.
                        </p>
                      </div>
                    </div>
                  )}
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
                          strokeDasharray={`${
                            (userStats.booksRead / 50) * 100
                          }, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-800">
                          {Math.round((userStats.booksRead / 50) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-purple-700">
                        <span className="font-bold">{userStats.booksRead}</span>{" "}
                        of <span className="font-bold">50</span> books
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {userStats.booksRead >= 50
                          ? "Congratulations! You've reached your goal! 🎉"
                          : "You're doing great! Keep it up! 📚"}
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
