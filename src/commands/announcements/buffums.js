import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("buffums")
    .setDescription("Reminds people that buffs are coming")
    .addIntegerOption((option) =>
      option.setName("combat").setDescription("Combat buffs in X min"),
    )
    .addIntegerOption((option) =>
      option.setName("life").setDescription("Life buffs in X min"),
    ),
  async execute(interaction) {
    if (
      !interaction.member.roles.cache.some(
        (role) => role.id === "1251296816260055080",
      )
    ) {
      return await interaction.reply({
        content: "Officers only",
        ephemeral: true,
      });
    }

    const combat = interaction.options.getInteger("combat");
    const life = interaction.options.getInteger("life");
    const buffer =
      interaction.member.nickname ||
      interaction.user.globalName ||
      interaction.user.username;

    const message = `# Guild Buffs incoming from ${buffer}! <@&1251296816260055080>\nCombat buffs will be popped ${combat} and life ${life}`;

    await interaction.guild.channels.cache
      .get("1162045473851441165")
      .send(message);

    await interaction.reply({ content: "Buffums posted", ephemeral: true });
  },
};
