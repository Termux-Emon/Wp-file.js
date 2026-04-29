module.exports = {
  config: {
    name: 'mute',
    aliases: ['m'],
    permission: 2,
    prefix: 'both',
    categorie: 'Group Management',
    credit: 'Edited by EMon-BHai',
    description: 'গ্রুপ নির্দিষ্ট সময়ের জন্য মিউট করা',
  },

  start: async ({ event, api }) => {
    const { threadId, senderId, args } = event;

    if (!threadId.endsWith('@g.us')) {
      return api.sendMessage(threadId, { text: '⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!' });
    }

    const time = parseInt(args[0]);

    if (!time || isNaN(time)) {
      return api.sendMessage(threadId, { text: '⚠️ সঠিক সময় (মিনিট) দাও!\nউদাহরণ: mute 5' });
    }

    const { isSenderAdmin, isBotAdmin } = await global.isAdmin(api, threadId, senderId);

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: '❌ তুমি admin না!' });
    }

    if (!isBotAdmin) {
      return api.sendMessage(threadId, { text: '⚠️ আগে bot কে admin বানাও!' });
    }

    try {
      await api.groupSettingUpdate(threadId, 'announcement');

      await api.sendMessage(threadId, {
        text:
          `🔇 *গ্রুপ মিউট করা হয়েছে*\n\n` +
          `⏳ সময়: ${time} মিনিট\n` +
          `🚫 এখন শুধু admin message দিতে পারবে\n\n` +
          `— Admin EMon-BHai`
      });

      setTimeout(async () => {
        await api.groupSettingUpdate(threadId, 'not_announcement');

        await api.sendMessage(threadId, {
          text:
            `🔊 *গ্রুপ আবার চালু হয়েছে*\n\n` +
            `✅ সবাই এখন message দিতে পারবে\n\n` +
            `— Admin EMon-BHai`
        });
      }, time * 60 * 1000);

    } catch (err) {
      console.error(err);
      api.sendMessage(threadId, { text: '❌ মিউট করতে সমস্যা হয়েছে!' });
    }
  }
};
