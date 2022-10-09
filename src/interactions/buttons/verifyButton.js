module.exports = {
  data: {
    customId: "verifyButton",
    usedFor: "verify",
    type: "BUTTON",
  },

  /**
   * @param {CommandInteraction} interaction
   * @return
   */
  async execute(interaction) {
    const member = interaction.member;
    const role = interaction.guild.roles.cache.find((role) => role.id === "898387681673875548");

    if (member.roles.cache.has(role.id)) {
      interaction.reply({
        content: "⚠ You are already verified",
        ephemeral: true,
      });
    } else {
      member.roles.add(role);
      interaction.reply({
        content: "✅ You have been verified",
        ephemeral: true,
      });
    }
  },
};
