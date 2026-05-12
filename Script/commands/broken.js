module.exports.config = {
  name: "broken",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Parves Wayne",
  description: "Reply দিলে next advice দিবে",
  commandCategory: "fun",
  usages: "@mention",
  cooldowns: 5
};

const messages = [
  "বিপদ-আপদের সময়,, দুনিয়ার সকল দরজা বন্ধ হয়ে গেলেও আল্লাহ তায়ালার দরজার সবসময় খুলা থাকে। 🥰🥰",
  
  "দুনিয়াতে একটি মাত্র ঘর । যার নাম 'কাবা ঘর' । যার উপর দিয়ে আজ পর্যন্ত কোন পাখি বা বিমান উড়ে যেতে পারে নি। 😍",

  "তার জন্য কাঁদ যে তোমার চোখের জল দেখে সেও কেঁদে ফেলে। 🐰",

  "সবচেয়ে কঠিন কাজ হচ্ছে নিজেকে চেনা। 💔",

  "৫ ওয়াক্ত সালাত আদায় করুন। 🥰",

  "ইসলামিক ভিডিও দেখুন ওয়াজ শুনুন। ❤️",

  "যাহা তুমি দেখাও, তার চেয়ে বেশি তোমার থাকা উচিত 🤬",

  "যা তুমি জান, তার তুলনায় কম কথা বলা উচিত 🤟"
];

module.exports.run = async function({ api, event }) {

  const mention = Object.keys(event.mentions)[0];

  if (!mention)
    return api.sendMessage(
      "একজনকে mention দিন 😘",
      event.threadID
    );

  const name = event.mentions[mention];

  api.sendMessage(
    {
      body: `${messages[0]}\n\nReply "more" for next message.\n${name}`,
      mentions: [{
        id: mention,
        tag: name
      }]
    },
    event.threadID,
    (err, info) => {

      global.client.handleReply.push({
        name: module.exports.config.name,
        author: event.senderID,
        messageID: info.messageID,
        index: 1,
        mention,
        nameTag: name
      });

    }
  );
};

module.exports.handleReply = async function({ api, event, handleReply }) {

  if (event.senderID != handleReply.author) return;

  if (event.body.toLowerCase() != "more") return;

  if (handleReply.index >= messages.length)
    return api.sendMessage(
      "সব উপদেশ শেষ 😎",
      event.threadID
    );

  api.sendMessage(
    {
      body: `${messages[handleReply.index]}\n\nReply "more" for next.\n${handleReply.nameTag}`,
      mentions: [{
        id: handleReply.mention,
        tag: handleReply.nameTag
      }]
    },
    event.threadID,
    (err, info) => {

      global.client.handleReply.push({
        name: module.exports.config.name,
        author: event.senderID,
        messageID: info.messageID,
        index: handleReply.index + 1,
        mention: handleReply.mention,
        nameTag: handleReply.nameTag
      });

    },
    event.messageID
  );
};
