function getHeartbeatInterval(clientCount) {
    if (clientCount < 50) return 30000; // 30 seconds
    if (clientCount < 100) return 15000; // 15 seconds
    return 5000; // 5 seconds for high load
}

function sendHeartbeat(ws) {
    ws.send(JSON.stringify({ type: 'heartbeat' }));
}

module.exports = { getHeartbeatInterval, sendHeartbeat };
