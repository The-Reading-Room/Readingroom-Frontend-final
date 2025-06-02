"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback/?code=${code}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.access) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            router.push("/");
            toast({
              title: "Success",
              description: "Successfully logged in with Google",
            });
          } else {
            throw new Error("No access token received");
          }
        })
        .catch((error) => {
          console.error("Google login failed:", error);
          toast({
            title: "Error",
            description: "Failed to login with Google. Please try again.",
            variant: "destructive",
          });
          router.push("/auth/login");
        });
    }
  }, [searchParams, router, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-purple-800 mb-4">
          Logging you in via Google...
        </h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800 mx-auto"></div>
      </div>
    </div>
  );
}
