const{Client, Message, MeesageEmbed} = require("discord.js")

module.exports = {
  name: "ban",
  desicription: "let you ban a member",
  usage: "ban <@member> <reason>",
   run : async(client, message, args) => {
    
    if(!message.guild.me.hasPermisson("BAN_MEMBERS")) return message.channel.send("i have no perms") 
    if(!message.member.hasPermisson("BAN_MEMBERS")) return;
   
    const memeber = message.mentions.member.first();
    
    if(!member) return msg.reply("mention a user to ban")
    
    const reason = args.slice(1).join(" ")
    
    member.kick({reason})
    
    message.channel.send(`banned ${member} from ${message.guild.name} reason: ${reason}`)
     
   }, 
 
};