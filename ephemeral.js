const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('secretping')
    .setDescription('Provides information about the user.'),
  async execute (interaction) {
    await interaction.reply({ content: 'Secret Pong!', ephemeral: true })
  }
}
