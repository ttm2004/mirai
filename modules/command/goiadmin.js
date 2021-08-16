const fs = require("fs");
module.exports.config = {
name: "Gọi admin",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "VanHung",
	description: "Gọi admin",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("@[!] D U C K")==0 || (event.body.indexOf("@Đức")==0) || (event.body.indexOf("nha")==0) ||
(event.body.indexOf("Đức")==0) ||
(event.body.indexOf("hanh")==0) ||
(event.body.indexOf("NHA")==0)) {
  var msg = {
    body: "Gọi admin làm cc gì yêu hong mà gọi 😼có việc thì nhắn tin qua fb Https://www.facebook.com/Ducvjp.Admin
    .2006 \nGọi nữa ăn đấm đấy 🙂", 
  }
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

	}
