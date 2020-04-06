exports.run = (client, message, args) => {
  let keywordList = "Current keywords:" + "\n";
  let exists = searchChannel(message.channel.id, client.save);
  if (!exists) {
    message.reply("Channel doesn't have any keywords!");
  } else {
    exists.keywords.forEach((keyword) => {
      keywordList += keyword + "\n";
    });
    message.reply(keywordList);
  }
};

function searchChannel(channelID, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].channelID === channelID) {
      return myArray[i];
    }
  }
}
