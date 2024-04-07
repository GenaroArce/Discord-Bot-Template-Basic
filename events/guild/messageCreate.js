module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {
        if (message.guild == null || message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);
        if (command) {
            try {
                command.execute(client, message, args);
            } catch (error) {
                console.error("Error: ", error);
                return message.channel.send("Error!")
            }
        }
    }
}