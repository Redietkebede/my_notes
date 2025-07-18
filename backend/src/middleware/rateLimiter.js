import ratelimiter from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimiter.limit("myRateLimit");
        if (!success) {
            return res.status(429).json({ message: "Rate limit exceeded. Try again later." });
        }
        
        next();
    } catch (error) {
        console.error("Rate Limiter Error:", error);
        next(error);
        
    }
}

export default rateLimiter;