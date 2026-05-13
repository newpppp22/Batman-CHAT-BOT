module.exports.config = {
  name: "allbox",
  version: "2.0.0",
  credits: "Parves Wayne",
  hasPermssion: 2,
  description: "Manage all bot groups",
  commandCategory: "Admin",
  usages: "[page/all]",
  cooldowns: 5
};

module.exports.handleReply = async function ({
  api,
  event,
  Threads,
  handleReply
}) {
  const { threadID } = event;

  if (event.senderID != handleReply.author) return;

  const args = event.body.split(" ");

  const action = args[0].toLowerCase();
t number = parseInt(args[1]);

  if (isNaN(number)) {
    return api.sendMessage(
      "⚠️ Use like:\nban 1\nunban 1\nout 1\ndel 1",
      threadID
    );
  }

  const idgr = handleReply.groupid[number - 1];
  const groupName = handleReply.groupName[number - 1];

  if (!idgr) {
    return api.sendMessage("❌ Invalid number!", threadID);
  }

  switch (action) {

    case "ban": {
      const data = (await Threads.getData(idgr)).data || {};

      data.banned = true;
      data.reason = "Banned by admin";

      await Threads.setData(idgr, { data });

      global.data.threadBanned.set(idgr, {
        reason: data.reason
      });

      api.sendMessage(
        `✅ Successfully banned:\n${groupName}`,
        threadID
      );

      break;
    }

    case "unban": {
      const data = (await Threads.getData(idgr)).data || {};

      data.banned = false;

      await Threads.setData(idgr, { data });

      global.data.threadBanned.delete(idgr);

      api.sendMessage(
        `✅ Successfully unbanned:\n${groupName}`,
        threadID
      );

      break;
    }

    case "del": {
      await Threads.delData(idgr);

      api.sendMessage(
        `✅ Deleted thread data:\n${groupName}`,
        threadID
      );

      break;
    }

    case "out": {
      api.sendMessage(
        `👋 Bot left group:\n${groupName}`,
        threadID
      );

      api.removeUserFromGroup(
        api.getCurrenmodule.exports.config = {
  name: "allbox",
  version: "2.0.0",
  credits: "Parves Wayne",
  hasPermssion: 2,
  description: "Manage all bot groups",
  commandCategory: "Admin",
  usages: "[page/all]",
  cooldowns: 5
};

module.exports.handleReply = async function ({
  api,
  event,
  Threads,
  handleReply
}) {
  const { threadID } = event;

  if (event.senderID != handleReply.author) return;

  const args = event.body.split(" ");

  const action = args[0].toLowerCase();
  const number = parseInt(args[1]);

  if (isNaN(number)) {
    return api.sendMessage(
      "⚠️ Use like:\nban 1\nunban 1\nout 1\ndel 1",
      threadID
    );
  }

  const idgr = handleReply.groupid[number - 1];
  const groupName = handleReply.groupName[number - 1];

  if (!idgr) {
    return api.sendMessage("❌ Invalid number!", threadID);
  }

  switch (action) {

    case "ban": {
      const data = (await Threads.getData(idgr)).data || {};

      data.banned = true;
      data.reason = "Banned by admin";

      await Threads.setData(idgr, { data });

      global.data.threadBanned.set(idgr, {
        reason: data.reason
      });

      api.sendMessage(
        `✅ Successfully banned:\n${groupName}`,
        threadID
      );

      break;
    }

    case "unban": {
      const data = (await Threads.getData(idgr)).data || {};

      data.banned = false;

      await Threads.setData(idgr, { data });

      global.data.threadBanned.delete(idgr);

      api.sendMessage(
        `✅ Successfully unbanned:\n${groupName}`,
        threadID
      );

      break;
    }

    case "del": {
      await Threads.delData(idgr);

      api.sendMessage(
        `✅ Deleted thread data:\n${groupName}`,
        threadID
      );

      break;
    }

    case "out": {
      api.sendMessage(
        `👋 Bot left group:\n${groupName}`,
        threadID
      );

      api.removeUserFromGroup(
        api.getCurrentUserID(),
        idgr
      );

      break;
    }

    default:
      api.sendMessage(
        "❌ Invalid action!\nUse: ban/unban/out/del",
        threadID
      );
  }
};

module.exports.run = async function ({
  api,
  event,
  args
}) {

  let threadList = [];

  let data;

  try {
    data = await api.getThreadList(
      1000,
      null,
      ["INBOX"]
    );
  } catch (e) {
    console.log(e);
  }

  for (const thread of data) {
    if (thread.isGroup) {
      threadList.push({
        threadName: thread.name,
        threadID: thread.threadID,
        messageCount: thread.messageCount
      });
    }
  }

  threadList.sort((a, b) => {
    return b.messageCount - a.messageCount;
  });

  if (args[0] == "all") {

    let msg = "📋 ALL GROUP LIST\n\n";

    let groupid = [];
    let groupName = [];

    threadList.forEach((group, index) => {

      msg += `${index + 1}. ${group.threadName}
🔰 TID: ${group.threadID}
💌 Messages: ${group.messageCount}

`;

      groupid.push(group.threadID);
      groupName.push(group.threadName);
    });

    msg += `Reply Example:
ban 1
unban 1
out 1
del 1`;

    return api.sendMessage(
      msg,
      event.threadID,
      (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          author: event.senderID,
          messageID: info.messageID,
          groupid,
          groupName,
          type: "reply"
        });
      }
    );
  }

  let page = parseInt(args[0]) || 1;

  if (page < 1) page = 1;

  let limit = 10;

  let start = (page - 1) * limit;
  let end = page * limit;

  let pageList = threadList.slice(start, end);

  let totalPage = Math.ceil(threadList.length / limit);

  let msg = `📋 GROUP LIST [PAGE ${page}/${totalPage}]\n\n`;

  let groupid = [];
  let groupName = [];

  pageList.forEach((group, index) => {

    msg += `${start + index + 1}. ${group.threadName}
🔰 TID: ${group.threadID}
💌 Messages: ${group.messageCount}

`;

    groupid.push(group.threadID);
    groupName.push(group.threadName);
  });

  msg += `━━━━━━━━━━━━━━
📌 Use:
${global.config.PREFIX}allbox all
${global.config.PREFIX}allbox 2

Reply Example:
ban 1
unban 1
out 1
del 1`;

  api.sendMessage(
    msg,
    event.threadID,
    (err, info) => {

      global.client.handleReply.push({
        name: this.config.name,
        author: event.senderID,
        messageID: info.messageID,
        groupid,
        groupName,
        type: "reply"
      });

    }
  );
};￼EntertUserID(),
        idgr
      );

      break;
    }

    default:
      api.sendMessage(
        "❌ Invalid action!\nUse: ban/unban/out/del",
        threadID
      );
  }
};

module.exports.run = async function ({
  api,
  event,
  args
}) {

  let threadList = [];

  let data;

  try {
    data = await api.getThreadList(
      1000,
      null,
      ["INBOX"]
    );
  } catch (e) {
    console.log(e);
  }

  for (const thread of data) {
    if (thread.isGroup) {
