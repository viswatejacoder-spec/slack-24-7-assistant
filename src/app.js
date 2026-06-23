require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.message(async ({ message, say }) => {
  if (message.subtype) return;

  const text = message.text.toLowerCase();

  if (text.includes("name")) {
    await say("My name is StarDance Assistant 🤖");
  } else if (text.includes("hello") || text.includes("hi")) {
    await say(`Hello <@${message.user}>! 👋`);
  } else if (text.includes("how are you")) {
    await say("I'm doing great! Thanks for asking 🚀");
  } else {
    await say("I received your message! 😊");
  }
});

(async () => {
  await app.start();
  console.log("⚡ Slack bot is running!");
})();