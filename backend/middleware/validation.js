const validateSubject = (req, res, next) => {
  const { name, code, semester } = req.body

  if (!name || !code || !semester) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  if (typeof semester !== "number" || semester < 1 || semester > 8) {
    return res.status(400).json({ error: "Invalid semester" })
  }

  next()
}

const validateResource = (req, res, next) => {
  const { title, type, url } = req.body

  if (!title || !type || !url) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  if (!["youtube", "drive", "pdf", "link"].includes(type)) {
    return res.status(400).json({ error: "Invalid resource type" })
  }

  try {
    new URL(url)
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL" })
  }

  next()
}

module.exports = { validateSubject, validateResource }
