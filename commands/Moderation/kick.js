const{Client, Message, MeesageEmbed} = require("discord.js")

module.exports = {
  name: "kick",
  desicription: "let you kick a member",
  usage: "kick <@member> <reason>",
   run : async(client, message, args) => {
    
    if(!message.guild.me.hasPermisson("KİCK_MEMBERS")) return message.channel.send("i have no perms") 
    if(!message.member.hasPermisson("KİCK_MEMBERS")) return;
   
    const memeber = message.mentions.member.first();
    
    if(!member) return msg.reply("mention a user to kick")
    
    const reason = args.slice(1).join(" ")
    
    member.kick({reason})
    
    message.channel.send(`kicked ${member} from ${message.guild.name} reason: ${reason}`)
     
   }, 
 
};