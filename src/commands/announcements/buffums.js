import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("buffums")
    .setDescription(
      "Reminds people that buffs are coming, defaults to combat in 5 min and life in 7 min",
    )
    .addIntegerOption((option) =>
      option
        .setName("combat")
        .setDescription(
          "Override minute combat buffs will be popped (0-59) -> pop combat at xx.[this number]",
        )
        .setMinValue(0)
        .setMaxValue(59),
    )
    .addIntegerOption((option) =>
      option
        .setName("life")
        .setDescription(
          "Override minute life buffs will be popped (0-59) -> pop life at xx.[this number]",
        )
        .setMinValue(0)
        .setMaxValue(59),
    )
    .addStringOption((option) =>
      option
        .setName("buffs")
        .setDescription(
          'What buffs to announce (combat, life or both), defaults to "both"',
        )
        .addChoices(
          { name: "both", value: "both" },
          { name: "combat", value: "combat" },
          { name: "life", value: "life" },
        ),
    ),
  async execute(interaction) {
    if (
      !interaction.member.roles.cache.some(
        (role) => role.id === "1059578453688582274",
      )
    ) {
      return await interaction.reply({
        content: "Officers only",
        ephemeral: true,
      });
    }

    const combatOption = interaction.options.getInteger("combat");
    const lifeOption = interaction.options.getInteger("life");
    const buffsOptions = interaction.options.getString("buffs");

    const { combat, life } = parseOptions(combatOption, lifeOption);

    const buffer =
      interaction.member.nickname ||
      interaction.user.globalName ||
      interaction.user.username;

    const message = `### Guild Buffs incoming from ${buffer}! <@&1251849511081607199>\n${createTimeMsg(combat, life, buffsOptions)}`;

    await interaction.guild.channels.cache
      // .get("1162045473851441165") // test
      .get("1251850048891912224") // cabbums
      .send(message);

    await interaction.reply({ content: "Buffums posted", ephemeral: true });
  },
};

const parseOptions = (combat, life) => {
  const combatIsNumber = typeof combat === "number";
  const lifeIsNumber = typeof life === "number";

  if (combatIsNumber && lifeIsNumber) return { combat, life };

  if (combatIsNumber && !lifeIsNumber) {
    return { combat, life: combat + 2 > 59 ? combat + 2 - 60 : combat + 2 };
  }

  if (!combatIsNumber && lifeIsNumber) {
    return { life, combat: life + 2 > 60 ? life + 2 - 60 : life + 2 };
  }

  return {
    combat: getDefaultMinutes(5),
    life: getDefaultMinutes(7),
  };
};

const getDefaultMinutes = (offset) => {
  const minutes = new Date().getMinutes() + offset;

  if (minutes > 59) return minutes - 60;

  return minutes;
};

const createTimeMsg = (combat, life, buffs) => {
  const combatTime = getFutureUnixTimestamp(combat);
  const lifeTime = getFutureUnixTimestamp(life);

  if (buffs === "combat") return `Combat will be popped in <t:${combatTime}:R>`;
  if (buffs === "life") return `Life will be popped in <t:${lifeTime}:R>`;

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
