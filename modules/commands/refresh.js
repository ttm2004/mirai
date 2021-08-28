module.exports.config = {
	name: "refresh",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "𝐋𝐚𝐳𝐢𝐜 𝐓𝐞𝐚𝐦",
	description: "Load lại toàn bộ thông tin của nhóm",
	commandCategory: "QTV",
	usages: "balance",
	cooldowns: 500
};

module.exports.run = async ({ event, api, Threads, client }) => {
    const threadInfo = await api.getThreadInfo(event.threadID);
	await Threads.setData(event.threadID, { name: threadInfo.name, threadInfo });
	client.threadInfo.set(event.threadID.toString(), threadInfo);
    return api.sendMessage("Đã làm mới lại thông tin của nhóm thành công!", event.threadID, event.messageID);
}
