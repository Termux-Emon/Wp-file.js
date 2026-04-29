module.exports = {
  event: 'remove',
  handle: async ({ api, event }) => {
    const removedMembers = event.participants;

    // 😂 Random Funny Goodbye (clean style)
    const goodbyeTexts = [
      "ভাই গেলো… group এখন একটু শান্ত 😆",
      "Finally exit! drama কমলো 🤣",
      "তোর exit টা Netflix level 😂",
      "kick না leave? mystery রয়ে গেলো 😏",
      "boss offline হয়ে গেলো forever 😴",
      "group এখন clean mode 😆",
      "আবার আসিস কিন্তু 😜",
      "rage quit detected 😎",
      "meme supplier চলে গেলো 😭",
      "exit cinematic 🎬😂",
      "bye boss, comeback করিস 🔥",
      "এখন আর spam নাই 😆",
      "legend never stay long 😎",
      "ghost হয়ে গেলো 🤫😂",
      "চলে গেলি কিন্তু নজরে আছিস 😏",
      "group এখন boring হয়ে যাবে 😭",
      "silent exit pro level 😎",
      "bye! আবার disturb করিস 😜",
      "admin এখন একটু happy 😆",
      "gone but not forgotten 🤣"
    ];

    // 🎬 Random GIF
    const gifList = [
      "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
      "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
      "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
      "https://media.giphy.com/media/42D3CxaINsAFemFuId/giphy.gif"
    ];

    for (const member of removedMembers) {
      const username = `@${member.split('@')[0]}`;

      const randomText = goodbyeTexts[Math.floor(Math.random() * goodbyeTexts.length)];
      const randomGif = gifList[Math.floor(Math.random() * gifList.length)];

      // 👥 Member count
      let totalMembers = "";
      try {
        const groupInfo = await api.groupMetadata(event.id);
        totalMembers = groupInfo.participants.length;
      } catch (e) {
        totalMembers = "Unknown";
      }

      const time = new Date().toLocaleString();

      // ✨ Clean structured message
      const goodbyeMessage =
        `👋 *Goodbye ${username}*\n\n` +
        `😂 ${randomText}\n\n` +
        `👥 *Members Now:* ${totalMembers}\n` +
        `🕒 *Time:* ${time}\n\n` +
        `— *Admin EMon-BHai*`;

      await api.sendMessage(event.id, {
        image: { url: randomGif },
        caption: goodbyeMessage,
        mentions: [member]
      });
    }
  }
};
