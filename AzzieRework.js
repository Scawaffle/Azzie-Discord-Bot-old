const Discord = require("discord.js");
const Azzie = new Discord.Client();

const config = require("./config.json")

Azzie.on("ready", () =>{
    console.log("I'm ready!");
});

var bannedwords = "fuck,shit,slut,whore".split(",");

Azzie.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix))

    for (i=0;i<bannedwords.length;i++) {
        if (msg.content.toLowerCase().includes(bannedwords[i])) {
          msg.delete();
          msg.reply("Please don't swear or say any bad word, except on nsfw channel!");
          msg.reply("Thank you for undesrtanding.");
          return;
        }
      }

    if(!message.content.hasPermission("ADMINISTRARTOR")) return;
    message.delete();
    if (message.content.toLowerCase().startsWith("kick")) {
        var mem = message.mentions.members.first();
        mem.kick().then(() => {
            message.channel.send(mem.displayName + "has successfully been kicked by" + message.author.username + "!");
        }).catch(error => {
            message.channel.send("Somethings Went Wrong.. :(");
        });
    }
    if (msg.content.toLowerCase().startsWith("ban")) {
        var mem = msg.mentions.members.first();
        var mc = msg.content.split(" ")[2];
        mem.ban(mc).then(() => {
          msg.channel.send(mem.displayName + " has successfully been banned by " + msg.author.username + " for " + mc + " days!");
        }).catch(e => {
          msg.channel.send("An error occured!");
        });
      }
      if (msg.content.toLowerCase().startsWith("mute")) {
        var mem = msg.mentions.members.first();
        if (msg.guild.roles.find("name", "Muted")) {
          mem.addRole(msg.guild.roles.find("name", "Muted")).then(() => {
            msg.channel.send(mem.displayName + " has successfully been muted!");
          }).catch(e => {
            msg.channel.send("An error occured!");
            console.log(e);
          });
    
        }
      }
      if (msg.content.toLowerCase().startsWith("unmute")) {
        var mem = msg.mentions.members.first();
        if (msg.guild.roles.find("name", "Muted")) {
          mem.removeRole(msg.guild.roles.find("name", "Muted")).then(() => {
            msg.channel.send(mem.displayName + " has successfully been unmuted!");
          }).catch(e => {
            msg.channel.send("An error occured!");
            console.log(e);
          });
    
        }
      }
      if (msg.content.toLowerCase().startsWith("purge")) {
        var mc = msg.content.split(" ")[1];
        msg.channel.bulkDelete(mc);
      }
      if (msg.content.toLowerCase().startsWith("eval")) {
        var sc = msg.content.substring(msg.content.indexOf(" "));
        eval(sc);
      }
      if (msg.content.toLowerCase().startsWith("calc")) {
        var ca = msg.content.substring(msg.content.indexOf(" "));
        msg.reply(ca + " is " + eval(ca).toFixed(2));
      }
    });


Azzie.on("message", message => {
    if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);

  if (command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
  }

  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }

  if (command === "ping") {
    message.channel.sendMessage("ping");
  }else

  if (command === "honk") {
    message.channel.sendMessage("Quack!")
  }
  
});
Azzie.login(config.token);