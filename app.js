const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const keywordsJSON = './keywords.json';
const fs = require("fs");
var save = [];

fs.readFile(keywordsJSON, function(err, data) {
  save = JSON.parse(data);
  client.save = save;
});
client.saveFile = () => {fs.writeFile(keywordsJSON, JSON.stringify(client.save), () => {});};

client.on("ready", () => {
  console.log(`ready!`);
});

client.on('message', (message) => {
  if (message.guild) {
    if (message.member.id != client.user.id) {
      if (!message.content.toLowerCase().startsWith(config.prefix)) {
        let found = false;
        let embedText = "";
        let channel = searchChannelID(message.channel.id, save);
        if (channel) {
          if (message.embeds) {
            message.embeds.forEach((embed) => {
              if (embed.description) {
                embedText += embed.description;
              }
              if (embed.fields) {
                embed.fields.forEach((field) => {
                  embedText += field.value;
                });
              }
            });
          }
          channel.keywords.forEach((keyword) => {
            let search = message.content.toLowerCase().search(keyword);
            if (embedText) {
              let search = embedText.toLowerCase().search(keyword);
              toLowerCase().search(keyword);
              if (search >= 0) {
                found = keyword;
              }
            }
            if (search >= 0) {
              found = keyword;
            }
          });
        }
        if (found) {
          message.channel.send(`@everyone Keyword: "${found}" matched`);
        }
      } else {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        fs.exists(`./commands/${command}.js`, (exists) => {
          if (exists) {
            let fetchCommand = require(`./commands/${command}.js`);
            fetchCommand.run(client, message, args);
          }
        });
      }
    }
  }
});

client.login(config.token);

function searchChannelID(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}

function embedToPlainText() {}
