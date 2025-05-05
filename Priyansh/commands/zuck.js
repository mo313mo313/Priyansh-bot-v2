module.exports.config = {
  name: "معلومات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "أبو عباس",
  description: "يعرض معلومات عن المجموعة",
  commandCategory: "group",
  usages: "معلومات",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  try {
    const threadInfo = await api.getThreadInfo(threadID);

    const threadName = threadInfo.threadName || "بدون اسم";
    const memberCount = threadInfo.participantIDs.length;
    const adminCount = threadInfo.adminIDs.length;
    const messageCount = threadInfo.messageCount || 0;
    const inGroupUsers = threadInfo.userInfo.filter(user => user.isSubscriber);
    const leftCount = memberCount - inGroupUsers.length;

    const msg = `• اسم المجموعة: ${threadName}
• عدد الأعضاء: ${memberCount}
• عدد المشرفين: ${adminCount}
• عدد المغادرين: ${leftCount}
• عدد الرسائل: ${messageCount}
• المطور: أبو عباس`;

    return api.sendMessage(msg, threadID, messageID);
  } catch (err) {
    return api.sendMessage("حدث خطأ أثناء جلب المعلومات.", threadID, messageID);
  }
};
