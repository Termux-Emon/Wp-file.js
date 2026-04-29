module.exports = {
  config: {
    name: 'groupinfo',
    aliases: ['ginfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Group',
    credit: 'Edited by EMon-BHai',
  },

  start: async ({ api, event }) => {
    try {
      const info = await api.groupMetadata(event.threadId);

      const admins = info.participants.filter(p => p.admin).length;

      const msg =
        `👥 *গ্রুপ তথ্য*\n\n` +
        `📛 নাম: ${info.subject}\n` +
        `👤 সদস্য: ${info.participants.length}\n` +
        `👑 এডমিন: ${admins}\n\n` +
        `📌 স্ট্যাটাস: Active\n\n` +
        `— Admin EMon-BHai`;

      await api.sendMessage(event.threadId, { text: msg });

    } catch (e) {
      console.error(e);
      api.sendMessage(event.threadId, { text: '❌ তথ্য আনতে সমস্যা হয়েছে!' });
    }
  }
};
