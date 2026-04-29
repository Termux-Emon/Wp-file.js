module.exports = {
  config: {
    name: 'tagall',
    permission: 0,
    prefix: 'both',
    categorie: 'Group',
  },

  start: async ({ api, event }) => {
    try {
      const groupInfo = await api.groupMetadata(event.threadId);
      const mentions = groupInfo.participants.map(p => p.id);

      const text =
        `📢 **Group Alert!**\n\n` +
        `সবাই একটু attention দাও 🔥\n\n` +
        `— Admin EMon-BHai`;

      await api.sendMessage(event.threadId, {
        text,
        mentions
      });
    } catch (e) {
      console.error(e);
    }
  }
};
