# BTech Hub Testing Guide

## Manual API Testing

### Using Postman

1. **Import Collection**
   - Open Postman
   - Click "Import" 
   - Upload `postman_collection.json`
   - Set environment variables:
     - `baseUrl`: http://localhost:3001
     - `token`: (obtained after login)

2. **Test Workflow**
   \`\`\`
   1. Login → Get token
   2. Create Subject
   3. Get Subjects
   4. Create Chapter
   5. Create Resource
   6. Update Config
   \`\`\`

### Using cURL

\`\`\`bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@btech.com","password":"password123"}'

# Get token from response
TOKEN="your-token-here"

# Create Subject
curl -X POST http://localhost:3001/api/subjects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Data Structures",
    "code":"CS101",
    "description":"Learn data structures",
    "semester":2
  }'

# Get all subjects
curl http://localhost:3001/api/subjects
\`\`\`

## Unit Testing

### Setup Jest

\`\`\`bash
npm install --save-dev jest @types/jest
npx jest --init
\`\`\`

### Example Test

\`\`\`javascript
// __tests__/api.test.js
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

describe('Subjects API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/subjects should return array', async () => {
    const response = await request(app).get('/api/subjects');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/subjects should create subject', async () => {
    const response = await request(app)
      .post('/api/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Subject',
        code: 'TEST101',
        description: 'Test',
        semester: 1
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Subject');
  });
});
\`\`\`

## Frontend Testing

\`\`\`javascript
// __tests__/components/SubjectCard.test.jsx
import { render, screen } from '@testing-library/react';
import SubjectCard from '@/components/SubjectCard';

describe('SubjectCard', () => {
  const subject = {
    _id: '1',
    name: 'Data Structures',
    code: 'CS101',
    description: 'Learn data structures',
    semester: 2,
    chapters: 10
  };

  test('renders subject name', () => {
    render(<SubjectCard subject={subject} />);
    expect(screen.getByText('Data Structures')).toBeInTheDocument();
  });

  test('renders subject code', () => {
    render(<SubjectCard subject={subject} />);
    expect(screen.getByText(/CS101/)).toBeInTheDocument();
  });
});
\`\`\`

## Performance Testing

### Load Testing with Apache Bench

\`\`\`bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test endpoint
ab -n 1000 -c 10 http://localhost:3001/api/subjects

# Test with POST
ab -n 1000 -c 10 -p data.json -T application/json \
  http://localhost:3001/api/subjects
\`\`\`

### Load Testing with Artillery

\`\`\`bash
npm install -g artillery

# Create load-test.yml
targets:
  - "http://localhost:3001"
scenarios:
  - name: "Load test"
    flow:
      - get:
          url: "/api/subjects"
      - post:
          url: "/api/subjects"
          json:
            name: "Test"

# Run test
artillery run load-test.yml
\`\`\`

## Continuous Integration

### GitHub Actions

\`\`\`yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo
        options: --health-cmd mongosh --health-interval 10s
        
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm test
      - run: npm run lint
\`\`\`

## Checklist

- [ ] All API endpoints tested
- [ ] Authentication/authorization tested
- [ ] Input validation tested
- [ ] Error handling tested
- [ ] Frontend components tested
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Responsive design verified
