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
    const role = interaction.guild.roles.cache.find(
      (role) => role.id === "976692270025826355" // hard codded since this is a bot for my own server
    );
    if (member.roles.cache.has(role.id)) {
      interaction.reply({
        content: "⚠ You are already verified",
        ephemeral: true,
      });
    } else {
      member.roles.add(role);
      interaction.client.Logger.success(`User ${member.user.tag} has been verified`);
      interaction.reply({
        content: "✅ You have been verified",
        ephemeral: true,
      });
    }
  },
};
