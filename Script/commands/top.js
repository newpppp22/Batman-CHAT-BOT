module.exports.config = {
    name: "top",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Parves Wayne",
    description: "Top richest users",
    commandCategory: "economy",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, Currencies }) {

    const { threadID, messageID } = event;

    const allUsers = await Currencies.getAll();

    const list = allUsers.map(user => ({
        userID: user.userID,
        money: Number(user.money || user.data?.money || 0)
    }));

    list.sort((a, b) => b.money - a.money);

    const topTen = list.slice(0, 10);

    let msg = "🏆 TOP 10 RICHEST USERS 🏆\n\n";

    for (let i = 0; i < topTen.length; i++) {

        const user = topTen[i];

        let name = "Unknown User";

        try {
            const info = await api.getUserInfo(user.userID);

            if (info && info[user.userID]) {
                name = info[user.userID].name;
            }

        } catch (e) {}

        msg += `${i + 1}. ${name} — ${user.money}$\n`;
    }

    return api.sendMessage(msg, threadID, messageID);
};
