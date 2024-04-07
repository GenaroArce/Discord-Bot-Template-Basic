const { ActivityType } = require("discord.js");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Bot online >> ${client.user.tag}`);

        client.user.setPresence({
            activities: [{ name: `https://github.com/GenaroArce`, type: ActivityType.Watching }],
            status: 'dnd',
          });
	},
};