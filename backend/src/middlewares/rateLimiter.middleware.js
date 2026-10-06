const { rateLimit, ipKeyGenerator } = require("express-rate-limit")

/**
 * Standard Rate Limiting Middleware Suite
 * Provides tiered protection:
 * 1. globalLimiter: Broad DoS and scraping prevention across all API endpoints
 * 2. authLimiter: Strict protection against brute-force and credential stuffing
 * 3. aiGenerationLimiter: Strict protection for expensive Gemini AI & Puppeteer operations
 */

// Custom standard JSON handler for rate limit exceeded
const rateLimitHandler = (message) => (req, res, next, options) => {
    res.status(options.statusCode || 429).json({
        status: 429,
        error: "Too Many Requests",
        message: message || "You have exceeded the request rate limit. Please try again later."
    })
}

/**
 * 1. Global API Rate Limiter
 * Limits general API traffic across all endpoints
 * Default: 100 requests per 15 minutes per IP
 */
const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: "draft-8", // Returns standard RateLimit headers (RFC draft-8)
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.path === "/api/health" || req.path === "/health", // Do not rate limit health checks
    handler: rateLimitHandler("Too many requests from this IP. Please try again after 15 minutes.")
})

/**
 * 2. Auth Rate Limiter
 * Stricter limit for authentication endpoints (/login, /register) to prevent brute-force attacks
 * Default: 15 attempts per 15 minutes per IP
 */
const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 15, // Limit each IP to 15 auth attempts per windowMs
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: rateLimitHandler("Too many authentication attempts from this IP. Please wait 15 minutes before trying again.")
})

/**
 * 3. AI & PDF Generation Rate Limiter
 * Protects resource-heavy endpoints (Gemini AI queries & Puppeteer PDF generation)
 * Default: 15 generation requests per 15 minutes
 */
const aiGenerationLimiter = rateLimit({
    windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.AI_RATE_LIMIT_MAX) || 15, // Limit each user/IP to 15 generations per windowMs
    standardHeaders: "draft-8",
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.user?.id || ipKeyGenerator(req)
    },
    handler: rateLimitHandler("You have reached the limit for AI report and PDF generation. Please wait a few minutes before submitting new requests.")
})

module.exports = {
    globalLimiter,
    authLimiter,
    aiGenerationLimiter
}
