const Discord = require("discord.js");
const pre = require("../mongodb/prefix");
const mongoose = require("mongoose");
const config = require('../config.json')

module.exports.run = async(client, message, args) => {
  let prefix = args.join(" ");
      const noperms = new Discord.MessageEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: ${message.author.tag} você precisa especificar um prefixo.`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.quote("Você precisa ser um `ADMINISTRADOR`` para usar este comando");
        let newprefix = args.join(" ");
        if(!args[0]) return message.quote(`:x: ${message.author} você precisa especificar um prefixo.`);
      pre.findOne({name: "prefix", preid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            name: "prefix",
            preid: message.guild.id,
            prefix: prefix
          })
          if(args[0].length > 5) {
            return message.reply('seu prefixo é muito longo, tente de novo com um de até 5 caracteres')
            }
        let send = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} | Prefixo`)
        .setDescription(`Prefixo trocado para **${newprefix}**`)
        .setTimestamp()
        .setColor(config.color)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, client.user.avatarURL)
        message.quote(send);
        if(!result || result == []) {
          duck.save().catch(console.error);
        }else{
          pre.deleteOne({name: "prefix", preid: message.guild.id}).catch(console.error)
          duck.save().catch(console.error)
        }
      })
}

exports.help = {
    name: 'prefixo',
    aliases: ['sprefix', 'setprefix', 'prefix'],
    status: 'on'
}