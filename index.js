const express = require('express');
const app = express();

app.listen(() => console.log('Server started'));

app.use('/ping', (req, res) => {
  res.send(new Date());
});
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/website/index.html');
});
const { default_prefix } = require("./config.json");
const { owner_id } = require("./config.json");
const {prefix} = require("./config.json")
const {token} = require("./config.json")
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db = require("quick.db");
const {join} = require("path")
const moment = require("moment");
const { CanvasSenpai } = require("canvas-senpai")
const glob = require("glob")
const canvas = require("canvas")
const canavacord = require("canvacord")
const canva = new CanvasSenpai();
const discord = require("discord.js");
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");
const client = new discord.Client({
  disableEveryone: false
});
const yts = require('yt-search')

client.queue = new Map();
client.vote = new Map();
const { ready } = require("./handlers/ready.js")

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on("message", async message => {
  
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix is \`${default_prefix}\``);
  }// when someone mention your bot i will send thr default prefix

  if(message.author.bot) return;
     
  
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
 
});

//LEVEL

const { addexp } = require("./handlers/xp.js")

//LEVEL
client.on("message", async message => {
if(message.author.bot) return;
  if(!message.guild) return;
  
return addexp(message)
})

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 

const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: "./handlers/giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

client.on("message", async message => {
      let content = message.content;

    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 12 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
    const client = require('../index');
const { prefix } = require('../config.json')
const path =  require('path')(`default_prefix${message.guild.id}`)
  if(prefix === null) prefix =default_prefix;
  
  if(!message.content.startsWith(default_prefix)) return;
 
})
client.on("guildCreate", guild => {

  const { MessageEmbed } = require("discord.js");

  const ID = "788337767259570197";

  const channel = client.channels.cache.get(ID);

  const sowner = guild.owner.user;

  if (!channel) return;

  const embed = new MessageEmbed()

    .setTitle("**I Joined a Server!**")

    .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

    .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

    .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

    .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)
 
    .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)
  
    .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)
  
    .setTimestamp()

    .setColor("32CD32")

    .setFooter(`Servers Count - ${client.guilds.cache.size}`);

  channel.send(embed);

});


// Set the bot's online/idle/dnd/invisible status
client.on("ready", () => {
    console.log(`Iam Ready`);
console.log(`server : ${client.guilds.cache.size}`)
console.log(`channel : ${client.channels.cache.size}`)
console.log(`users : ${client.users.cache.size}`)
console.log(`${client.user.tag}`)
console.log(`bot id : ${client.user.id}`)
 const activities = [
 `${client.guilds.cache.size} Servers`,
 `${client.channels.cache.size} Channels`,
 `${client.users.cache.size} Users`,
 `${prefix}help`
 ];
 let i = 0;
 setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `PLAYING`}), 10000) //the status it will be changed every 10 secs
})

client.login(token) //put your token in config.json