# BTech Hub Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository with frontend code

### Steps

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository

2. **Configure Environment Variables**
   - Add environment variable in Project Settings:
     - `NEXT_PUBLIC_BACKEND_URL`: Your backend API URL
     - `NEXT_PUBLIC_API_BASE`: `/api` (for internal routing)

3. **Deploy**
   - Vercel automatically deploys on push to main branch
   - Your app will be available at `your-project.vercel.app`

## Backend Deployment

### Option 1: Railway.app

1. **Create Project**
   - Go to https://railway.app
   - Create new project
   - Connect GitHub repository

2. **Add MongoDB Plugin**
   - Add MongoDB plugin from Railway catalog
   - Get connection string

3. **Set Environment Variables**
   \`\`\`
   MONGODB_URI=<from Railway MongoDB>
   JWT_SECRET=your-secure-secret-key
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   \`\`\`

4. **Deploy**
   - Railway auto-deploys on push

### Option 2: Heroku (Legacy)

\`\`\`bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-btech-hub

# Set environment variables
heroku config:set MONGODB_URI=<uri>
heroku config:set JWT_SECRET=<secret>

# Deploy
git push heroku main
\`\`\`

### Option 3: Self-Hosted (AWS/DigitalOcean)

1. **SSH into Server**
   \`\`\`bash
   ssh root@your-server-ip
   \`\`\`

2. **Install Node.js and MongoDB**
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   sudo apt-get install -y mongodb
   \`\`\`

3. **Clone Repository**
   \`\`\`bash
   git clone your-repo
   cd backend
   npm install
   \`\`\`

4. **Setup Environment**
   \`\`\`bash
   cp .env.production .env
   # Edit .env with production values
   \`\`\`

5. **Use PM2 for Process Management**
   \`\`\`bash
   npm install -g pm2
   pm2 start server.js --name "btech-hub"
   pm2 startup
   pm2 save
   \`\`\`

6. **Setup Nginx Reverse Proxy**
   \`\`\`nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## Database Setup

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add IP whitelist
5. Use connection string in `MONGODB_URI`

### Local MongoDB

\`\`\`bash
# Install MongoDB
# Start MongoDB
mongod

# In .env
MONGODB_URI=mongodb://localhost:27017/btech-hub
\`\`\`

## Production Checklist

- [ ] Change JWT_SECRET to secure random string (min 32 chars)
- [ ] Update CORS_ORIGIN to production domain
- [ ] Enable HTTPS (SSL certificate)
- [ ] Setup database backups
- [ ] Enable rate limiting
- [ ] Configure error logging (e.g., Sentry)
- [ ] Setup monitoring (e.g., New Relic)
- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Test file uploads/downloads
- [ ] Setup automated tests
- [ ] Document API changes

## Monitoring

### Error Tracking
- Setup Sentry: https://sentry.io
- Add to backend:
  \`\`\`javascript
  const Sentry = require("@sentry/node");
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  app.use(Sentry.Handlers.errorHandler());
  \`\`\`

### Performance Monitoring
- Use New Relic or DataDog
- Monitor API response times
- Track database queries

### Logging
\`\`\`javascript
// Use Winston or Pino for structured logging
const logger = require('winston').createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ]
});
\`\`\`

## Scaling

### Horizontal Scaling
- Run multiple backend instances
- Use load balancer (Nginx, AWS ALB)
- Setup database replication

### Database Optimization
\`\`\`javascript
// Add indexes
db.subjects.createIndex({ code: 1 });
db.chapters.createIndex({ subject: 1 });
db.resources.createIndex({ chapter: 1 });
\`\`\`

### Caching
- Add Redis for session storage
- Cache frequently accessed data
\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

// Cache subjects
const cachedSubjects = await client.get('subjects');
\`\`\`

## Backup & Recovery

### MongoDB Backup
\`\`\`bash
# Backup
mongodump --uri "mongodb://localhost:27017/btech-hub" --out ./backup

# Restore
mongorestore --uri "mongodb://localhost:27017/btech-hub" ./backup
\`\`\`

### Automated Backups
\`\`\`bash
# Setup cron job
0 2 * * * mongodump --uri "$MONGODB_URI" --out /backups/$(date +\%Y\%m\%d)
\`\`\`

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI format
- Verify IP whitelist (if using Atlas)
- Check credentials

### "CORS errors"
- Update CORS_ORIGIN in backend
- Check frontend URL matches CORS_ORIGIN

### "JWT verification failed"
- Ensure JWT_SECRET matches between frontend and backend
- Check token expiration

### "High API latency"
- Add database indexes
- Optimize queries
- Enable Redis caching
- Scale horizontally
