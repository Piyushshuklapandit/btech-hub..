# BTech Hub - Production Ready Full Stack Project

A complete educational platform built with **React**, **Node.js**, **Express**, and **MongoDB**.

## Features

- **Modern Homepage** - React-based responsive UI with hero section, features, and subject cards
- **Admin Panel** - Complete management system for subjects, chapters, and resources
- **Authentication** - JWT-based authentication with secure password hashing
- **Complete CRUD** - Manage subjects, chapters, and resources (YouTube, Drive, PDF, links)
- **Site Configuration** - Admin can update homepage text and First Year Drive link
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Security** - Helmet, rate limiting, input validation, CORS protection

## Project Structure

\`\`\`
bttech-hub/
├── frontend/              # React app
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── admin/       # Admin panel components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── context/         # Auth context
│   ├── app/globals.css  # Global styles
│   └── package.json
├── backend/              # Node.js/Express server
│   ├── routes/          # API routes
│   ├── models/          # MongoDB models
│   ├── middleware/      # Auth & error handling
│   ├── controllers/     # Route handlers
│   ├── server.js        # Express app
│   └── package.json
└── scripts/             # Database scripts
    └── seed.js          # Seed initial data
\`\`\`

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
\`\`\`

### Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT secret

# Run development server
npm run dev

# Or run in production
npm start

# Seed database (optional)
node scripts/seed.js
\`\`\`

## API Documentation

### Authentication
- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/register` - User registration

### Subjects
- **GET** `/api/subjects` - Get all subjects
- **GET** `/api/subjects/:id` - Get specific subject
- **POST** `/api/subjects` - Create subject (admin only)
- **PUT** `/api/subjects/:id` - Update subject (admin only)
- **DELETE** `/api/subjects/:id` - Delete subject (admin only)

### Chapters
- **GET** `/api/subjects/:subjectId/chapters` - Get all chapters
- **POST** `/api/subjects/:subjectId/chapters` - Create chapter (admin only)
- **PUT** `/api/subjects/:subjectId/chapters/:chapterId` - Update chapter (admin only)
- **DELETE** `/api/subjects/:subjectId/chapters/:chapterId` - Delete chapter (admin only)

### Resources
- **GET** `/api/subjects/:subjectId/chapters/:chapterId/resources` - Get resources
- **POST** `/api/subjects/:subjectId/chapters/:chapterId/resources` - Create resource (admin only)
- **PUT** `/api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId` - Update resource (admin only)
- **DELETE** `/api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId` - Delete resource (admin only)

### Configuration
- **GET** `/api/config` - Get site configuration
- **PUT** `/api/config` - Update configuration (admin only)

## Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Backend (Heroku/Railway/etc)
\`\`\`bash
# Deploy your backend service
\`\`\`

## Testing with Postman

Import the provided Postman collection to test all API endpoints:

1. Open Postman
2. Import `postman_collection.json`
3. Set up environment variables for `baseUrl` and `token`
4. Test each endpoint

## Default Admin Credentials

- Email: `admin@btech.com`
- Password: Set during seed script execution

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, JWT, Bcrypt
- **Tools**: Postman, MongoDB Compass

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
