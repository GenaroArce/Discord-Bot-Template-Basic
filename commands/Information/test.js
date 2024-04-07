module.exports = {
    name: 'test',
    description: 'Test your bot',
    async execute(client, message, args) {
        message.channel.send("Test!")
    }
}