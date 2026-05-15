module.exports.config = {
  name: "pw",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Parves",
  description: "Owner only mode",
  commandCategory: "system",
  usages: "on/off",
  cooldowns: 0
};

const fs = require("fs");
const path = __dirname + "/cache/pw.json";

module.exports.run = async ({ api, event, args }) => {

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ on: false }));
  }

  const data = JSON.parse(fs.readFileSync(path));

  if (args[0] == "on") {
    data.on = true;
    fs.writeFileSync(path, JSON.stringify(data));
    return api.sendMessage("✅ PW ON", event.threadID);
  }

  if (args[0] == "off") {
    data.on = false;
    fs.writeFileSync(path, JSON.stringify(data));
    return api.sendMessage("❌ PW OFF", event.threadID);
  }

  return api.sendMessage("Use: pw on/off", event.threadID);
};

module.exports.handleEvent = async ({ event }) => {

  if (!fs.existsSync(path)) return;

  const data = JSON.parse(fs.readFileSync(path));

  if (!data.on) return;

  const owner = "YOUR_UID";

  if (event.senderID !== owner) {
    return;
  }

};
