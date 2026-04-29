const setAntilinkSetting = global.setAntilinkSetting;
const getAntilinkSetting = global.getAntilinkSetting;

module.exports = {
  config: {
    name: 'antilink',
    aliases: ['al'],
    permission: 2,
    prefix: true,
    categorie: 'Moderation',
    credit: 'Modified by EMon-BHai',
    description: 'গ্রুপে লিংক নিয়ন্ত্রণ করার সিস্টেম',
  },

  // ⚙️ Command Part
  start: async ({ event, api, args }) => {
    const { threadId, senderId } = event;

    const { isSenderAdmin } = await global.isAdmin(api, threadId, senderId);

    if (!isSenderAdmin) {
      return api.sendMessage(threadId, {
        text: '❌ শুধু Admin এই কমান্ড ব্যবহার করতে পারবে!'
      });
    }

    const sub = args[0]?.toLowerCase();

    if (!sub) {
      return api.sendMessage(threadId, {
        text:
`🚫 *ANTILINK CONTROL PANEL*

📌 ব্যবহার নিয়ম:

➤ antilink off  
➤ antilink whatsapp  
➤ antilink whatsappchannel  
➤ antilink telegram  
➤ antilink all  

✨ Example: antilink all

— Admin EMon-BHai`
      });
    }

    let msg = '';

    switch (sub) {
      case 'off':
        setAntilinkSetting(threadId, 'off');
        msg = '✅ *Antilink বন্ধ করা হয়েছে*';
        break;

      case 'whatsapp':
        setAntilinkSetting(threadId, 'whatsappGroup');
        msg = '🚫 *WhatsApp Group Link Block করা হয়েছে*';
        break;

      case 'whatsappchannel':
        setAntilinkSetting(threadId, 'whatsappChannel');
        msg = '🚫 *WhatsApp Channel Link Block করা হয়েছে*';
        break;

      case 'telegram':
        setAntilinkSetting(threadId, 'telegram');
        msg = '🚫 *Telegram Link Block করা হয়েছে*';
        break;

      case 'all':
        setAntilinkSetting(threadId, 'allLinks');
        msg = '🚫 *সব ধরনের Link Block করা হয়েছে*';
        break;

      default:
        msg = '⚠️ ভুল কমান্ড! .antilink লিখে help দেখো';
    }

    await api.sendMessage(threadId, {
      text: `${msg}\n\n— Admin EMon-BHai`
    });
  },

  // ⚡ Auto Detection Part
  event: async ({ event, api }) => {
    const { threadId, senderId, body, message } = event;

    if (!threadId.endsWith('@g.us')) return;
    if (!body) return;

    const setting = getAntilinkSetting(threadId);
    if (!setting || setting === 'off') return;

    // 👑 Admin skip
    const { isSenderAdmin, isBotAdmin } = await global.isAdmin(api, threadId, senderId);
    if (isSenderAdmin) return;

    if (!isBotAdmin) {
      return api.sendMessage(threadId, {
        text: '⚠️ Antilink কাজ করতে bot কে admin বানাও!'
      });
    }

    // 🔗 Link Patterns
    const patterns = {
      whatsappGroup: /chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/i,
      whatsappChannel: /wa\.me\/channel\/[A-Za-z0-9]+/i,
      telegram: /t\.me\/[A-Za-z0-9_]+/i,
      allLinks: /(https?:\/\/|www\.)[^\s]+/i,
    };

    let matched = false;

    if (
      (setting === 'whatsappGroup' && patterns.whatsappGroup.test(body)) ||
      (setting === 'whatsappChannel' && patterns.whatsappChannel.test(body)) ||
      (setting === 'telegram' && patterns.telegram.test(body)) ||
      (setting === 'allLinks' && patterns.allLinks.test(body))
    ) {
      matched = true;
    }

    if (!matched) return;

    try {
      // 🗑️ Delete Message
      await api.sendMessage(threadId, {
        delete: {
          remoteJid: threadId,
          fromMe: false,
          id: message.key.id,
          participant: message.key.participant || senderId,
        }
      });

      // ⚠️ Warning Message
      await api.sendMessage(threadId, {
        text:
          `🚫 @${senderId.split('@')[0]} লিংক দেওয়া নিষিদ্ধ!\n` +
          `⚠️ আবার দিলে action নেওয়া হবে\n\n` +
          `— Admin EMon-BHai`,
        mentions: [senderId],
      });

    } catch (err) {
      console.error('Antilink Error:', err);
    }
  }
};
