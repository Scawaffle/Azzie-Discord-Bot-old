const Discord = require("discord.js");
const Azzie = new Discord.Client();

Azzie.on("ready", async () => {
  await Azzie.user.setPresence({game: {name: "with your mom"}, status: "idle"});
  console.log("I am ready!");
});

Azzie.on('message', (message) => {
    if (message.content === 'roleid') {
        console.log(message.guild.roles);
    }

})

Azzie.login(NDE5OTAwMzgyNTUwOTQ5ODg5.DX5H1w.iQenl7xdI-eiyXv3kfReZYFafFQ);