"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  Search,
  User,
  MessageCircle,
  TrendingUp,
  Settings,
  Plus,
  LogOut,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

const navigation = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Discover", icon: Search, href: "/discover" },
  { name: "Trending", icon: TrendingUp, href: "/trending" },
  { name: "Books", icon: BookOpen, href: "/books" },
  { name: "Discussions", icon: MessageCircle, href: "/discussions" },
  { name: "Lists", icon: MessageCircle, href: "/lists" },
];

const authenticatedNavigation = [
  ...navigation,
  { name: "Profile", icon: User, href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = user ? authenticatedNavigation : navigation;

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Reading Room</span>
        </Link>
      </div>

      <Separator />

      {/* Create Post Button - Only show when authenticated */}
      {user && (
        <div className="p-4">
          <Link href="/create-post">
            <Button
              className="w-full bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User Profile or Auth Buttons */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>...</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Loading...</p>
            </div>
          </div>
        ) : user ? (
          <div className="space-y-2">
            <Link
              href="/profile"
              className="flex items-center space-x-3 hover:bg-accent rounded-lg p-2 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                  alt={user.username}
                />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/auth/login">
              <Button variant="ghost" className="w-full justify-start">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="w-full bg-[#D9BDF4] hover:bg-[#C9A9E4] text-purple-900">
                Create Account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
