require("dotenv").config();

const { App } = require("@slack/bolt");
const { processMessage } = require("./agent");
const express = require("express");
const server = express();

const PORT = process.env.PORT || 3000;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
  
});

app.message(async ({ message, say }) => {

  if (message.subtype) return;

  try {

    const response = await processMessage(message);

    await say(response);

  } catch (err) {

    console.error(err);

    await say("Something went wrong.");
  }
});

app.command("/about", async ({ command, ack, respond }) => {
  // Acknowledge the command immediately
  await ack();

  // Send a response
  await respond(
    "🤖 *StarDance Assistant*\n\n" +
    "I am a 24/7 Slack AI Agent built using Node.js, Slack Bolt, and Socket Mode.\n\n" +
    "Features:\n" +
    "• Conversational AI\n" +
    "• User memory\n" +
    "• Intelligent responses\n" +
    "• Available 24/7"
  );
});

app.command("/help", async ({ ack, respond }) => {
  await ack();

  await respond(
    "🤖 *StarDance Assistant Help*\n\n" +
    "Available Commands:\n" +
    "• `/about` - Learn about the assistant\n" +
    "• `/help` - Show available commands\n" +
    "• `/history` - View recent conversation history\n\n" +
    "You can also chat with me directly!"
  );
});

const { recall } = require("./memory");

app.command("/history", async ({ command, ack, respond }) => {
  await ack();

  const history = recall(command.user_id);

  if (history.length === 0) {
    await respond("No conversation history found.");
    return;
  }

  await respond(
    `📝 *Your recent messages:*\n\n${history.join("\n")}`
  );
});

(async () => {

  await app.start();

  console.log("🤖 AI Agent running");
})();

server.get("/", (req, res) => {
  res.send("🤖 StarDance Assistant is running successfully on Railway!");
});

server.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});