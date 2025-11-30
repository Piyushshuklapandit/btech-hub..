# BTech Hub API Documentation

## Base URL
- Development: `http://localhost:3001`
- Production: `https://api.yourdomain.com`

## Authentication

All admin endpoints require Bearer token in Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### Login
\`\`\`
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@btech.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@btech.com",
    "role": "admin"
  }
}
\`\`\`

## Subjects

### Get All Subjects
\`\`\`
GET /api/subjects

Response:
[
  {
    "_id": "...",
    "name": "Data Structures",
    "code": "CS101",
    "description": "Learn data structures",
    "semester": 2,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
\`\`\`

### Get Single Subject
\`\`\`
GET /api/subjects/:id
\`\`\`

### Create Subject (Admin Only)
\`\`\`
POST /api/subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Data Structures",
  "code": "CS101",
  "description": "Learn data structures",
  "semester": 2
}

Response: 201 Created
{
  "_id": "...",
  "name": "Data Structures",
  "code": "CS101",
  "description": "Learn data structures",
  "semester": 2
}
\`\`\`

### Update Subject (Admin Only)
\`\`\`
PUT /api/subjects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}

Response: 200 OK
\`\`\`

### Delete Subject (Admin Only)
\`\`\`
DELETE /api/subjects/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true
}
\`\`\`

## Chapters

### Get Chapters for Subject
\`\`\`
GET /api/subjects/:subjectId/chapters

Response:
[
  {
    "_id": "...",
    "name": "Introduction to Arrays",
    "description": "Basic concepts",
    "subject": "...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
\`\`\`

### Create Chapter (Admin Only)
\`\`\`
POST /api/subjects/:subjectId/chapters
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Introduction to Arrays",
  "description": "Basic concepts of arrays"
}

Response: 201 Created
\`\`\`

### Update Chapter (Admin Only)
\`\`\`
PUT /api/subjects/:subjectId/chapters/:chapterId
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

### Delete Chapter (Admin Only)
\`\`\`
DELETE /api/subjects/:subjectId/chapters/:chapterId
Authorization: Bearer <token>

Response: 200 OK
\`\`\`

## Resources

### Get Resources for Chapter
\`\`\`
GET /api/subjects/:subjectId/chapters/:chapterId/resources

Response:
[
  {
    "_id": "...",
    "title": "Arrays Tutorial",
    "type": "youtube",
    "url": "https://youtube.com/...",
    "description": "Complete tutorial",
    "chapter": "...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
\`\`\`

### Create Resource (Admin Only)
\`\`\`
POST /api/subjects/:subjectId/chapters/:chapterId/resources
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Arrays Tutorial",
  "type": "youtube",
  "url": "https://youtube.com/...",
  "description": "Complete tutorial on arrays"
}

Response: 201 Created
\`\`\`

Resource Types: `youtube`, `drive`, `pdf`, `link`

### Update Resource (Admin Only)
\`\`\`
PUT /api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

### Delete Resource (Admin Only)
\`\`\`
DELETE /api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId
Authorization: Bearer <token>

Response: 200 OK
\`\`\`

## Configuration

### Get Config
\`\`\`
GET /api/config

Response:
{
  "_id": "...",
  "homeTitle": "BTech Hub - Your Engineering Platform",
  "homeDescription": "Complete study materials...",
  "firstYearDriveLink": "https://drive.google.com/...",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Update Config (Admin Only)
\`\`\`
PUT /api/config
Authorization: Bearer <token>
Content-Type: application/json

{
  "homeTitle": "New Title",
  "homeDescription": "New description",
  "firstYearDriveLink": "https://drive.google.com/..."
}

Response: 200 OK
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`
{
  "error": "Invalid request data"
}
\`\`\`

### 401 Unauthorized
\`\`\`
{
  "error": "Invalid credentials"
}
\`\`\`

### 403 Forbidden
\`\`\`
{
  "error": "Admin access required"
}
\`\`\`

### 500 Server Error
\`\`\`
{
  "error": "Server error"
}
\`\`\`

## Rate Limiting

- Rate limit: 100 requests per 15 minutes
- Header: `X-RateLimit-Limit: 100`
- Header: `X-RateLimit-Remaining: 95`
- Header: `X-RateLimit-Reset: 1609459200`
