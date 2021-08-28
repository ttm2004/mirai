module.exports.config = {
	name: "giveaway",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "𝐋𝐚𝐳𝐢𝐜 𝐓𝐞𝐚𝐦",
	description: "Give away dành cho nhóm chat, bao xịn xò xD",
	commandCategory: "Lỗi",
	usages: "ga [args]",
	cooldowns: 5,
	info: [
		{
			key: 'args',
			prompt: ' ¯\\_(ツ)_/¯  ',
			type: 'Văn Bản',
			example: ''
		}
	]
};

module.exports.handleReaction = async ({ client, api, event, Users, handleReaction }) => {
	let data = client.GA.get(handleReaction.ID);
	if (data.status == "close" || data.status == "ended") return;
	if (event.reaction == undefined) {
		data.joined.splice(data.joined.indexOf(event.userID), 1);
		client.GA.set(handleReaction.ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
		else value = (value.nicknames)[event.userID];
		return api.sendMessage(`${value} Đã rời giveaway có ID: #${handleReaction.ID}`, event.userID);
	}
	data.joined.push(event.userID);
	client.GA.set(handleReaction.ID, data);
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
	else value = (value.nicknames)[event.userID];
	return api.sendMessage(`${value} Đã tham gia thành công giveaway có ID: #${handleReaction.ID}`, event.userID);
}

module.exports.run = async ({ client, api, event, args, utils, Users }) => {
	if (!client.GA) client.GA = new Map();
	if (args[0] == "create") {
		let reward = args.slice(1).join(" ");
		let randomNumber = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.senderID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		api.sendMessage(
			"[ = ] [ = [ Give Away ] = ] [ = ]" +
			"\n[=] Tạo Bởi : " + value +
			"\n[=] Phần Thưởng : " + reward +
			"\n[=] ID GiveAway: " + randomNumber +
			"\nThả Icon Vào Tin Nhắn Này Để Tham Gia"
			, event.threadID, (err, info) => {
				let dataGA = {
					"ID": randomNumber,
					"author": value,
					"authorID": event.senderID,
					"messageID": info.messageID,
					"reward": reward,
					"joined": [],
					"status": "open"
				}
				client.GA.set(randomNumber, dataGA);
				client.handleReaction.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					ID: randomNumber
				})
			}
		)
	}
	else if (args[0] == "details") {
		let ID = args[1];
		if (!ID) return api.sendMessage("Bạn phải nhập ID GiveAway để có thể xem thông tin giveaway!", event.threadID, event.messageID);
		let data = client.GA.get(ID);
		if (!data) return api.sendMessage("ID GiveAway bạn nhập không tồn tại!", event.threadID, event.messageID);
		return api.sendMessage(
			"[ = ] [ = [ Give Away ] = ] [ = ]" +
			"\n[=] Tạo Bởi : " + data.author + "(" + data.authorID + ")" +
			"\m[=] Phần Thưởng : " + data.reward +
			"\n[=] ID GiveAway: " + data.ID +
			"\n[=] Tổng số thành viên đã tham gia giveaway: " + data.joined.length + " người" +
			"\n[=] Trạng thái: " + data.status
			, event.threadID, data.messageID
		);
	}
	else if (args[0] == "join") {
		let ID = args[1]
		if (!ID) return api.sendMessage("Bạn phải nhập ID GiveAway để có thể tham gia giveaway!", event.threadID, event.messageID);
		let data = client.GA.get(ID);
		if (!data) return api.sendMessage("ID GiveAway bạn nhập không tồn tại!", event.threadID, event.messageID);
		if (data.joined.includes(event.senderID)) return api.sendMessage("Bạn đã tham gia giveaway này", event.threadID);
		data.joined.push(event.senderID);
		client.GA.set(ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		return api.sendMessage(`${value} Đã tham gia thành công giveaway có ID: #${ID}`, event.senderID);
	}
	else if (args[0] == "roll") {
		let ID = args[1]
		if (!ID) return api.sendMessage("Bạn phải nhập ID GiveAway để có thể tham gia giveaway!", event.threadID, event.messageID);
		let data = client.GA.get(ID);
		if (!data) return api.sendMessage("ID GiveAway bạn nhập không tồn tại!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("Bạn không phải là người chủ trì ID GiveaWay này!", event.threadID, event.messageID);
		let winner = data.joined[Math.floor(Math.random() * data.joined.length)];
		let userInfo = await Users.getInfo(winner);
		var name = userInfo.name;
		return api.sendMessage({
			body: `Weooo chúc mừng ${name}, bạn đã thắng giveaway có ID: ${data.ID}\nBạn hãy liên hệ tới: ${data.author}\nhttps://facebook.me/${data.authorID}`,
			mentions: [{
				tag: name,
				id: winner
			}]
		}, event.threadID, event.messageID);
	}
	else if (args[0] == "end") {
		let ID = args[1]
		if (!ID) return api.sendMessage("Bạn phải nhập ID GiveAway để có thể tham gia giveaway!", event.threadID, event.messageID);
		let data = client.GA.get(ID);
		if (!data) return api.sendMessage("ID GiveAway bạn nhập không tồn tại!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("Bạn không phải là người chủ trì ID GiveaWay này!", event.threadID, event.messageID);
		data["status"] = "ended";
		client.GA.set(ID, data);
		api.unsendMessage(data.messageID);
		return api.sendMessage(`GiveAway có ID: #${data.ID} đã kết thúc bởi ${data.author}`, event.threadID, event.messageID);
	}
	else return api.sendMessage("Lỗi Má ơi , Hướng Dẫn Nè Bấm /howtouse giveaway để có Hướng Dẫn !", event.threadID, event.messageID);
}
