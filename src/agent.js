const { remember, recall } = require("./memory");

async function processMessage(message) {
  remember(message.user, message.text);

  const history = recall(message.user);

  const text = message.text.toLowerCase();

  if (text.includes("hello")) {
    return `Hello <@${message.user}> 👋`;
  }

  if (text.includes("my history")) {
    return `You recently said:\n${history.join("\n")}`;
  }

  if (text.includes("help")) {
    return `
🤖 Available commands:

• hello
• help
• my history
• remember this <text>
`;
  }

  if (text.startsWith("remember this")) {
    const fact = text.replace("remember this", "");
    remember(message.user, fact);

    return `Got it! I'll remember:${fact}`;
  }
  if (text.includes("time")) {
  return `Current time is: ${new Date().toLocaleString()}`;
}
if (text.includes("what is recursion")) {
  return "Recursion is a programming technique where a function calls itself until a base condition is met.";
}

if (text.includes("what is javascript")) {
  return "JavaScript is a programming language primarily used for web development.";
}

  return `You said: "${message.text}"`;
}

module.exports = {
  processMessage
};