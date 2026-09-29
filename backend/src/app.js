const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Trust reverse proxy for secure cookies on cloud hosts (Render, Railway, Vercel, etc.)
app.set("trust proxy", 1)

app.use(express.json())
app.use(cookieParser())

// Define allowed origins (Local development + Vercel domains + Custom frontend URLs)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true)

        // Check if origin matches allowed list or is a Vercel preview/production domain
        const isAllowed = allowedOrigins.includes(origin) ||
            /\.vercel\.app$/.test(origin)

        if (isAllowed) {
            callback(null, true)
        } else {
            callback(null, true) // fallback or allow during development
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"]
}))

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Backend is running smoothly" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app