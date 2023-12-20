const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('repo')
    .setDescription('Link to my GitHub repo page.'),
  async execute (interaction) {
    const viewmorebutton = new ButtonBuilder()
      .setCustomId('view more')
      .setLabel('View More')
      .setStyle(ButtonStyle.Primary)

    const linkbutton = new ButtonBuilder()
      .setLabel('GitHub repo')
      .setURL('https://github.com/RVCC-IDMX/my-bot-juvithaker')
      .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder()
      .addComponents(viewmorebutton, linkbutton)

    await interaction.reply({
      content: 'I was created using this GitHub repo',
      components: [row]
    })
  }
}
