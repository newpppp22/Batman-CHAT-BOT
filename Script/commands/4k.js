const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "4k",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Parves Wayne",
    description: "Enhance photo to 4K quality",
    commandCategory: "Image Tools",
    usages: "reply to image or type 4k",
    cooldowns: 5
  },

  handleEvent: async ({ api, event }) => {
    const { body, messageReply, threadID, messageID } = event;

    if (!body) return;

    if (body.toLowerCase().includes("4k")) {
      if (!messageReply?.attachments?.length)
        return api.sendMessage("📸 একটা image reply দাও!", threadID, messageID);

      return processImage(api, event, messageReply);
    }
  },

  run: async ({ api, event }) => {
    const { messageReply } = event;

    if (!messageReply?.attachments?.length)
      return api.sendMessage("📸 Image reply করে 4K লিখো!", event.threadID, event.messageID);

    return processImage(api, event, messageReply);
  }
};

async function processImage(api, event, messageReply) {
  const { threadID, messageID } = event;

  try {
    const imgUrl = messageReply.attachments?.[0]?.url;
    if (!imgUrl)
      return api.sendMessage("❌ Valid image পাওয়া যায়নি!", threadID, messageID);

    const configUrl =
      "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

    const configRes = await axios.get(configUrl);
    const apiUrl = configRes.data?.["4k"];

    if (!apiUrl)
      return api.sendMessage("❌ 4K API পাওয়া যায়নি!", threadID, messageID);

    const loading = await api.sendMessage("⏳ 4K processing চলছে...", threadID);

    const enhanceUrl = `${apiUrl}?imageUrl=${encodeURIComponent(imgUrl)}`;
    const res = await axios.get(enhanceUrl);

    const resultImg = res.data?.result || res.data?.url || res.data?.image;

    if (!resultImg)
      throw new Error("No result from API");

    const tempPath = __dirname + `/cache/4k_${Date.now()}.jpg`;

    const buffer = (
      await axios.get(resultImg, { responseType: "arraybuffer" })
    ).data;

    fs.writeFileSync(tempPath, Buffer.from(buffer));

    api.sendMessage(
      {
        body: "✔️ 4K Enhance Complete!",
        attachment: fs.createReadStream(tempPath)
      },
      threadID,
      () => fs.unlinkSync(tempPath),
      messageID
    );

    api.unsendMessage(loading.messageID);
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "❌ Error: 4K enhance failed. API বা image সমস্যা হতে পারে!",
      event.threadID,
      event.messageID
    );
  }
}
