import { Events } from "discord.js";

export default {
  name: Events.MessageCreate,
  async execute(interaction) {
    const cleaningList = ["1162045473851441165"];
    if (!cleaningList.includes(interaction.channelId)) return;

    const messages = await interaction.channel.messages.fetch({ limit: 100 });

    messages.each((message) => {
      if (!message.author.bot) return;
      if (message.createdTimestamp > Date.now() - 1000 * 60 * 30) return;

      message.delete();
    });
  },
};
