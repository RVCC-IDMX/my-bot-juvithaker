/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute (interaction) {
    await interaction.reply('Pong!');
  },
};
