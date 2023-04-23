const Discord = require("discord.js");
const Azzie = new Discord.Client();

Azzie.on("ready", () => {
  console.log("I am ready!");
});

const prefix = "==";

Azzie.on("message", (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.lenghth);

  let args = message.content.split(" ").slice(1);

  if (command === "say") {
    message.chanel.send(args.join(" "));
  }

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("ping");
  }
});

Azzie.login("NDE5OTAwMzgyNTUwOTQ5ODg5.DX5H1w.iQenl7xdI-eiyXv3kfReZYFafFQ");