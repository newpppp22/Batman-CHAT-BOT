module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Parves Wayne",
  description: "Display the bot's prefix and owner info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`🌟━━━━━━━━━━━━━━━━━🌟
　　　『 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 』
🌟━━━━━━━━━━━━━━━━━🌟
『 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗼𝘁 𝗽𝗿𝗲𝗳𝗶𝘅 : [ ${prefix} ]
➤ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : 𑣲⋆ 𝐘𝐮𝐦𝐞𝐤𝐨 𝐁𝐛𝐳 𐙚
➤ 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻 : 愛 𝐏𝐚𝐫𝐯𝐞𝐬 𝐖𝐚𝐲𝐧𝐞 𒌐

『 𝐁𝐎𝐗 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗼𝘅 𝗣𝗿𝗲𝗳𝗶𝘅 : ${prefix}
➤ 𝗕𝗼𝘅 𝗡𝗮𝗺𝗲   : ${groupName}
➤ 𝗕𝗼𝘅 𝗧𝗜𝗗     : ${threadID}

『 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 』

➤ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 : 愛 𝐏𝐚𝐫𝐯𝐞𝐬 𝐖𝐚𝐲𝐧𝐞 𒌐
➤ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸    : www.facebook.com/100080580662648
➤ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺    : instagram.com/honestly_parves
➤ 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽    : https://wa.me/+8801821721353

🌟━━━━━━━━━━━━━━━━━🌟
　　　　𝗧𝗵𝗮𝗻𝗸 𝗬𝗼𝘂 𝗙𝗼𝗿 𝗨𝘀𝗶𝗻𝗴!
🌟━━━━━━━━━━━━━━━━━🌟`,
      threadID,
      null
    );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or similar to get the bot info.", event.threadID);
};
