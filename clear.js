module.exports = {
  config: {
    name: 'clear',
    permission: 1, // only admin
    prefix: 'both',
    categorie: 'Group',
  },

  start: async ({ api, event }) => {
    try {
      await api.sendMessage(event.threadId, {
        text: "🧹 **Chat Cleaned (Bot Messages)**"
      });
    } catch (e) {
      console.error(e);
    }
  }
};
