module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    // 🔥 50+ Random Bangla Funny Welcome Messages
    const welcomeTexts = [
      "এই গ্রুপে ঢুকছো মানে আর বের হওয়ার রাস্তা নাই 😆",
      "Welcome boss! এখন থেকে তুমি আমাদেরই লোক 😎",
      "ঢুকছো ভালো কথা, এখন treat কই? 🍔",
      "সাবধান! এই গ্রুপে বেশি হাসি হয় 😂",
      "নতুন সদস্য detected 🚨 সবাই ভালো ব্যবহার করো 🤣",
      "এই গ্রুপে ঢুকে এখন famous হয়ে যাবে 🤩",
      "ভাই, আগে intro দাও না হলে fine 😜",
      "Welcome! এখন থেকে online থাকবা ২৪/৭ 😏",
      "Group এ ঢুকছো, এখন meme ছাড়া চলবে না 😆",
      "এই গ্রুপে ঢুকে এখন আর single থাকা যাবে না 😜",
      "ভাইরে! আরেকজন victim ধরা পড়লো 😈",
      "Welcome! এখন থেকে তোমার ঘুম শেষ 😴❌",
      "ঢুকেই active না হলে ban 😆",
      "এই গ্রুপে ঢুকলে হাসি ফ্রি 🤣",
      "Boss entry মারছে 🔥 সবাই clap দাও 👏",
      "এই গ্রুপে drama free না 😜",
      "Welcome! এখন roast খাওয়ার জন্য প্রস্তুত থাকো 😏",
      "ভাই intro না দিলে tax লাগবে 😆",
      "এই গ্রুপে ঢুকলে brain use করা নিষেধ 🤣",
      "Welcome! এখন থেকে তুমি family 😎",
      "এই গ্রুপে ঢুকে এখন celebrity feel আসবে 🤩",
      "ভাই, silent থাকলে kick 😜",
      "Welcome! এখন থেকে late night chat compulsory 🌙",
      "এই গ্রুপে ঢুকে এখন boredom gone 😆",
      "ভাই treat না দিলে problem 😏",
      "Welcome! এখন থেকে meme boss 😎",
      "এই গ্রুপে ঢুকলে serious হওয়া banned 😂",
      "ভাই intro দাও না হলে admin রাগ করবে 😜",
      "Welcome! এখন থেকে fun unlimited 🤣",
      "এই গ্রুপে ঢুকে এখন tension free 😆",
      "Boss! entry মারছো stylish ভাবে 🔥",
      "Welcome! এখন থেকে reply দিতে হবে 😏",
      "এই গ্রুপে ঢুকলে হাসি আটকানো যায় না 😂",
      "ভাই, inactive হলে delete 😜",
      "Welcome! এখন থেকে তুমি legend 😎",
      "এই গ্রুপে ঢুকে এখন entertainment full 😆",
      "ভাই intro দাও, না হলে investigation 😏",
      "Welcome! এখন থেকে sleep cancel 😴❌",
      "এই গ্রুপে ঢুকে এখন time waste legit 🤣",
      "Boss! welcome to madness 😆",
      "এই গ্রুপে ঢুকে এখন fun overload 😂",
      "Welcome! এখন থেকে rules follow করবা 😏",
      "ভাই treat না দিলে block 😜",
      "এই গ্রুপে ঢুকে এখন smile free 😆",
      "Welcome! এখন থেকে chat nonstop 🔥",
      "ভাই intro না দিলে fine 😜",
      "এই গ্রুপে ঢুকে এখন boring life finish 😂",
      "Welcome! এখন থেকে তুমি VIP 😎",
      "ভাই inactive হলে warning 😏",
      "এই গ্রুপে ঢুকে এখন enjoy করো 😆",
      "Welcome! এখন থেকে family member 🤗",
      "Boss! welcome to crazy world 🤣",
      "এই গ্রুপে ঢুকে এখন fun guaranteed 😆",
      "Welcome! এখন থেকে reply fast 😏"
    ];

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;

      // 🎲 Random Message Select
      const randomText = welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];

      const welcomeMessage =
        `🎉✨ *Hey ${username}, Welcome to ${groupName}!* ✨🎉\n\n` +
        `😂 ${randomText}\n\n` +
        `👥 *Total Members:* ${totalMembers}\n` +
        `📢 *Rules:* Be respectful, stay active & enjoy!`;

      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: welcomeMessage,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text: welcomeMessage,
          mentions: [member]
        });
      }
    }
  }
};
