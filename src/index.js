const { Intents, Client } = require("discord.js");
const { appendPoints, getPoints } = require("./db");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Logged in. ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.id !== client.user.id) {
    if (msg.content === "credits?") {
      const points = await getPoints(msg.author.id);
      msg.channel.send(`:oncoming_police_car: You have **${points}** points.`);
      console.log("Credits?");
    } else {
      const points = await getPoints(msg.author.id);
      console.log(points);
      if (points < 0) {
        msg.channel.send(
          `:octagonal_sign: <@${msg.author.id}> is top wanted! THE COMMUNIST POLICE IS LOOKING FOR YOU!!! @here`
        );
      }
      if (
        magicWords.some((w) =>
          msg.content.toLowerCase().includes(w.toLowerCase())
        )
      ) {
        appendPoints(msg.author.id, 5);
        msg.channel.send(
          `:white_check_mark: +5 points because of your sweet words!`
        );
      } else if (
        bannedWords.some((w) =>
          msg.content.toLowerCase().includes(w.toLowerCase())
        )
      ) {
        appendPoints(msg.author.id, -5);
        msg.channel.send(
          `:heavy_minus_sign: -5 points because of your naughty words!`
        );
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
