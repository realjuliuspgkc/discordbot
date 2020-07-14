const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '!';
const math = require('mathjs');
const r = "RANDOM";
bot.on('ready', () => {
    console.log(`${bot.user.tag} successfully logged in!`)
    bot.user.setActivity('over the servers', ({type: "WATCHING"}))
})
 
bot.on('message', message => {
    let msg = message;
    let args = msg.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    let cmd = command;
 
    if (command === 'help') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Commands')
        .addField('General', `${prefix}help - Shows this message.\n${prefix}random - Shows a random number from <Args> to <args 2>. \n${prefix}botstatus - Shows the bot status. \n${prefix}bothelp - For when you need help with the bot. \n${prefix}say - Copies what you say. \n${prefix}smack - Smacks someone around the world we may not know this person. \n${prefix}hug - no one \n${prefix}purge/clear - Cleares messages up to 100 words. \n${prefix}kick - Kicks mentioned person. \n${prefix}ticket - Makes a ticket. Currently being worked on. \n${prefix}stop-get-help - gives you help. \n${prefix}prefix - The bot prefix ${prefix}`)
        .setColor(0xff0000);
        msg.channel.send(embed);
    }
    if (command === 'random') {
        if(!args[0]) return msg.reply("You didn't specify args 1")
        if(!args[1]) return msg.reply("You didn't specify args 2")
        msg.channel.send("Your random number is: " + Math.floor(Math.random() * args[1] + args[0]));
    }
    if (command === 'bothelp') {
        msg.channel.send('The developer will be here shortly.');
    } 
    if (command === 'botstatus'){
        msg.channel.send('Bot is currently up. yay!');
    }
    if (command === 'say') {
        if (!args[0]) return message.reply("You didn't provide any arguments.")
        msg.channel.send(args);
    }
    if (command === 'smack'){
        msg.channel.send('You smacked someone in this world.');
    }
    if (command === 'hug'){
        msg.channel.send('You hugged AviaBays :D');
    }
    if (command === 'announce') {
        if (message.member.hasPermission("MANAGE_MESSAGES")) return;
        if (args.lenght) return message.reply("You didn't provide args")
        let a = message.guild.channels.cache.find(channel => channel.name === "general")
        a.send(args)
    }
    if (cmd === 'clear' || cmd == 'purge'){
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You can't use this command!");
        if(!args[0]) return msg.channel.send("Specify how many messages you want to delete.");
        msg.delete();
        msg.channel.bulkDelete(args[0]).catch(e => { msg.channel.send("You can only delete 100 messages at once.")});
        msg.channel.send(`Successfully deleted\ ${args[0]} messages\ `).then(m => m.delete({timeout: 5000}));    
    }
    if(cmd === 'kick'){
        if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send("You don't have permission to kick members.");
        let toKick = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return msg.channel.send('Please mention someone to kick');
        if(!toKick) return msg.channel.send(`${args[0]} is not a member.`);
        if(!reason) return msg.channel.send('Specify a reason.');
 
        if(!toKick.kickable){
            return msg.channel.send(':x: I cannot kick someone that is mod/admin. :x:');
        }
 
        if(toKick.kickable){
            let x = new Discord.MessageEmbed()
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', msg.author)
            .addField('Reason', reason)
            .addField('Date', msg.createdAt)
            .setColor(r);
 
            msg.channel.send(x);
            toKick.kick();
        }
    }
    if (cmd === 'ticket') {
        msg.channel.send("This command is currently being worked on.");
    }
    if (cmd === 'stop-get-help'){
        msg.channel.send("SIR/MA'AM YOU NEED HELP!");
    }
})
bot.login(token);