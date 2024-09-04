const priorityQueue = [];

function enqueueMessage(message) {
    priorityQueue.push(message);
    priorityQueue.sort((a, b) => b.priority - a.priority);
}

function dequeueMessage() {
    return priorityQueue.shift();
}

module.exports = { enqueueMessage, dequeueMessage };
