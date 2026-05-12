const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Parves Wayne",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : 𝗣𝗔𝗥𝗩𝗘𝗦 𝗪𝗔𝗬𝗡𝗘
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : 𝗕𝗔𝗧𝗠𝗔𝗡
║ 🎂 𝗔𝗴𝗲 : 𝟮𝟬
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : 𝗕𝘂𝘀𝗶𝗻𝗲𝘀𝘀
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : 𝗛𝗦𝗖 𝗕𝗮𝘁𝗰𝗵 𝟮𝟬𝟮𝟰
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗙𝗮𝗿𝗶𝗱𝗽𝘂𝗿
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :
║ fb.com/100080580662648
║ 📸 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺 :
║ instagram.com/honestly_parves
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :
║ wa.me/01821721353
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :
║ t.me/Darklord336
╚═════════════════════ ✿
`;

  const images = [
    "https://i.imgur.com/lV670rM.png",
    "https://i.imgur.com/LPYnf78.png",
    "https://i.imgur.com/ZzU331J.png",
    "https://i.imgur.com/kTaqul3.jpg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
