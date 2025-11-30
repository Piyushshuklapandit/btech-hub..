# BTech Hub Admin Guide

## Admin Panel Overview

The admin panel is your control center for managing all BTech Hub content.

### Accessing Admin Panel

1. Go to `http://localhost:3000/login`
2. Enter credentials:
   - Email: `admin@btech.com`
   - Password: `password123`
3. Click "Sign In"
4. You'll be redirected to `/admin`

### Admin Panel Tabs

#### 1. Manage Subjects Tab

**View All Subjects**
- See list of all subjects
- Shows: Name, Code, Semester, Description
- Shows action buttons for each subject

**Add Subject**
- Click "Add Subject" button
- Fill form:
  - **Subject Name**: Full name (e.g., "Data Structures")
  - **Code**: Subject code (e.g., "CS101")
  - **Description**: Brief description
  - **Semester**: Select 1-8
- Click "Add Subject"

**Edit Subject**
- Click "Edit" button on subject
- Modify fields
- Click "Update Subject"

**Delete Subject**
- Click "Delete" button
- Confirm deletion
- Subject and all chapters/resources deleted

**Manage Chapters**
- Click "Chapters" button
- See all chapters for that subject
- Add/Edit/Delete chapters
- Manage resources for each chapter

#### 2. Site Config Tab

**Update Homepage Title**
- Edit "Home Page Title" field
- This appears in browser tab and hero section
- Example: "Your Complete BTech Learning Platform"

**Update Homepage Description**
- Edit "Home Page Description" field
- This appears in hero section
- Example: "Access comprehensive study materials..."

**Update First Year Drive Link**
- Paste Google Drive folder link
- This appears in footer
- Students can access First Year resources
- Example: `https://drive.google.com/drive/folders/...`

**Save Configuration**
- Click "Save Configuration"
- See success message
- Changes appear on homepage immediately

## Workflow: Adding Complete Subject

### Step 1: Create Subject
1. Go to "Manage Subjects" tab
2. Click "Add Subject"
3. Fill:
   - Name: "Data Structures"
   - Code: "CS101"
   - Description: "Learn fundamental data structures and algorithms"
   - Semester: 2
4. Click "Add Subject"

### Step 2: Add Chapters
1. Click "Chapters" on the new subject
2. Click "Add Chapter"
3. Fill:
   - Name: "Introduction to Arrays"
   - Description: "Basic concepts of arrays and their operations"
4. Click "Add Chapter"
5. Repeat for more chapters:
   - "Linked Lists"
   - "Stacks and Queues"
   - "Trees"
   - "Graphs"

### Step 3: Add Resources to Each Chapter

For "Introduction to Arrays" chapter:

**Add YouTube Video**
1. Click "Resources" on chapter
2. Click "Add Resource"
3. Fill:
   - Title: "Arrays Basics Tutorial"
   - Type: "YouTube"
   - URL: `https://www.youtube.com/watch?v=...`
   - Description: "Complete tutorial on arrays from basics"
4. Click "Add Resource"

**Add PDF Notes**
1. Click "Add Resource"
2. Fill:
   - Title: "Arrays Study Notes"
   - Type: "PDF"
   - URL: `https://drive.google.com/file/d/...`
   - Description: "Complete notes on arrays with examples"
3. Click "Add Resource"

**Add Google Drive Folder**
1. Click "Add Resource"
2. Fill:
   - Title: "Arrays Practice Problems"
   - Type: "Drive"
   - URL: `https://drive.google.com/drive/folders/...`
   - Description: "Practice problems and solutions"
3. Click "Add Resource"

**Add External Link**
1. Click "Add Resource"
2. Fill:
   - Title: "GeeksforGeeks Arrays"
   - Type: "Link"
   - URL: `https://www.geeksforgeeks.org/array-data-structure/`
   - Description: "Comprehensive guide on arrays"
3. Click "Add Resource"

### Step 4: Verify on Homepage
1. Go to `http://localhost:3000`
2. Scroll to "Explore All Subjects"
3. See "Data Structures" card with gradient
4. Click card to see chapters and resources

## Best Practices

### Naming Conventions
- **Subject Code**: Use standard format (CS101, ME201, etc.)
- **Chapter Names**: Be descriptive (e.g., "Introduction to Arrays" not "Chapter 1")
- **Resource Titles**: Include type hint (e.g., "Arrays Tutorial (YouTube)")

### Resource Organization
- Add multiple resource types per chapter
- Include YouTube for visual learners
- Add PDFs for detailed notes
- Link to external resources
- Organize by difficulty level

### Content Quality
- Write clear descriptions
- Verify all links work
- Use consistent formatting
- Keep descriptions concise
- Update outdated resources

### Semester Organization
- Organize subjects by semester
- Group related subjects
- Follow curriculum order
- Update as curriculum changes

## Common Tasks

### Bulk Add Subjects
1. Create all subjects first
2. Then add chapters to each
3. Then add resources to chapters
4. Verify on homepage

### Update Resource Link
1. Go to subject → chapters
2. Click "Resources" on chapter
3. Click "Edit" on resource
4. Update URL
5. Click "Update Resource"

### Remove Outdated Content
1. Click "Delete" on resource/chapter/subject
2. Confirm deletion
3. Verify removed from homepage

### Reorganize Chapters
1. Delete chapter
2. Recreate in new order
3. Re-add resources

## Troubleshooting

### "Cannot add subject"
- Check all fields are filled
- Verify semester is 1-8
- Check code is unique

### "Resource link not working"
- Verify URL is correct
- Check link is publicly accessible
- Test link in new browser tab

### "Changes not showing on homepage"
- Refresh browser (Ctrl+F5)
- Clear browser cache
- Check backend is running

### "Cannot login to admin"
- Verify email: `admin@btech.com`
- Verify password: `password123`
- Check backend is running
- Clear browser cookies

## Tips & Tricks

### Quick Testing
1. Add test subject
2. Add test chapter
3. Add test resource
4. View on homepage
5. Delete test data

### Organizing Resources
- Group by difficulty: Basic → Intermediate → Advanced
- Group by type: Videos → Notes → Problems
- Add timestamps for long videos
- Link related resources

### Maintaining Quality
- Review resources monthly
- Remove broken links
- Update outdated content
- Add new resources regularly

### Performance
- Don't add too many resources per chapter (10-15 max)
- Use descriptive titles for easy searching
- Keep descriptions under 200 characters
- Organize chapters logically

## Advanced Features

### Bulk Operations
- Currently: Add one at a time
- Future: CSV import for bulk add

### Resource Scheduling
- Currently: All resources visible
- Future: Schedule resources by date

### User Analytics
- Currently: Not available
- Future: Track which resources are popular

### Content Versioning
- Currently: No version history
- Future: Track changes over time

---

**Happy managing!** 📚

For more help, see QUICK_START.md or API_DOCUMENTATION.md
