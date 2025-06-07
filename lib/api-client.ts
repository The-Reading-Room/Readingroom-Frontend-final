import api from './api';

// Types
export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    language?: string;
    averageRating?: number;
    ratingsCount?: number;
    categories?: string[];
  };
}

export interface UserBookStatus {
  id: number;
  book: Book;
  status: 'reading' | 'completed' | 'want_to_read';
  progress: number;
  rating?: number;
  review?: string;
}

// Raw API response type
export interface PostResponse {
  id: number;
  content: string;
  book?: number;
  image?: string;
  author: {
    id: number;
    username: string;
    email: string;
  };
  created_at: string;
}

// Frontend Post type with transformed fields
export interface Post extends PostResponse {
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  likes_count: number;
  comments_count: number;
  is_liked?: boolean;  // Track if current user has liked the post
}

export interface Comment {
  id: number;
  post: number;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
}

export interface SearchResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Books API
export const booksApi = {
  // Search books
  searchBooks: async (query: string): Promise<ApiResponse<SearchResponse>> => {
    const response = await api.get(`api/books/search/?q=${encodeURIComponent(query)}`);
    return { data: response.data, status: response.status };
  },

  // Save Google Book
  saveGoogleBook: async (bookId: string): Promise<ApiResponse<Book>> => {
    const response = await api.post('/books/save-google-book/', { book_id: bookId });
    return { data: response.data, status: response.status };
  },

  // List all books
  listBooks: async (): Promise<ApiResponse<Book[]>> => {
    const response = await api.get('/books/');
    return { data: response.data, status: response.status };
  },

  // Create a new book
  createBook: async (book: Partial<Book>): Promise<ApiResponse<Book>> => {
    const response = await api.post('/books/', book);
    return { data: response.data, status: response.status };
  },

  // Get a specific book
  getBook: async (bookId: string): Promise<ApiResponse<Book>> => {
    const response = await api.get(`/books/${bookId}/`);
    return { data: response.data, status: response.status };
  },

  // Update a book
  updateBook: async (bookId: string, book: Partial<Book>): Promise<ApiResponse<Book>> => {
    const response = await api.put(`/books/${bookId}/`, book);
    return { data: response.data, status: response.status };
  },

  // Delete a book
  deleteBook: async (bookId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/books/${bookId}/`);
    return { data: undefined, status: response.status };
  },
};

// User Book Status API
export const userBookStatusApi = {
  // List user's book statuses
  listUserBookStatuses: async (): Promise<ApiResponse<UserBookStatus[]>> => {
    const response = await api.get('/books/user-status/');
    return { data: response.data, status: response.status };
  },

  // Create a new user book status
  createUserBookStatus: async (status: Partial<UserBookStatus>): Promise<ApiResponse<UserBookStatus>> => {
    const response = await api.post('/books/user-status/', status);
    return { data: response.data, status: response.status };
  },

  // Update a user book status
  updateUserBookStatus: async (statusId: number, status: Partial<UserBookStatus>): Promise<ApiResponse<UserBookStatus>> => {
    const response = await api.put(`/books/user-status/${statusId}/`, status);
    return { data: response.data, status: response.status };
  },
};

// Posts API
export const postsApi = {
  // List all posts
  listPosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await api.get<PostResponse[]>('/posts/');
    // Transform the response to match our frontend expectations
    const transformedPosts = await Promise.all(response.data.map(async (post) => {
      // Fetch likes and comments counts for each post
    //   const [likesResponse, commentsResponse] = await Promise.all([
    //     api.get(`/posts/${post.id}/likes/`).catch(() => ({ data: { count: 0 } })),
    //     api.get(`/posts/${post.id}/comments/`).catch(() => ({ data: { count: 0 } }))
    //   ]);

      return {
        ...post,
        user: {
          id: post.author.id,
          username: post.author.username,
          avatar: undefined,
        },
        likes_count: 0,  // Default value
        comments_count: 0,  // Default value
        is_liked: false,
      };
    }));

    return { data: transformedPosts, status: response.status };
  },

  // Create a new post
  createPost: async (post: { content: string; book?: number; image?: string }): Promise<ApiResponse<Post>> => {
    const response = await api.post<PostResponse>('/posts/', post);
    const transformedPost = {
      ...response.data,
      user: {
        id: response.data.author.id,
        username: response.data.author.username,
        avatar: undefined,
      },
      likes_count: 0,
      comments_count: 0,
      is_liked: false,
    };
    return { data: transformedPost, status: response.status };
  },

  // Get a specific post
  getPost: async (postId: number): Promise<ApiResponse<Post>> => {
    const response = await api.get<PostResponse>(`/posts/${postId}/`);
    const [likesResponse, commentsResponse] = await Promise.all([
      api.get(`/posts/${postId}/likes/`).catch(() => ({ data: { count: 0 } })),
      api.get(`/posts/${postId}/comments/`).catch(() => ({ data: { count: 0 } }))
    ]);

    const transformedPost = {
      ...response.data,
      user: {
        id: response.data.author.id,
        username: response.data.author.username,
        avatar: undefined,
      },
      likes_count: likesResponse.data.count || 0,
      comments_count: commentsResponse.data.count || 0,
      is_liked: false,
    };
    return { data: transformedPost, status: response.status };
  },

  // Update a post
  updatePost: async (postId: number, post: Partial<Post>): Promise<ApiResponse<Post>> => {
    const response = await api.put<PostResponse>(`/posts/${postId}/`, post);
    const transformedPost = {
      ...response.data,
      user: {
        id: response.data.author.id,
        username: response.data.author.username,
        avatar: undefined,
      },
      likes_count: 0, // These will be updated when the post is fetched
      comments_count: 0,
      is_liked: false,
    };
    return { data: transformedPost, status: response.status };
  },

  // Delete a post
  deletePost: async (postId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/posts/${postId}/`);
    return { data: undefined, status: response.status };
  },

  // Like a post
  likePost: async (postId: number): Promise<ApiResponse<Post>> => {
    const response = await api.post<PostResponse>(`/posts/${postId}/like/`);
    const transformedPost = {
      ...response.data,
      user: {
        id: response.data.author.id,
        username: response.data.author.username,
        avatar: undefined,
      },
      likes_count: 0, // These will be updated when the post is fetched
      comments_count: 0,
      is_liked: true,
    };
    return { data: transformedPost, status: response.status };
  },

  // Unlike a post
  unlikePost: async (postId: number): Promise<ApiResponse<Post>> => {
    const response = await api.post<PostResponse>(`/posts/${postId}/unlike/`);
    const transformedPost = {
      ...response.data,
      user: {
        id: response.data.author.id,
        username: response.data.author.username,
        avatar: undefined,
      },
      likes_count: 0, // These will be updated when the post is fetched
      comments_count: 0,
      is_liked: false,
    };
    return { data: transformedPost, status: response.status };
  },
};

