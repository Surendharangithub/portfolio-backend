import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50, 
    message: { 
        success: false,
        message: 'Too many email requests, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) => ipKeyGenerator(req.ip ?? ''),

    handler: (req, res) => {
        return res.status(429).json({
            success: false,
            message: `Too many requests from ${req.ip}. Try again later.`
        });
    }
})