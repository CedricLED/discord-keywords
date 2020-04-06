exports.run = (client, message, args) => {
  if (args) {
    let keyword = args[0];
    let exists = searchChannel(message.channel.id, client.save);
    if (!exists) {
      client.save.push({
        channelID: message.channel.id,
        keywords: [keyword]
      });
      message.reply("Keyword added!");
      client.saveFile();
    } else {
      exists.keywords.push(keyword);
      message.reply("Keyword added!");
      client.saveFile();
    }
  }
};

function searchChannel(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}
