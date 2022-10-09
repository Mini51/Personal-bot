module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.Logger.info(`Logged in as ${client.user.tag}`);
  },
};
