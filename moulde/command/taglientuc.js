module.exports.config = {
	name: "taglientuc",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Tag liên tục người bạn tag 10 lần",
	commandCategory: "group",
	usages: " @tag",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));};
	var mention = Object.keys(event.mentions)[0];
  if(!mention) return api.sendMessage("Cần tag người bạn muốn tag liên tục, tag sml", event.threadID, event.messageID);
  var name = ((await api.getUserInfo(mention))[mention]).name;
  var tagmention = [{tag: name, id:mention}];
  var out = function (text) { api.sendMessage({body: text, mentions: tagmention}, event.threadID);}
  await delay(2000);//2000 là 2 giây
  out(`Triệu hồi tml ${name}`);
  await delay(3000);//3000 là 3 giây
  out(`Alô ${name} mày đâu r vào đây đi`);
  await delay(3000);//3000 là 3 giây
  out(`Alô ${name} mày đâu r vào đây đi có ng gọi m nè`);
  await delay(3000);//3000 là 3 giây
  out(`Alô alô m đâu mất tiêu rồi${name}`);
  await delay(3000);//3000 là 3 giây
  out(`Ê ${name} có bạn kiếm m kìa`);
  await delay(3000);//3000 là 3 giây
  out(`${name} Vào tương tác đi bạn ơi`);
  await delay(3000);//3000 là 3 giây
  out(`Alô ${name} m lặn đi đâu rồi`);
  await delay(3000);//3000 là 3 giây
  out(`Alô ${name} nghe rõ trả lời`);
  await delay(3000);//3000 là 3 giây
  out(`Alô alo alô alô ${name}`);
  await delay(3000);//3000 là 3 giây
  out(`Alô ${name} alô 1234`);
}