require('dotenv').config();
const { GatewayIntentBits, Partials, Client, Collection } = require('discord.js')
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.User
    ]
});

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const commandsPath = path.join(__dirname, 'commands');

const registerEvents = (basePath) => {
    const files = fs.readdirSync(basePath);

    for (const file of files) {
        const filePath = path.join(basePath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            registerEvents(filePath);
        } else if (file.endsWith('.js')) {
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
};

function registerCommands(basePath) {
    const folders = fs.readdirSync(basePath);

    for (const folder of folders) {
        const folderPath = path.join(basePath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            client.commands.set(command.name, command);
        }
    }
}

registerCommands(commandsPath);
registerEvents(eventsPath);

client.login(process.env.TOKEN);