const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window
const MAX_MESSAGES_PER_WINDOW = 100;

function rateLimiter(ws, req, next) {
    const clientIP = req.socket.remoteAddress;
    const currentTime = Date.now();

    if (!rateLimitMap.has(clientIP)) {
        rateLimitMap.set(clientIP, { count: 1, startTime: currentTime });
    } else {
        const rateData = rateLimitMap.get(clientIP);
        if (currentTime - rateData.startTime > RATE_LIMIT_WINDOW_MS) {
            rateLimitMap.set(clientIP, { count: 1, startTime: currentTime });
        } else if (rateData.count < MAX_MESSAGES_PER_WINDOW) {
            rateData.count += 1;
        } else {
            ws.send(JSON.stringify({ error: 'Rate limit exceeded' }));
            ws.close();
            return;
        }
    }

    next();
}

module.exports = rateLimiter;
