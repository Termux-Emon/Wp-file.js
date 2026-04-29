module.exports = {
  config: {
    name: 'unmute',
    aliases: ['unm'],
    permission: 2,
    prefix: 'both',
    categorie: 'Group Management',
    credit: 'Edited by EMon-BHai',
    description: 'গ্রুপ আনমিউট করা',
  },

  start: async ({ event, api }) => {
    const { threadId, senderId } = event;

    if (!threadId.endsWith('@g.us')) {
      return api.sendMessage(threadId, { text: '⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!' });
    }

    const { isSenderAdmin, isBotAdmin } = await global.isAdmin(api, threadId, senderId);

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, { text: '❌ তুমি admin না!' });
    }

    if (!isBotAdmin) {
      return api.sendMessage(threadId, { text: '⚠️ আগে bot কে admin বানাও!' });
    }

    try {
      await api.groupSettingUpdate(threadId, 'not_announcement');

      await api.sendMessage(threadId, {
        text:
          `🔊 *গ্রুপ আনমিউট করা হয়েছে*\n\n` +
          `✅ সবাই এখন message দিতে পারবে\n\n` +
          `— Admin EMon-BHai`
      });

    } catch (err) {
      console.error(err);
      api.sendMessage(threadId, { text: '❌ আনমিউট করতে সমস্যা হয়েছে!' });
    }
  }
};
