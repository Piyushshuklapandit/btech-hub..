// Backend seed script - run this to initialize the database
// Usage: node scripts/seed.js

const mongoose = require("mongoose")
require("dotenv").config()

// Database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/btech-hub")

// Define schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
})

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  description: String,
  semester: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const ChapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subject: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
})

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["youtube", "drive", "pdf", "link"], required: true },
  url: { type: String, required: true },
  description: String,
  chapter: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
})

const ConfigSchema = new mongoose.Schema({
  homeTitle: { type: String, default: "Your Complete BTech Learning Platform" },
  homeDescription: {
    type: String,
    default: "Access comprehensive study materials, notes, and resources for all BTech subjects.",
  },
  firstYearDriveLink: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", UserSchema)
const Subject = mongoose.model("Subject", SubjectSchema)
const Chapter = mongoose.model("Chapter", ChapterSchema)
const Resource = mongoose.model("Resource", ResourceSchema)
const Config = mongoose.model("Config", ConfigSchema)

async function seed() {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Subject.deleteMany({}),
      Chapter.deleteMany({}),
      Resource.deleteMany({}),
      Config.deleteMany({}),
    ])

    console.log("Creating admin user...")
    const admin = await User.create({
      email: "admin@btech.com",
      password: "hashedPassword123", // Use bcrypt in production
      role: "admin",
    })

    console.log("Creating subjects...")
    const subjects = await Subject.insertMany([
      {
        name: "Data Structures",
        code: "CS101",
        description: "Learn fundamental data structures and algorithms",
        semester: 2,
      },
      {
        name: "Web Development",
        code: "CS201",
        description: "Master full-stack web development",
        semester: 3,
      },
      {
        name: "Database Management",
        code: "CS202",
        description: "Learn database design and management",
        semester: 4,
      },
    ])

    console.log("Creating chapters...")
    const chapters = await Chapter.insertMany([
      {
        name: "Introduction to Arrays",
        description: "Basic concepts of arrays",
        subject: subjects[0]._id,
      },
      {
        name: "Linked Lists",
        description: "Understanding linked list data structure",
        subject: subjects[0]._id,
      },
    ])

    console.log("Creating resources...")
    await Resource.insertMany([
      {
        title: "Arrays Basics Tutorial",
        type: "youtube",
        url: "https://www.youtube.com/watch?v=arrays",
        description: "Complete tutorial on arrays",
        chapter: chapters[0]._id,
      },
      {
        title: "Arrays Study Notes",
        type: "pdf",
        url: "https://drive.google.com/file/d/arrays-notes",
        description: "Complete notes on arrays",
        chapter: chapters[0]._id,
      },
    ])

    console.log("Creating config...")
    await Config.create({
      homeTitle: "BTech Hub - Your Engineering Learning Platform",
      homeDescription: "Complete BTech resources, notes, and study materials for engineering students",
      firstYearDriveLink: "https://drive.google.com/drive/folders/your-first-year-folder",
    })

    console.log("Seed completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Seed error:", error)
    process.exit(1)
  }
}

seed()
