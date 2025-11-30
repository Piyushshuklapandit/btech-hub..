# BTech Hub - Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 16+
- MongoDB (Atlas or local)
- Git

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/btech-hub.git
cd btech-hub
\`\`\`

### Step 2: Frontend Setup
\`\`\`bash
# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:3001" > .env.local

# Start development server
npm run dev
\`\`\`

Frontend is now at `http://localhost:3000`

### Step 3: Backend Setup
\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env
cp .env.example .env

# Update MongoDB URI in .env
# MONGODB_URI=mongodb://localhost:27017/btech-hub

# Start server
npm run dev
\`\`\`

Backend is now at `http://localhost:3001`

### Step 4: Seed Database (Optional)
\`\`\`bash
# From backend directory
node scripts/seed.js
\`\`\`

This creates:
- Admin user: `admin@btech.com` / `password123`
- Sample subjects: Data Structures, Web Development, Database Management
- Sample chapters and resources

### Step 5: Login to Admin Panel
1. Go to `http://localhost:3000/login`
2. Enter: `admin@btech.com` / `password123`
3. Click "Sign In"
4. You'll be redirected to admin panel at `/admin`

## First Time Tasks

1. **Update Site Config**
   - Go to Admin → Site Config
   - Update home title and description
   - Paste your Google Drive link for First Year
   - Click "Save Configuration"

2. **Add Your First Subject**
   - Go to Admin → Manage Subjects
   - Click "Add Subject"
   - Fill in details (name, code, description, semester)
   - Click "Add Subject"

3. **Add Chapters to Subject**
   - Click "Chapters" button on the subject
   - Click "Add Chapter"
   - Fill in chapter details
   - Click "Add Chapter"

4. **Add Resources to Chapter**
   - Click "Resources" on the chapter
   - Click "Add Resource"
   - Fill in:
     - Title: Resource name
     - Type: YouTube, Drive, PDF, or Link
     - URL: Direct link to resource
     - Description: Brief description
   - Click "Add Resource"

5. **View Public Homepage**
   - Go to `http://localhost:3000`
   - You'll see all your subjects with resources
   - Users can search and browse

## File Structure Reference

\`\`\`
btech-hub/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── login/page.tsx          # Login page
│   ├── admin/page.tsx          # Admin dashboard
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   ├── subjects/
│   │   └── config/
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── components/
│   ├── admin/                  # Admin components
│   │   ├── SubjectsManager.tsx
│   │   ├── ChaptersManager.tsx
│   │   ├── ResourcesManager.tsx
│   │   └── SiteConfigManager.tsx
│   ├── Header.tsx              # Main header
│   ├── Hero.tsx                # Hero section
│   ├── Features.tsx            # Features section
│   ├── SubjectsGrid.tsx        # Subjects display
│   └── Footer.tsx              # Footer
├── context/
│   └── AuthContext.tsx         # Auth state
├── lib/
│   └── api-client.ts           # API utilities
├── middleware/
│   └── protected-route.tsx     # Route protection
├── backend/
│   ├── server.js               # Express server
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   └── middleware/             # Express middleware
├── scripts/
│   └── seed.js                 # Database seeding
└── README.md                   # Documentation
\`\`\`

## Environment Variables

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE=/api
\`\`\`

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/btech-hub
JWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
\`\`\`

## Common Issues & Solutions

### "Cannot connect to MongoDB"
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env
- Check network connectivity

### "CORS Error"
- Ensure CORS_ORIGIN matches frontend URL
- Restart backend server

### "Login page not showing"
- Clear browser cache
- Check if frontend is running on port 3000
- Verify NEXT_PUBLIC_BACKEND_URL is correct

### "Subjects not loading"
- Check if backend is running
- Verify database has subjects
- Check browser console for errors

## Testing Workflow

1. **Create Subject** → Go to admin → Add Mathematics
2. **Add Chapter** → Click Chapters → Add "Calculus"
3. **Add Resource** → Click Resources → Add YouTube video
4. **View Homepage** → Go to localhost:3000 → See subject card
5. **Click Subject** → See chapter with resources

## Next Steps

- Customize styling in `app/globals.css`
- Add more subjects/chapters/resources
- Deploy to production (see DEPLOYMENT_GUIDE.md)
- Add more features (user profiles, progress tracking, etc.)

## Getting Help

- Check API_DOCUMENTATION.md for API reference
- See DEPLOYMENT_GUIDE.md for production setup
- Review TESTING_GUIDE.md for testing
