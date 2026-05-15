const { writeFileSync, existsSync } = require("fs-extra");
const { resolve } = require("path");

module.exports.config = {
  name: "0admin",
  version: "3.1.0",
  hasPermssion: 2,
  credits: "Parves Wayne (Fixed Version)",
  description: "Advanced Admin System (Clean Fix)",
  commandCategory: "Admin",
  usages: "[list/add/remove/adon/adoff]",
  cooldowns: 0
};

module.exports.languages = {
  en: {
    listAdmin: "👑 ADMIN LIST 👑\n\n%1",
    noPermission: "❎ You don't have permission to use \"%1\"",
    addedAdmin: "✅ Added %1 admin(s):\n\n%2",
    removedAdmin: "✅ Removed %1 admin(s):\n\n%2",
    adminOn: "🔒 Admin Only Mode Enabled",
    adminOff: "🔓 Admin Only Mode Disabled"
  }
};

/* ---------- INIT FILE ---------- */
module.exports.onLoad = () => {
  const path = resolve(__dirname, "cache", "data.json");

  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({ adminbox: {} }, null, 4));
  }
};

/* ---------- HANDLE EVENT (FIXED) ---------- */
module.exports.handleEvent = async function ({ api, event }) {
  try {
    const configPath = global.client.configPath;
    delete require.cache[require.resolve(configPath)];
    const config = require(configPath);

    if (config.adminOnly === true) {

  const owner = "100080580662648";

  if (String(event.senderID) !== String(owner)) {
    return;
  }

    }
  } catch (e) {
    console.log("adminOnly error:", e);
  }
};

/* ---------- MAIN ---------- */
module.exports.run = async function ({
  api,
  event,
  args,
  Users,
  permssion,
  getText
}) {
  const { threadID, messageID, mentions, type, messageReply } = event;

  const content = args.slice(1);
  const mentionIDs = Object.keys(mentions || {});

  const configPath = global.client.configPath;
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  let ADMINBOT = global.config.ADMINBOT || config.ADMINBOT || [];

  const getUIDs = () => {
    if (type === "message_reply") return [messageReply.senderID];
    if (mentionIDs.length) return mentionIDs;
    if (!isNaN(content[0])) return [content[0]];
    return [];
  };

  switch (args[0]) {

    /* ---------- LIST ---------- */
    case "list":
    case "all": {
      let msg = [];

      for (const id of ADMINBOT) {
        const name = (await Users.getData(id)).name;
        msg.push(`• ${name}\nhttps://facebook.com/${id}`);
      }

      return api.sendMessage(
        getText("listAdmin", msg.join("\n\n")),
        threadID,
        messageID
      );
    }

    /* ---------- ADD ---------- */
    case "add": {
      if (permssion != 3)
        return api.sendMessage(
          getText("noPermission", "add"),
          threadID,
          messageID
        );

      const ids = getUIDs();
      let added = [];

      for (const id of ids) {
        if (!ADMINBOT.includes(id)) {
          ADMINBOT.push(id);
          config.ADMINBOT.push(id);

          const name = (await Users.getData(id)).name;
          added.push(`• ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        getText("addedAdmin", added.length, added.join("\n")),
        threadID,
        messageID
      );
    }

    /* ---------- REMOVE ---------- */
    case "remove":
    case "rm": {
      if (permssion != 3)
        return api.sendMessage(
          getText("noPermission", "remove"),
          threadID,
          messageID
        );

      const ids = getUIDs();
      let removed = [];

      for (const id of ids) {
        const index = ADMINBOT.indexOf(id);

        if (index !== -1) {
          ADMINBOT.splice(index, 1);
          config.ADMINBOT.splice(index, 1);

          const name = (await Users.getData(id)).name;
          removed.push(`• ${name} (${id})`);
        }
      }

      writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        getText("removedAdmin", removed.length, removed.join("\n")),
        threadID,
        messageID
      );
    }

    /* ---------- ADMIN ON ---------- */
    case "adon": {
      if (permssion != 3)
        return api.sendMessage(
          "❎ Only Bot Owner Can Use This",
          threadID,
          messageID
        );

      config.adminOnly = true;
      writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        "🔒 Admin Only Mode Enabled",
        threadID,
        messageID
      );
    }

    /* ---------- ADMIN OFF ---------- */
    case "adoff": {
      if (permssion != 3)
        return api.sendMessage(
          "❎ Only Bot Owner Can Use This",
          threadID,
          messageID
        );

      config.adminOnly = false;
      writeFileSync(configPath, JSON.stringify(config, null, 4));

      return api.sendMessage(
        "🔓 Admin Only Mode Disabled",
        threadID,
        messageID
      );
    }

    /* ---------- DEFAULT ---------- */
    default:
      return api.sendMessage(
        "Use:\n• 0admin list\n• 0admin add\n• 0admin remove\n• 0admin adon\n• 0admin adoff",
        threadID,
        messageID
      );
  }
};
