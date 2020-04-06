exports.run = (client, message, args) => {
  if (args) {
    let keyword = args[0];
    let exists = searchChannel(message.channel.id, client.save);
    if (!exists) {
      message.reply("Channel doesn't have associated config!");
    } else {
      let pos = exists.keywords.indexOf(keyword);
      if (pos >= 0) {
        exists.keywords.splice(pos, 1);
        message.reply("Keyword removed!");
        client.saveFile();
      } else {
        message.reply("Keyword not found!");
      }
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
