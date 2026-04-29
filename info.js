const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad Nayan (Styled by EMon-BHai)',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },

  start: async ({ event, api }) => {
    try {
      // ⏱️ Uptime
      const uptimeSec = process.uptime();
      const days = Math.floor(uptimeSec / (3600 * 24));
      const hours = Math.floor((uptimeSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((uptimeSec % 3600) / 60);
      const uptime = `${days}d ${hours}h ${minutes}m`;

      // 👑 Admin List
      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `➤ **${i + 1}. @${id.split('@')[0]}**`)
              .join('\n')
          : '**❌ No Admin Found**';

      // 📊 Memory
      const totalMem = os.totalmem() / (1024 ** 3);
      const freeMem = os.freemem() / (1024 ** 3);
      const usedMem = totalMem - freeMem;
      const ramUsage = ((usedMem / totalMem) * 100).toFixed(2);

      const infoMessage = `
╔════════════════════╗
     👑 𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎
╚════════════════════╝

**👤 Name           : EMON HAWLADAR**
**📘 Facebook       : EMON HAWLADAR**
**🕌 Religion       : Islam**
**📍 Address        : Madaripur, Dhaka**
**🚹 Gender         : Male**
**🎂 Age            : 24+**
**💍 Relationship   : Married**
**💼 Work           : Student**
**📧 Gmail          : emonhawladar311@gmail.com**
**📱 WhatsApp       : wa.me/+8801309991724**
**📨 Telegram       : t.me/EMONHAWLADAR**
**🔗 Facebook Link  : https://www.facebook.com/EMon.BHai.FACEBOOK**

━━━━━━━━━━━━━━━━━━━
👑 **ADMIN LIST**
━━━━━━━━━━━━━━━━━━━
${adminListText}

━━━━━━━━━━━━━━━━━━━
🖥️ **SERVER INFO**
━━━━━━━━━━━━━━━━━━━
**🖥️ Platform      : ${os.platform()} (${os.arch()})**
**🏷️ Hostname      : ${os.hostname()}**
**⚙️ CPU           : ${os.cpus()[0].model}**
**🧠 RAM Usage     : ${ramUsage}%**
**📦 Total RAM     : ${totalMem.toFixed(2)} GB**
**📉 Free RAM      : ${freeMem.toFixed(2)} GB**
**🔢 Node.js       : ${process.version}**
**⏱️ Uptime        : ${uptime}**

━━━━━━━━━━━━━━━━━━━
✨ **STATUS: RUNNING SMOOTHLY 🚀**
— **Admin EMon-BHai**
`;

      await api.sendMessage(
        event.threadId,
        {
          image: { url: "https://i.postimg.cc/4dn9RK6j/IMG-20260428-WA0000.jpg" },
          caption: infoMessage
        },
        { quoted: event.message }
      );

    } catch (error) {
      console.error(error);
      await api.sendMessage(
        event.threadId,
        '❌ **Info load করতে সমস্যা হয়েছে!**',
        { quoted: event.message }
      );
    }
  },
};
