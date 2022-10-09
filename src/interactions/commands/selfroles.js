const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  Message,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonBuilder,
} = require("discord.js");
const { DEVID } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selfroles")
    .setDescription("selfrole system")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("setup selfrole system")
        .addStringOption((option) =>
          option.setName("category").setDescription("what category this is for").setRequired(true)
        )
        .addRoleOption((option) =>
          option.setName("role1").setDescription("role 1").setRequired(true)
        )
        .addRoleOption((option) => option.setName("role2").setDescription("role 2"))
        .addRoleOption((option) => option.setName("role3").setDescription("role 3"))
        .addRoleOption((option) => option.setName("role4").setDescription("role 4"))
        .addRoleOption((option) => option.setName("role5").setDescription("role 5"))
        .addRoleOption((option) => option.setName("role6").setDescription("role 6"))
        .addRoleOption((option) => option.setName("role7").setDescription("role 7"))
        .addRoleOption((option) => option.setName("role8").setDescription("role 8"))
        .addRoleOption((option) => option.setName("role9").setDescription("role 9"))
        .addRoleOption((option) => option.setName("role10").setDescription("role 10"))
        .addRoleOption((option) => option.setName("role11").setDescription("role 11"))
        .addRoleOption((option) => option.setName("role12").setDescription("role 12"))
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("remove a selfrole")
        .addRoleOption((option) =>
          option.setName("role").setDescription("role to remove").setRequired(true)
        )
    ),
  async execute(interaction) {
    if (!interaction.user.id === DEVID) {
      return interaction.reply("You are not the developer");
    }
    if (interaction.options.getSubcommand() === "setup") {
      const category = interaction.options.getString("category");

      const roles = [];
      for (let i = 1; i < 13; i++) {
        const role = interaction.options.getRole(`role${i}`);
        if (role) {
          roles.push(role);
        }
      }

      const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("selfrolesSlect")
          .setPlaceholder("Nothing selected")
          .setMinValues(1)
          .setMaxValues(roles.length)
          .addOptions([
            // add each role as an option
            ...roles.map((role) => ({
              label: role.name,
              value: role.id,
            })),
          ])
      );

      interaction.reply({ content: `${category}`, components: [row] });
    }
    if (interaction.options.getSubcommand() === "remove") {
      const Role = interaction.options.getRole("role");

      //check if the has the role
      if (!interaction.member.roles.cache.find((role) => role.id === Role.id)) {
        return interaction.reply({
          content: `You do not have the role \`${Role.name}\``,
          ephemeral: true,
        });
      }

      if (Role.id === "898387681673875548") {
        return interaction.reply({
          content: `You cannot unverify yourself`,
          ephemeral: true,
        });
      }

      //try and remove the role from the user
      try {
        await interaction.member.roles.remove(Role);
        client.logger.success(`Removed role ${Role.name} from ${interaction.user.tag}`);
        interaction.reply({
          content: `Removed ${Role.name} from you`,
          ephemeral: true,
        });
      } catch (error) {
        client.logger.error(
          `Error removing role ${Role.name} from ${interaction.user.tag} \n ${error}`
        );
        interaction.reply({
          content: "Failed to remove role, make sure it is above the self roles",
          ephemeral: true,
        });
      }
    }
  },
};
