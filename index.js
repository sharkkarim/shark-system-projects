
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "";
const moment = require('moment')
const fs = require("fs")
const db = require('quick.db')





 client.on('message', msg => {
  if (msg.content.startsWith(prefix + "help")) {
  var embed1 = new Discord.MessageEmbed()
  
  .setTitle(`**\`${client.user.username}\` Commands**`)
  
  .setDescription(`**
  General Commands
        
  \`${prefix}avatar\` , \`${prefix}user\` , \`${prefix}savatar\` , \`${prefix}server\` , \`${prefix}roles\`  , \`${prefix}emojis\` , \`${prefix}ping\` , \`${prefix}id\`

        
  Admin Commands 
    
    \`${prefix}ban\` , \`${prefix}kick\` , \`${prefix}lock\` , \`${prefix}unlock\` , \`${prefix}hide\` , \`${prefix}show\` , \`${prefix}warn\` , \`${prefix}warns\` , \`${prefix}slow\` , \`${prefix}mute\` 
     \`${prefix}unmute\` , \`${prefix}vote\` , \`${prefix}role\` , \`${prefix}blist\`
  
  
     
     [Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=268855550)
     [Support](رابط سيرفر السبورت)**`)
  
  
  .setFooter(`Require by ${msg.author.username}`)
  
  msg.channel.send(embed1)
  
  }
  });
  

  client.on('message', message => {
  
  
  
    if(message.content.startsWith(prefix + 'avatar')) {
  
    
    var user = message.mentions.users.first()|| client.users.cache.get(message.content.split(' ')[1]) || message.author;
     
  
      var embed = new Discord.MessageEmbed()
      .setAuthor(user.username,user.avatarURL())
      
  .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
  .setImage(user.avatarURL({dynamic : true}))
  
  
  message.channel.send(embed)
    }
  });
  
  
  client.on('message', message => {
  
  
  
    if(message.content.startsWith(prefix + 'savatar')) {
  
    
      var embed = new Discord.MessageEmbed()
      
  .setDescription(`**[Avatar Link](${message.guild.iconURL()})**`)
  .setImage(message.guild.iconURL({dynamic : true, size : 1024}))
  
  
  message.channel.send(embed)
    }
  });
  
  
  client.on('message', message =>{
  if (message.content.startsWith(prefix + "user")) {
    var user = message.mentions.users.first() || message.author; 
    var embed = new Discord.MessageEmbed()
    .setTitle(`**User Info**`)
    
    .setDescription(`**
    User Name : ${user.username}
    
    User ID : ${user.id}
  
    Join Server : \`${moment(user.joinedAt).format('YYYY/M/D')}\` 
  
    Join Discord : \`${moment(user.createdTimestamp).format('YYYY/M/D')}\` 
    
    
    **`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

  
    message.channel.send(embed)
  
  
  
  }
  });
  
  client.on('message', message =>{
  if (message.content.startsWith(prefix + "server")){
  
    const text = message.guild.channels.cache.filter(r => r.type === "text").size
    const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
    const chs = message.guild.channels.cache.size
    const roles = message.guild.roles.cache.size
  
    var embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name , message.guild.iconURL({dynamic : true}))
     .setDescription(`**        
      :id: Server ID : ${message.guild.id}
  
      :calendar: Create At : ${message.guild.createdAt.toLocaleString()} 
  
       :crown:  Owner : ${message.guild.owner}
  
      :sparkles:  Boost : ${message.guild.premiumSubscriptionCount}
  
      :closed_lock_with_key: Roles :  ${roles}  
  
        :speech_balloon: Channels : ${chs} 
        ${text} Text | ${voice} Voice
                                               
     **`)
  .setFooter(`Requested By ${message.author.username}`)
  
  message.channel.send(embed)
  }
  });
  
  client.on('message', message => {
    if (message.content === prefix + 'lock') {
      if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
      let everyone = message.guild.roles.cache.find(
        message => message.name === '@everyone'
      );
      message.channel
        .createOverwrite(everyone, {
          SEND_MESSAGES: false
        })
        .then(() => {
          message.channel.send(`** تـم قفـل الـروم 🔒**`);
        });
    }
  });
  
  client.on('message', message => {
    if (message.content === prefix + 'unlock') {
      if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
      let everyone = message.guild.roles.cache.find(
        message => message.name === '@everyone'
      );
      message.channel
        .createOverwrite(everyone, {
          SEND_MESSAGES: true
        })
        .then(() => {
          message.channel.send(`** تـم فتـح الـروم 🔓**`);
        });
    }
  });
  
  
  client.on('message', message => {
    if (message.content === prefix + 'hide') {
      if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
      let everyone = message.guild.roles.cache.find(
        message => message.name === '@everyone'
      );
      message.channel
        .createOverwrite(everyone, {
          VIEW_CHANNEL: false
        })
        .then(() => {
          message.channel.send(`** تـم اخفاء الـروم 🔒**`);
        });
    }
  });
  
  client.on('message', message => {
    if (message.content === prefix + 'show') {
      if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
      let everyone = message.guild.roles.cache.find(
        message => message.name === '@everyone'
      );
      message.channel
        .createOverwrite(everyone, {
          VIEW_CHANNEL: true
        })
        .then(() => {
          message.channel.send(`** تـم اظهار الـروم 🔓**`);
        });
    }
  });
  
  
  //ban
  client.on('message', message => {
  
  
  
    if(message.content.includes(prefix + 'ban')) {
    
      if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I Dont Have Premission BAN_MEMBERS ')
  
              if(!message.member.hasPermission('BAN_MEMBERS'))return message.reply('You Dont Have Premission BAN_MEMBERS ')
  
  
      var  reason = message.content.split(" ").slice(2).join(" ")
  
  var user = message.mentions.users.first()
  
          if(!user) return message.channel.send("**Mention A Member **")
          if(!reason) return message.channel.send("**Write A Reason For Ban**")
    if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);

          message.guild.member(user).ban()
            message.channel.send(`**✅ ${user} Banned From Server **`)
             
            }
          });
  
  
  
  client.on('message', message => {
  
  
  
    if(message.content.includes(prefix + 'kick')) {  
  
  
      if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I Dont Have Premission KICK_MEMBERS ')
  
              if(!message.member.hasPermission('KICK_MEMBERS'))return message.reply('You Dont Have Premission KICK_MEMBERS ')
  
  
      var  reason = message.content.split(" ").slice(2).join(" ")
  
  var user = message.mentions.users.first()
  
          if(!user) return message.channel.send("**Mention A Member **")
          if(!reason) return message.channel.send("**Write A Reason For Kick**")
            if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);

  
          message.guild.member(user).kick()
            message.channel.send(`**✅ ${user} Kiked From Server **`)
             
            }
          });
  


  client.on('message', msg =>{
   if (msg.content.startsWith(prefix + "roles")){
    var roles = msg.guild.roles.cache
    .map(r => ` ${r.name} [${r.members.array().length}] Members`)
    .join("\n");
     var embed = new Discord.MessageEmbed()
     .setTitle(`**Server Roles**`)
      .setDescription(`**\`\`\` ${roles} \`\`\`\ **`)
      msg.channel.send(embed)
    
   
  }
  });
  

  
    client.on('message', message =>{
   if (message.content.startsWith(prefix + "blist")){
  
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`**You Dont Have \`BAN_MEMBERS\` Premission**`)
     
    message.guild.fetchBans().then(messages => {
    var embed = new Discord.MessageEmbed()
  
     .setDescription(`**${message.guild.name} Has \`${messages.size}\` Bans**`)
     .setTimestamp()
     message.channel.send(embed)   
  
    })
  }
  });
  
