module.exports.config = {
  name: "spam",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "SHAHADAT SAHU",
  description: "Spam messages",
  commandCategory: "spam",
  usages: "[message] [amount]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {

  if (args.length < 2) {
    return api.sendMessage(
      "Usage: spam [message] [amount]",
      event.threadID,
      event.messageID
    );
  }

  const count = parseInt(args[args.length - 1]);

  if (isNaN(count)) {
    return api.sendMessage(
      "Last value must be a number!",
      event.threadID,
      event.messageID
    );
  }

  const msg = args.slice(0, args.length - 1).join(" ");

  for (let i = 0; i < count; i++) {
    api.sendMessage(msg, event.threadID);
  }
};