// Comments API
export const commentsApi = {
  // List all comments
  listComments: async (): Promise<ApiResponse<Comment[]>> => {
    const response = await api.get('/comments/');
    return { data: response.data, status: response.status };
  },

  // Create a new comment
  createComment: async (comment: Partial<Comment>): Promise<ApiResponse<Comment>> => {
    const response = await api.post('/comments/', comment);
    return { data: response.data, status: response.status };
  },

  // Get a specific comment
  getComment: async (commentId: number): Promise<ApiResponse<Comment>> => {
    const response = await api.get(`/comments/${commentId}/`);
    return { data: response.data, status: response.status };
  },

  // Update a comment
  updateComment: async (commentId: number, comment: Partial<Comment>): Promise<ApiResponse<Comment>> => {
    const response = await api.put(`/comments/${commentId}/`, comment);
    return { data: response.data, status: response.status };
  },

  // Delete a comment
  deleteComment: async (commentId: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/comments/${commentId}/`);
    return { data: undefined, status: response.status };
  },
};

// Auth API
export const authApi = {
  // Register a new user
  register: async (credentials: { email: string; password: string; password2: string }): Promise<ApiResponse<any>> => {
    const response = await api.post('/auth/register/', credentials);
    return { data: response.data, status: response.status };
  },

  // Login
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<any>> => {
    const response = await api.post('/auth/login/', credentials);
    return { data: response.data, status: response.status };
  },

  // Refresh token
  refreshToken: async (refresh: string): Promise<ApiResponse<{ access: string }>> => {
    const response = await api.post('/auth/token/refresh/', { refresh });
    return { data: response.data, status: response.status };
  },
};

// Export all APIs
export const apiClient = {
  books: booksApi,
  userBookStatus: userBookStatusApi,
  posts: postsApi,
  comments: commentsApi,
  auth: authApi,
};

export default apiClient; 