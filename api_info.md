# ReadingRoom API Documentation

## Base URL

```
http://127.0.0.1:8000/api
```

## Authentication

The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Endpoints

### Books

#### Search Books

```http
GET /books/search/
```

Search for books using Google Books API.

**Query Parameters:**

- `q` (required): Search query string

**Response:**

```json
{
    "totalItems": 20,
    "items": [
        {
            "id": "string",
            "title": "string",
            "authors": ["string"],
            "description": "string",
            "imageLinks": {
                "smallThumbnail": "string",
                "thumbnail": "string"
            },
            "publishedDate": "string",
            "publisher": "string",
            "averageRating": number
        }
    ]
}
```

#### Save Google Book

```http
POST /books/save-google-book/
```

Save a book from Google Books to your library.

**Request Body:**

```json
{
  "book_id": "string" // Google Books ID
}
```

**Response:** Book object (201 Created)

#### List/Create Books

```http
GET /books/
POST /books/
```

List all books or create a new book.

**GET Response:** List of books
**POST Request Body:** Book object
**POST Response:** Created book (201 Created)

#### Retrieve/Update/Delete Book

```http
GET /books/{book_id}/
PUT /books/{book_id}/
DELETE /books/{book_id}/
```

Get, update, or delete a specific book.

**Response:** Book object or 204 No Content (for DELETE)

### User Book Status

#### List/Create User Book Status

```http
GET /books/user-status/
POST /books/user-status/
```

List or create a user's book status (e.g., reading, completed, etc.).

**GET Response:** List of user book statuses
**POST Request Body:** User book status object
**POST Response:** Created status (201 Created)

#### Update User Book Status

```http
PUT /books/user-status/{status_id}/
```

Update a user's book status.

**Request Body:** User book status object
**Response:** Updated status

### Posts

#### Create Post

```http
POST /posts/
```

Create a new post.

**Request Body:** Post object
**Response:** Created post (201 Created)

#### List/Create Posts

```http
GET /posts/
POST /posts/
```

List all posts or create a new post.

**GET Response:** List of posts
**POST Request Body:** Post object
**POST Response:** Created post (201 Created)

#### Retrieve/Update/Delete Post

```http
GET /posts/{post_id}/
PUT /posts/{post_id}/
DELETE /posts/{post_id}/
```

Get, update, or delete a specific post.

**Response:** Post object or 204 No Content (for DELETE)

#### Like/Unlike Post

```http
POST /posts/{post_id}/like/
POST /posts/{post_id}/unlike/
```

Like or unlike a post.

**Response:** Updated post object

### Comments

#### List/Create Comments

```http
GET /comments/
POST /comments/
```

List all comments or create a new comment.

**GET Response:** List of comments
**POST Request Body:** Comment object
**POST Response:** Created comment (201 Created)

#### Retrieve/Update/Delete Comment

```http
GET /comments/{comment_id}/
PUT /comments/{comment_id}/
DELETE /comments/{comment_id}/
```

Get, update, or delete a specific comment.

**Response:** Comment object or 204 No Content (for DELETE)

### Authentication

#### Register

```http
POST /auth/register/
```

Register a new user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "password2": "string"
}
```

**Response:** User object and tokens

#### Login

```http
POST /auth/login/
```

Login and get JWT tokens.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** Access and refresh tokens

#### Refresh Token

```http
POST /auth/token/refresh/
```

Get a new access token using refresh token.

**Request Body:**

```json
{
  "refresh": "string"
}
```

**Response:** New access token

## Common Response Status Codes

- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse. Please contact the administrator if you need higher limits.

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message",
  "detail": "Detailed error information (if available)"
}
```

## Notes

- All timestamps are in UTC
- Pagination is implemented for list endpoints
- Maximum of 20 books returned in search results
- Authentication is required for most endpoints except search and public book listings
