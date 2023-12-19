const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('The input to echo back')
      // Ensure the text will fit in an embed description, if the user chooses that option
        .setMaxLength(25))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to echo into')
      // Ensure the user can only select a TextChannel for output
        .addChannelTypes(ChannelType.GuildText))
    .addBooleanOption(option =>
      option.setName('embed')
        .setDescription('Whether or not the echo should be embedded')),
  async execute (interaction) {
    // Get options
    const input = interaction.options.getString('input') || 'Hello!'
    const channel = interaction.options.getChannel('channel') || interaction.channel
    const embed = interaction.options.getBoolean('embed') || false

    // Echo message to channel
    if (!embed) {
      await channel.send(input)
    } else {
      const embed = new EmbedBuilder()
        .setTitle(input)
      await channel.send({ embeds: [embed] })
    }

    // Notify user that message was echoed
    await interaction.reply({ content: `Echo sent in <#${channel.id}>`, ephemeral: true })

    // await interaction.reply('Pong!');
  }
}
