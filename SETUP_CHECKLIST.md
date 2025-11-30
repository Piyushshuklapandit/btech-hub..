# BTech Hub Setup Checklist

## Pre-Setup
- [ ] Node.js 16+ installed
- [ ] MongoDB installed or Atlas account created
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Postman installed (optional, for API testing)

## Frontend Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Add `NEXT_PUBLIC_BACKEND_URL=http://localhost:3001`
- [ ] Run `npm run dev`
- [ ] Verify frontend loads at `http://localhost:3000`

## Backend Setup
- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Update `MONGODB_URI` with your MongoDB connection
- [ ] Update `JWT_SECRET` with a secure random string
- [ ] Run `npm run dev`
- [ ] Verify backend runs at `http://localhost:3001`

## Database Setup
- [ ] MongoDB running (local or Atlas)
- [ ] Database connection verified
- [ ] Run seed script: `node scripts/seed.js`
- [ ] Verify data in MongoDB

## Admin Panel Testing
- [ ] Navigate to `http://localhost:3000/login`
- [ ] Login with `admin@btech.com` / `password123`
- [ ] Verify redirect to `/admin`
- [ ] Check "Manage Subjects" tab
- [ ] Check "Site Config" tab

## Feature Testing
- [ ] [ ] Create new subject
- [ ] [ ] Add chapter to subject
- [ ] [ ] Add resource to chapter
- [ ] [ ] Update site configuration
- [ ] [ ] View homepage with new data
- [ ] [ ] Search functionality works
- [ ] [ ] Mobile responsive design works
- [ ] [ ] Logout functionality works

## API Testing
- [ ] [ ] Test GET /api/subjects
- [ ] [ ] Test POST /api/subjects (with auth)
- [ ] [ ] Test GET /api/config
- [ ] [ ] Test PUT /api/config (with auth)
- [ ] [ ] Test authentication endpoints
- [ ] [ ] Test error handling

## Deployment Preparation
- [ ] [ ] Environment variables documented
- [ ] [ ] Database backups configured
- [ ] [ ] Error logging setup
- [ ] [ ] Performance optimized
- [ ] [ ] Security headers configured
- [ ] [ ] CORS properly configured
- [ ] [ ] Rate limiting enabled
- [ ] [ ] Input validation implemented

## Production Deployment
- [ ] [ ] Frontend deployed to Vercel
- [ ] [ ] Backend deployed to hosting service
- [ ] [ ] Database migrated to production
- [ ] [ ] Environment variables set in production
- [ ] [ ] SSL certificate configured
- [ ] [ ] Domain configured
- [ ] [ ] Monitoring setup
- [ ] [ ] Backup strategy implemented

## Post-Deployment
- [ ] [ ] Test all features in production
- [ ] [ ] Verify admin panel works
- [ ] [ ] Check homepage loads correctly
- [ ] [ ] Test authentication flow
- [ ] [ ] Monitor error logs
- [ ] [ ] Check performance metrics
- [ ] [ ] Verify backups are working
