const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const app = express()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
app.use("/api/", limiter)

app.use(express.json({ limit: "10mb" }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/btech-hub")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err))

// Models
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
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  createdAt: { type: Date, default: Date.now },
})

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["youtube", "drive", "pdf", "link"], required: true },
  url: { type: String, required: true },
  description: String,
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  createdAt: { type: Date, default: Date.now },
})

const ConfigSchema = new mongoose.Schema({
  homeTitle: { type: String, default: "Your Complete BTech Learning Platform" },
  homeDescription: { type: String, default: "Access comprehensive study materials..." },
  firstYearDriveLink: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", UserSchema)
const Subject = mongoose.model("Subject", SubjectSchema)
const Chapter = mongoose.model("Chapter", ChapterSchema)
const Resource = mongoose.model("Resource", ResourceSchema)
const Config = mongoose.model("Config", ConfigSchema)

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Unauthorized" })
  // In production, verify JWT token
  req.token = token
  next()
}

const authorize = async (req, res, next) => {
  try {
    // In production, extract user from JWT token
    const user = await User.findOne({ _id: req.userId })
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}

// Routes
// Auth
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // In production, use bcrypt to compare passwords
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    res.json({
      token: "fake-jwt-token-" + user._id,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Subjects
app.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ semester: 1 })
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/subjects", authenticate, async (req, res) => {
  try {
    const subject = await Subject.create(req.body)
    res.status(201).json(subject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/subjects/:id", authenticate, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(subject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/subjects/:id", authenticate, async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Chapters
app.get("/api/subjects/:subjectId/chapters", async (req, res) => {
  try {
    const chapters = await Chapter.find({ subject: req.params.subjectId })
    res.json(chapters)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/subjects/:subjectId/chapters", authenticate, async (req, res) => {
  try {
    const chapter = await Chapter.create({
      ...req.body,
      subject: req.params.subjectId,
    })
    res.status(201).json(chapter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/subjects/:subjectId/chapters/:chapterId", authenticate, async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.chapterId, req.body, { new: true })
    res.json(chapter)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/subjects/:subjectId/chapters/:chapterId", authenticate, async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.chapterId)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Resources
app.get("/api/subjects/:subjectId/chapters/:chapterId/resources", async (req, res) => {
  try {
    const resources = await Resource.find({ chapter: req.params.chapterId })
    res.json(resources)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/api/subjects/:subjectId/chapters/:chapterId/resources", authenticate, async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      chapter: req.params.chapterId,
    })
    res.status(201).json(resource)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put("/api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId", authenticate, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.resourceId, req.body, { new: true })
    res.json(resource)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete("/api/subjects/:subjectId/chapters/:chapterId/resources/:resourceId", authenticate, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.resourceId)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Config
app.get("/api/config", async (req, res) => {
  try {
    let config = await Config.findOne()
    if (!config) {
      config = await Config.create({})
    }
    res.json(config)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

app.put("/api/config", authenticate, async (req, res) => {
  try {
    let config = await Config.findOne()
    if (!config) {
      config = await Config.create(req.body)
    } else {
      config = await Config.findByIdAndUpdate(config._id, req.body, { new: true })
    }
    res.json(config)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
