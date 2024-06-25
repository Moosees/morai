import { Events } from 'discord.js';

export default {
  name: Events.MessageCreate,
  async execute(interaction) {
    const cleaningList = ['1252373187765866647', '1251850048891912224'];
    if (!cleaningList.includes(interaction.channelId)) return;

    const messages = await interaction.channel.messages.fetch({ limit: 100 });

    messages.each(async (message) => {
      if (!message.author.bot) return;
      if (message.createdTimestamp > Date.now() - 1000 * 60 * 10) return;

      await message.delete();
    });
  },
};
