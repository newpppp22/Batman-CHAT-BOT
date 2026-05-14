module.exports.config = {
    name: "money",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Parves Wayne ",
    description: "Lightweight economy system",
    commandCategory: "economy",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const { threadID, senderID, messageID, mentions } = event;

    if (!args[0]) {
        return api.sendMessage(
            "⚡ Available Commands:\n" +
            "» money ck @tag\n" +
            "» money me <amount>\n" +
            "» money send @tag <amount>\n" +
            "» money gift @tag <amount>\n" +
            "» money restart\n" +
            "» money board",
            threadID,
            messageID
        );
    }

    const type = args[0].toLowerCase();

    // CHECK BALANCE
    if (type === "ck") {
        if (!mentions || Object.keys(mentions).length !== 1)
            return api.sendMessage("⚠️ Please tag 1 user!", threadID, messageID);

        const uid = Object.keys(mentions)[0];
        const data = await Currencies.getData(uid);
        const money = data?.money || 0;

        return api.sendMessage(
            {
                body: `💰 ${mentions[uid]}'s balance: ${money}$`,
                mentions: [{ tag: mentions[uid], id: uid }]
            },
            threadID,
            messageID
        );
    }

    // ADD MONEY SELF
    if (type === "me") {
        if (!args[1] || isNaN(args[1]))
            return api.sendMessage("⚠️ Usage: money me <amount>", threadID, messageID);

        const amount = parseInt(args[1]);
        await Currencies.increaseMoney(senderID, amount);

        return api.sendMessage(
            `💵 Added ${amount}$ to your balance!`,
            threadID,
            messageID
        );
    }

    // SEND MONEY
    if (type === "send") {
    const mentionIDs = Object.keys(mentions || {});

    if (mentionIDs.length !== 1)
        return api.sendMessage("⚠️ Usage: money send @tag <amount>", threadID, messageID);

    const uid = mentionIDs[0];

    const amount = Number(args.find(a => !isNaN(a)));

    if (!amount || amount <= 0)
        return api.sendMessage("⚠️ Valid amount দিন!", threadID, messageID);

    const senderData = await Currencies.getData(senderID);
    const senderMoney = Number(senderData?.money || 0);

    if (senderMoney < amount)
        return api.sendMessage("❌ আপনার যথেষ্ট টাকা নেই!", threadID, messageID);

    await Currencies.decreaseMoney(senderID, amount);
    await Currencies.increaseMoney(uid, amount);

    return api.sendMessage(
        {
            body: `✅ Sent ${amount}$ to ${mentions[uid]}`,
            mentions: [{ tag: mentions[uid], id: uid }]
        },
        threadID,
        messageID
    );
    }

    // GIFT MONEY
    if (type === "gift") {
    const mentionIDs = Object.keys(mentions || {});

    if (mentionIDs.length !== 1)
        return api.sendMessage("⚠️ Usage: money gift @tag <amount>", threadID, messageID);

    const uid = mentionIDs[0];

    const amount = Number(args.find(a => !isNaN(a)));

    if (!amount || amount <= 0)
        return api.sendMessage("⚠️ Valid amount দিন!", threadID, messageID);

    await Currencies.increaseMoney(uid, amount);

    return api.sendMessage(
        {
            body: `🎁 Gifted ${amount}$ to ${mentions[uid]}`,
            mentions: [{ tag: mentions[uid], id: uid }]
        },
        threadID,
        messageID
    );
    }

    // RESET
    if (type === "restart") {
        await Currencies.setData(senderID, { money: 0 });
        return api.sendMessage("♻️ Your money has been reset.", threadID, messageID);
    }

    // LEADERBOARD
    if (type === "board") {
        const allUsers = await Currencies.getAll(["money"]);

        const filtered = allUsers.map(u => ({
            userID: u.userID,
            money: u.money || u.data?.money || 0
        }));

        filtered.sort((a, b) => b.money - a.money);
        const top = filtered.slice(0, 5);

        let msg = "🏆 Top Richest Users:\n\n";
        let index = 1;

        for (const user of top) {
            let name = global.data.userName.get(user.userID);

            if (!name) {
                try {
                    const info = await api.getUserInfo(user.userID);
                    name = info[user.userID]?.name || "Unknown User";
                    global.data.userName.set(user.userID, name);
                } catch {
                    name = "Unknown User";
                }
            }

            msg += `${index++}. ${name} — ${user.money}$\n`;
        }

        return api.sendMessage(msg, threadID, messageID);
    }

    return api.sendMessage("⚠️ Invalid command.", threadID, messageID);
};
