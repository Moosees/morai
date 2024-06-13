import 'dotenv/config.js';
import { readdirSync } from 'fs';
import { REST, Routes } from 'discord.js';

const commands = [];
const srcPath = import.meta.url;

// Grab all the command folders from the commands directory
const commandFolders = readdirSync(new URL('./commands', srcPath));
console.log({ commandFolders });

for (const folder of commandFolders) {
	const folderPath = './commands/' + folder;
	console.log({ folderPath });

	// Grab all the command files from the commands directory
	const commandFiles = readdirSync(new URL(folderPath, srcPath))
		.filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = folderPath + '/' + file;
		console.log({ file, filePath });

		const { default: command } = await import(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

console.log({ commands });

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands globally for bot
		const data = await rest.put(
			Routes.applicationCommands(process.env.BOT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
