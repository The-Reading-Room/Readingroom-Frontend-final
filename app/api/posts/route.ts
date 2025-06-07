import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

// GET /api/posts - List all posts
export async function GET() {
  try {
    console.log("Fetching posts...");
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            authors: true,
            imageLinks: true,
          },
        },
        likes: true,
        comments: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    console.log(`Found ${posts.length} posts`);

    // Transform the data to match our frontend expectations
    const transformedPosts = posts.map((post) => ({
      id: post.id,
      user: {
        id: post.user.id,
        username: post.user.username,
        avatar: post.user.avatar,
      },
      book: post.book ? {
        id: post.book.id,
        title: post.book.title,
        authors: post.book.authors,
        imageLinks: post.book.imageLinks,
      } : null,
      content: post.content,
      image: post.image,
      likes_count: post.likes.length,
      comments_count: post.comments.length,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString(),
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, bookId, image } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        content,
        image,
        userId: session.user.id,
        bookId: bookId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            authors: true,
            imageLinks: true,
          },
        },
        likes: true,
        comments: true,
      },
    });

    // Transform the response
    const transformedPost = {
      id: post.id,
      user: {
        id: post.user.id,
        username: post.user.username,
        avatar: post.user.avatar,
      },
      book: post.book ? {
        id: post.book.id,
        title: post.book.title,
        authors: post.book.authors,
        imageLinks: post.book.imageLinks,
      } : null,
      content: post.content,
      image: post.image,
      likes_count: post.likes.length,
      comments_count: post.comments.length,
      created_at: post.created_at.toISOString(),
      updated_at: post.updated_at.toISOString(),
    };

    return NextResponse.json(transformedPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
} 