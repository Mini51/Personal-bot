const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} = require("discord.js");
const { devID } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("ADMIN ONLY COMMAND"),

  /**
   * @param {CommandInteraction} interaction
   * @return
   */

  async execute(interaction) {
    if (interaction.user.id === devID) {
      // channel of the interaction
      const channel = interaction.channel;

      const verifyEmbed = new EmbedBuilder()
        .setTitle("Verification")
        .setDescription(
          "1. Must be a student of CodeRVA \n2. No Nsfw content \n3. No discrimination/sexism/racism/homophobia etc \n4. Follow discord TOS :https://discord.com/guidelines"
        );

      const verifyButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji("✅")
        .setLabel("Verify")
        .setCustomId("verifyButton");

      const verifyRow = new ActionRowBuilder().addComponents(verifyButton);

      // send a message to the channel that the interaction was sent in
      channel.send({
        embeds: [verifyEmbed],
        components: [verifyRow],
      });

      await interaction.reply({
        content: "Verification message sent to the channel",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "You are not the developer",
        ephemeral: true,
      });
    }
  },
};
