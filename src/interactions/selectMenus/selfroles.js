module.exports = {
  data: {
    customId: "selfrolesSlect",
    usedFor: "selfroles",
    type: "SELECT_MENU",
  },

  /**
   * @param {CommandInteraction} interaction
   * @return
   */
  async execute(interaction) {
    const member = interaction.message.guild.members.cache.get(interaction.user.id);
    const arrayOfRoles = interaction.values;

    for (const role of arrayOfRoles) {
      await member.roles.add(role);
    }

    await interaction.reply({
      content: `The requested roles have been added to you.`,
      ephemeral: true,
    });
    return interaction.client.Logger.success(
      `Added ${member.user.username} selected roles [${arrayOfRoles}]`
    );
  },
};
