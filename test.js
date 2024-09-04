const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to server');
    ws.send(JSON.stringify({ type: 'test', priority: 1 }));
});

ws.on('message', (message) => {
    console.log('Received:', message);
});