const ms = require('ms')

client.on('message', message => {
if(message.content.startsWith(prefix + "mute")){
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply(`**You Dont Have \`MUTE_MEMBERS\` Premission**`)

var user = message.mentions.members.first();
if(!user) return message.channel.send(`**Mention A User**`)
if(user.id === message.author.id) return message.channel.send("You Cant Mute YourSelf :x:")
var args = message.content.split(" ").slice(2).join(" ")
if(!args) return message.channel.send(`**Type The Time**`)
var muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) return message.channel.send(`**Create A \`Muted\` Role **`)
  if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);

message.channel.send(`**${user} Has Muted To ${args}**`)
user.roles.add(muterole)
setTimeout(() => {
user.roles.remove(muterole)
    }, ms(args))
  }
})

  
  
  client.on('message', message => {
  if (message.content.startsWith(prefix + "unmute")) {

  
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply(`**You Dont Have \`MUTE_MEMBERS\` Premission**`)
    var user = message.mentions.members.first()
     var m = message.guild.roles.cache.find(r => r.name === `Muted`)
  
    if(!user) return message.channel.send(`**Mention A User**`)
    if(!m) return message.channel.send(`**Create A \`Muted\` Role**`)

      if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);

   user.roles.remove(m.id)
    message.channel.send(`**${user} Has UnMuted **`) 
  }
  });
  
    client.on('message', message =>{
  if (message.content.startsWith(prefix + "ping")) {
  
    var start = Date.now()
  
    message.channel.send(`**Pong!**`) .then(message => {
     message.edit(`**Time Taken \n \`${Date.now() - start}\`ms**`)
    
    })
    }
    });

  
  
  
    client.on('message', message => {
     if (message.content.startsWith(prefix + "role")) {
  
      var user = message.mentions.members.first() || client.users.cache.get(message.content.split(' ')[1])
      var role = message.mentions.roles.first()
      var r = message.guild.roles.cache.find(r => r.name === `${role}`)
      var time  = message.content.split(" ").slice(3).join(" ")
     
      if (!user) return message.channel.send(`**Mention A User**`)
      if (!role) return message.channel.send(`**Mention A Role**`)
      if (!time) return message.channel.sene(`**Type The Time **`)
  if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);

      var embed = new Discord.MessageEmbed()
      .setDescription(`**Succesfully Added ${role} To ${user}**`)
      message.channel.send(embed)
        user.roles.add(role.id)

        setTimeout(() => {
user.roles.remove(role)

        }, ms(time))
  
    
    
    }
    });
  
  
  client.on("message", message => {
  
  
  
    if (message.content.toLowerCase() === prefix + "emojis") {
  
  
      let emojis = message.guild.emojis.cache.map(e => ` ${e}`).join("\n");
      let embed = new Discord.MessageEmbed()
        .setTitle("**Server Emojis**")
        .setDescription(emojis);
      message.channel.send(embed);
    }
  });
  
  
  

  
  client.on('message', message =>{
  
    if(message.content.startsWith(prefix + "slow")){
     
       if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**You Dont Have \`MANAGER_CHANNELS\` Premission**`)
    
        var args =  message.content.split(" ").slice(1).join(" ");
        if(!args) return message.channel.send(`**Write A Number**`)
        
        message.channel.setRateLimitPerUser(args)
        
         var embed = new Discord.MessageEmbed()
  
        .setDescription(`**Done , Set Slow Mode To \`${args}\`**`)
        .setTimestamp()
  
      
        message.channel.send(embed)
  
  
    }
  });
  



  client.on('message' , message => {
  if(message.content.startsWith(prefix + 'warn')){
    if(!message.member.hasPermission('ADMINSTARTOR')) return message.channel.send(`**حرك ولك**`)

  var user = message.mentions.members.first();
 var reason = message.content.split(' ').slice(2).join(" ");

if(!user) return message.channel.send(`**Mention A User**`);
if(!reason) return message.channel.send(`**Type A Reason**`);
  if(message.guild.member(user).roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID !== message.author.id) return message.channel.send(` **You can't give Roles higher than your role**`);


message.channel.send(`**Done , ${user} Has Been Warned**`).then(() => {

db.set(`userwarn_${message.guild.id}_${user.id}` , 1)
db.set(`reason_${message.guild.id}_${user.id}`, reason)

user.send(`**YOU Have Been Warned !! Reason : ${reason}**`)


})
  }
})

client.on('message' , message => {
  if(message.content.startsWith(prefix + 'warnings')){
 
    var user = message.mentions.members.first() 
    var author = message.author;
    if(!user) user = author

  var res = db.get(`userwarn_${message.guild.id}_${user.id}`)
  // var rr = await db.fetchAll(`reason_${message.guild.id}_${user.id}`, ress)

if(res === null) res = 0
 
message.channel.send(`**${user} Have ${res} Warnings**`)

  }
})

client.on('message' , message => {
  if(message.content.startsWith(prefix + 'remove-warns')){
    var user = message.mentions.members.first()
    if(!user) return message.channel.send(`**Mention A User**`)
    db.delete(`userwarn_${message.guild.id}_${user.id}`)
    message.channel.send(`**${user} Warns Has Been Deleted **`)
  }
})
  

client.login("");
