const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, time } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get info about the bot"),

  /**
   * @param {CommandInteraction} interaction
   * @return
   */
  async execute(interaction) {
    let upTime = process.uptime();
    const ping = Math.round(interaction.client.ws.ping);

    // format uptime

    let days = Math.floor(upTime / 86400);
    let hours = Math.floor(upTime / 3600) % 24;
    let minutes = Math.floor(upTime / 60) % 60;
    let seconds = Math.floor(upTime % 60);

    upTime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    const embed = new EmbedBuilder()
      .setTitle("Bot Info")
      .setColor("Green")
      .addFields([
        {
          name: "UpTime",
          value: `${upTime}`,
        },
        {
          name: "Ping",
          value: `${ping} ms`,
        },
        {
          name: "Developer",
          value: "mini#5130",
        },
      ]);

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
