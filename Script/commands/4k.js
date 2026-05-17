const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "4k",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Parves Wayne",
    description: "Enhance image to 4K",
    commandCategory: "image",
    usages: "reply image with 4k",
    cooldowns: 5,
    usePrefix: true
  },

  handleEvent: async function ({ api, event }) {
    const { body, messageReply } = event;

    if (!body) return;

    // শুধু exact 4k হলে run করবে
    if (body.trim().toLowerCase() !== "4k") return;

    if (!messageReply || !messageReply.attachments?.length) {
      return api.sendMessage(
        "📸 একটা image reply দাও!",
        event.threadID,
        event.messageID
      );
    }

    return processImage(api, event, messageReply);
  },

  run: async function ({ api, event }) {
    const { messageReply } = event;

    if (!messageReply || !messageReply.attachments?.length) {
      return api.sendMessage(
        "📸 Image reply করে 4k লিখো!",
        event.threadID,
        event.messageID
      );
    }

    return processImage(api, event, messageReply);
  }
};

async function processImage(api, event, messageReply) {
  const { threadID, messageID } = event;

  try {
    const attachment = messageReply.attachments[0];

    if (attachment.type !== "photo") {
      return api.sendMessage(
        "❌ শুধু image reply দাও!",
        threadID,
        messageID
      );
    }

    const imgUrl = attachment.url;

    // Loading message
    api.sendMessage("⏳ 4K processing চলছে...", threadID, async (err, info) => {
      try {
        const loadingMsg = info.messageID;

        // API config
        const configUrl =
          "https://raw.githubusercontent.com/shahadat-sahu/SAHU-API/refs/heads/main/SAHU-API.json";

        const configRes = await axios.get(configUrl);

        const apiUrl = configRes.data["4k"];

        if (!apiUrl) {
          return api.sendMessage(
            "❌ 4K API পাওয়া যায়নি!",
            threadID,
            messageID
          );
        }

        // API request
        const enhanceUrl = `${apiUrl}?imageUrl=${encodeURIComponent(imgUrl)}`;

        const res = await axios.get(enhanceUrl);

        const resultImg =
          res.data.result ||
          res.data.url ||
          res.data.image;

        if (!resultImg) {
          throw new Error("No enhanced image returned");
        }

        // Temp file
        const filePath = path.join(
          __dirname,
          "cache",
          `4k_${Date.now()}.jpg`
        );

        const imgData = await axios.get(resultImg, {
          responseType: "arraybuffer"
        });

        fs.writeFileSync(filePath, Buffer.from(imgData.data));

        // Send result
        api.sendMessage(
          {
            body: "✔️ 4K Enhance Complete!",
            attachment: fs.createReadStream(filePath)
          },
          threadID,
          () => {
            fs.unlinkSync(filePath);
          },
          messageID
        );

        // Remove loading msg
        api.unsendMessage(loadingMsg);

      } catch (e) {
        console.error(e);

        api.sendMessage(
          "❌ 4K enhance failed!\nAPI বা image problem হতে পারে.",
          threadID,
          messageID
        );
      }
    });

  } catch (err) {
    console.error(err);

    api.sendMessage(
      "❌ Unexpected error occured!",
      threadID,
      messageID
    );
  }
}
