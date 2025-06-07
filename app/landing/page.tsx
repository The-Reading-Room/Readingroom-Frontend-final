"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  MessageCircle,
  TrendingUp,
  Heart,
  Star,
  Coffee,
} from "lucide-react";
import Image from "next/image";

export default function ReadingRoomLanding() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 font-sans">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Text:wght@400;600;700&display=swap");

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .font-crimson {
          font-family: "Crimson Text", serif;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .bg-lavender-50 {
          background-color: #f8f5ff;
        }

        .bg-lavender-100 {
          background-color: #f0e6ff;
        }

        .bg-lavender-200 {
          background-color: #e6d2fa;
        }

        .border-lavender-200 {
          border-color: #e6d2fa;
        }

        .smooth-scroll {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-violet-100/20 animate-pulse"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl pb-2 lg:text-7xl font-bold bg-gradient-to-r from-purple-800 via-violet-700 to-indigo-700 bg-clip-text text-transparent leading-tight font-playfair">
                Reading Room
              </h1>
              <p className="text-xl lg:text-2xl text-purple-800/80 font-medium font-crimson">
                Where stories come alive and readers unite
              </p>
            </div>

            <p className="text-lg text-purple-700/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-crimson">
              Join a cozy community of book lovers where every page turn is a
              new adventure. Share your thoughts, discover new worlds, and
              connect with fellow bibliophiles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Reading
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-violet-200/30 rounded-3xl blur-2xl"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7sbPEgoC97KLTpaxHrXMka0ZR82zLQ.png"
                alt="Cozy reading scene with person reading in armchair with cats"
                width={600}
                height={600}
                className="relative z-10 rounded-3xl shadow-2xl"
                priority
              />
            </div>

            {/* Colorful Floating Elements */}
            <div className="absolute -top-4 -right-4 animate-bounce">
              <div className="bg-pink-200 p-3 rounded-full shadow-lg">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div
              className="absolute top-1/4 right-0 animate-float"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-amber-200 p-2 rounded-full shadow-lg">
                <Star className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <div
              className="absolute -bottom-4 -left-4 animate-bounce"
              style={{ animationDelay: "1000ms" }}
            >
              <div className="bg-teal-200 p-3 rounded-full shadow-lg">
                <Star className="h-6 w-6 text-teal-600" />
              </div>
            </div>
            <div
              className="absolute bottom-1/3 left-0 animate-float"
              style={{ animationDelay: "700ms" }}
            >
              <div className="bg-blue-200 p-2 rounded-full shadow-lg">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-purple-800 mb-4 font-playfair">
              Your Literary Journey Awaits
            </h2>
            <p className="text-xl text-purple-700/70 max-w-2xl mx-auto font-crimson">
              Discover a world where every book lover finds their perfect
              reading companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards - Each with a different color */}
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-pink-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-pink-800 mb-4 font-playfair">
                  Share Your Thoughts
                </h3>
                <p className="text-pink-700/70 leading-relaxed font-crimson">
                  Express your love for books through reviews, quotes, and
                  discussions that spark meaningful conversations.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-4 font-playfair">
                  Connect & Discover
                </h3>
                <p className="text-blue-700/70 leading-relaxed font-crimson">
                  Meet fellow book enthusiasts, follow your favorite readers,
                  and discover your next great read through community
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-teal-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-teal-800 mb-4 font-playfair">
                  Join Book Clubs
                </h3>
                <p className="text-teal-700/70 leading-relaxed font-crimson">
                  Participate in cozy book clubs and reading communities where
                  every discussion feels like a warm conversation with friends.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-violet-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-violet-800 mb-4 font-playfair">
                  Track Your Journey
                </h3>
                <p className="text-violet-700/70 leading-relaxed font-crimson">
                  Monitor your reading progress, set goals, and celebrate
                  milestones as you build your personal library of memories.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-amber-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-4 font-playfair">
                  Curated Collections
                </h3>
                <p className="text-amber-700/70 leading-relaxed font-crimson">
                  Explore handpicked book collections, themed reading lists, and
                  personalized recommendations tailored just for you.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-red-200">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-red-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-800 mb-4 font-playfair">
                  Build Communities
                </h3>
                <p className="text-red-700/70 leading-relaxed font-crimson">
                  Create and join intimate reading communities where every
                  member feels heard, valued, and inspired to read more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Colorful Background */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-purple-800 mb-6 font-playfair">
            Ready to Begin Your Story?
          </h2>
          <p className="text-xl text-purple-700/80 mb-12 max-w-2xl mx-auto leading-relaxed font-crimson">
            Join thousands of book lovers who have already found their reading
            home. Your next favorite book is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            >
              Sign Up Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-3 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-purple-600/60 mt-8 font-crimson">
            No credit card required • Join 50,000+ happy readers • Free forever
          </p>
        </div>
      </section>

      {/* Footer with Rainbow Border */}
      <footer className="py-12 px-6 lg:px-12 bg-purple-900 text-purple-100 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-amber-500 via-green-500 via-blue-500 to-purple-500"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 mr-3" />
            <span className="text-2xl font-bold font-playfair">
              Reading Room
            </span>
          </div>
          <p className="text-purple-200/80 mb-6 font-crimson">
            Where every page turns into a new friendship
          </p>
          <div className="border-t border-purple-800 pt-6">
            <p className="text-purple-300/60 font-crimson">
              © 2025 Reading Room. Made with ❤️ for book lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
