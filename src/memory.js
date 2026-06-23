const fs = require("fs");

const FILE = "memory.json";

function loadMemory() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "{}");
  }

  return JSON.parse(fs.readFileSync(FILE));
}

function saveMemory(memory) {
  fs.writeFileSync(FILE, JSON.stringify(memory, null, 2));
}

function remember(userId, text) {
  const memory = loadMemory();

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push(text);

  if (memory[userId].length > 10) {
    memory[userId].shift();
  }

  saveMemory(memory);
}

function recall(userId) {
  const memory = loadMemory();
  return memory[userId] || [];
}

module.exports = {
  remember,
  recall
};