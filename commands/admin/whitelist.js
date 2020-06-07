const { dbModifyId, dbQuery } = require("../../utils/db");
const { string } = require("../../utils/strings");
module.exports = {
	controls: {
		name: "whitelist",
		permission: 1,
		aliases: ["wl"],
		usage: "whitelist <add/remove> <guild id>",
		description: "Whitelists a server",
		enabled: true,
		permissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"]
	},
	do: async (locale, message, client, args) => {
		switch (args[0]) {
		case "add":
		case "+": {
			if (!args[1]) return message.channel.send(string(locale, "INVALID_GUILD_ID_ERROR", {}, "error"));
			let qServerDB = await dbQuery("Server", {id: args[1]});
			qServerDB.whitelist = true;
			await dbModifyId("Server", qServerDB.id, qServerDB);
			return message.channel.send(string(locale, "GUILD_WHITELIST_ADD_SUCCESS", { guild: qServerDB.id }, "success"));
		}
		case "remove":
		case "rm":
		case "-": {
			if (!args[1]) return message.channel.send(string(locale, "INVALID_GUILD_ID_ERROR", {}, "error"));
			let qServerDB = await dbQuery("Server", {id: args[1]});
			qServerDB.whitelist = false;
			await dbModifyId("Server", qServerDB.id, qServerDB);
			return message.channel.send(string(locale, "GUILD_WHITELIST_REMOVE_SUCCESS", { guild: qServerDB.id }, "success"));
		}
		default:
			return message.channel.send(string(locale, "ADD_REMOVE_INVALID_ACTION_ERROR", {}, "error"));
		}
	}
};
