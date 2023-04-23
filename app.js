const Discord = require("discord.js");
const Azzie = new Discord.Client();

const prefix = require("./config.json");
const config = require("./config.json");
const ytdl = require('ytdl-core');

Azzie.on("ready", async () => {
  await Azzie.user.setPresence({game: {name: "~help | preparing for final assigment!"}, status: "online"});
  console.log("I am ready!");
});

var bannedwords = "fuck,FUCK,shit,SHIT,slut,SLUT,whore,WHORE,dick,DICK".split(",");

Azzie.on("message", (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);

  let Owner = (Azzie.user.id == "353904243138101248");

  if (command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
  }

  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  }

  if (command === "ping") {
    message.channel.send('Pong! (~ ' + Azzie.ping + 'ms)');
  }else

  if (command === "honk") {
    message.channel.sendMessage("Quack!");
  }
  
  if (command === "uptime") {
    
    let days = Math.floor(Azzie.uptime / 86400000);
    let hours = Math.floor(Azzie.uptime / 3600000) % 24;
    let minutes = Math.floor(Azzie.uptime / 60000) % 60;
    let seconds = Math.floor(Azzie.uptime / 1000) % 60;

    message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
  }

  if (command === "restart") {
    if (message.author = Owner) 
      message.channel.sendMessage("Restarting..")
        Azzie.destroy().then(() =>{
          Azzie.login(config.token);
    })
  }

  if (command === "shutdown") {
    if (message.author = Owner) 
      message.channel.sendMessage("Goodbye!")
        Azzie.destroy()
  }
});

Azzie.on("message", msg => {
  if (msg.guild === null) return;
  
  for (i=0;i<bannedwords.length;i++) {
    if (msg.content.includes(bannedwords[i])) {
      msg.reply("Please don't say any badword!");
      return;
    }
  }

  if (msg.author.bot) return;
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (msg.content.startsWith(config.prefix + "kick")) {
    var mem = msg.mentions.members.first();
    mem.kick().then(() => {
      msg.channel.send(mem.displayName + " has successfully been kicked by " + msg.author.username + "!");
    }).catch(() => {
      msg.channel.send("Something happened.. :(");
    });
  }
  if (msg.content.startsWith(config.prefix + "ban")) {
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    mem.ban(mc).then(() => {
      msg.channel.send(mem.displayName + " has successfully been banned by " + msg.author.username + " for " + mc + " days!");
    }).catch(() => {
      msg.channel.send("Something happened.. :(");
    });
  }
  if (msg.content.startsWith(config.prefix + "mute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Muted")) {
      mem.addRole(msg.guild.roles.find("name", "Muted")).then(() => {
        msg.channel.send(mem.displayName + " has successfully been muted!");
      }).catch(e => {
        msg.channel.send("Something happened.. :(");
        console.log(e);
      });

    }
  }
  if (msg.content.startsWith(config.prefix + "unmute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Muted")) {
      mem.removeRole(msg.guild.roles.find("name", "Muted")).then(() => {
        msg.channel.send(mem.displayName + " has successfully been unmuted!");
      }).catch(e => {
        msg.channel.send("Something happened.. :(");
        console.log(e);
      });

    }
  }
  if (msg.content.startsWith(config.prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc)
    }
  if (msg.content.startsWith(config.prefix + "eval")) {
    var sc = msg.content.substring(msg.content.indexOf(" "));
    eval(sc);
  }
  if (msg.content.startsWith(config.prefix + "calc")) {
    var ca = msg.content.substring(msg.content.indexOf(" "));
    msg.reply(ca + " is " + eval(ca).toFixed(2));
  }
});

Azzie.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} else {
		message.channel.send('You need to enter a valid command!')
	}
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
Azzie.login(config.token);