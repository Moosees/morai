import { Events } from 'discord.js';
import { syncModels } from '../../models/index.js';

// Sync database models
export default {
	name: Events.ClientReady,
	once: true,
	execute() {
		syncModels();
	},
};
