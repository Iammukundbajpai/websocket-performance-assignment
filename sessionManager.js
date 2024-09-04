const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

async function getSession(sessionId) {
    return JSON.parse(await client.get(sessionId));
}

async function saveSession(sessionId, sessionData) {
    await client.set(sessionId, JSON.stringify(sessionData));
}

module.exports = { getSession, saveSession };
