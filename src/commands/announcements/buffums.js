import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("buffums")
    .setDescription("Reminds people that buffs are coming")
    .addIntegerOption((option) =>
      option
        .setName("combat")
        .setDescription("Minutes combat buffs will be popped")
        .setMinValue(0)
        .setMaxValue(59),
    )
    .addIntegerOption((option) =>
      option
        .setName("life")
        .setDescription("Minutes life buffs will be popped")
        .setMinValue(0)
        .setMaxValue(59),
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

    const combat =
      interaction.options.getInteger("combat") ?? getDefaultMinutes(0);
    const life = interaction.options.getInteger("life") ?? getDefaultMinutes(2);

    const buffer =
      interaction.member.nickname ||
      interaction.user.globalName ||
      interaction.user.username;

    const message = `### Guild Buffs incoming from ${buffer}! <@&1251296816260055080>\n${createTimeMsg(combat, life)}`;

    await interaction.guild.channels.cache
      .get("1162045473851441165")
      .send(message);

    await interaction.reply({ content: "Buffums posted", ephemeral: true });
  },
};

const getDefaultMinutes = (offset) => {
  const minutes = new Date().getMinutes() + 5 + offset;

  if (minutes > 59) return minutes - 60;

  return minutes;
};

const createTimeMsg = (combat, life) => {
  const combatTime = getFutureUnixTimestamp(combat);
  const lifeTime = getFutureUnixTimestamp(life);

  if (combatTime < lifeTime) {
    return `Combat will be popped <t:${combatTime}:R> and life <t:${lifeTime}:R>`;
  }

  return `Life will be popped <t:${lifeTime}:R> and combat <t:${combatTime}:R>`;
};

const getFutureUnixTimestamp = (targetMinutes) => {
  const date = new Date();
  date.setSeconds(0);
  const minutes = date.getMinutes();

  if (targetMinutes > minutes) {
    date.setMinutes(targetMinutes);
    return Math.floor(date.getTime() / 1000);
  }

  const difference = 60 + targetMinutes - minutes;

  return Math.floor(
    new Date(Date.now() + difference * 60 * 1000).getTime() / 1000,
  );
};
