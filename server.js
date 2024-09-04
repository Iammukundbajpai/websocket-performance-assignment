const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const rateLimiter = require('./rateLimiter');
const { getSession, saveSession } = require('./sessionManager');
const { getHeartbeatInterval, sendHeartbeat } = require('./heartbeatManager');
const { enqueueMessage, dequeueMessage } = require('./messageQueue');

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const clientCount = wss.clients.size;

    ws.on('message', async (message) => {
        rateLimiter(ws, req, () => {
            const msg = JSON.parse(message);
            enqueueMessage(msg);
            const processedMessage = dequeueMessage();
            // Handle message based on type, priority, etc.
        });
    });

    const interval = getHeartbeatInterval(clientCount);
    setInterval(() => sendHeartbeat(ws), interval);

    ws.on('close', () => {
        // Handle session cleanup, etc.
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${process.env.PORT || 8080}`);
});
