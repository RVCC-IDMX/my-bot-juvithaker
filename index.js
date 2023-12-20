const fs = require('node:fs')
const path = require('node:path')
const {
  Client, Collection, Events, GatewayIntentBits, EmbedBuilder
} = require('discord.js')
const { token } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    const { customId } = interaction
    if (customId === 'view more') {
      const viewmoreEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('RVCC IDMX Discord Bot Repo')
        .setURL('https://github.com/RVCC-IDMX/my-bot-juvithaker')
        .setAuthor({ name: 'Juvina Thaker', iconURL: 'https://imgur.com/gallery/pwbUJwD', url: 'https://github.com/juvithaker' })
        .setThumbnail('https://imgur.com/a/31ij6Ss')
        .setImage('https://imgur.com/a/31ij6Ss')
        .setTimestamp()
        .setFooter({ text: 'Final Project' })
      await interaction.deferUpdate()
      await interaction.channel.send({ embeds: [viewmoreEmbed] })
      return
    }
  }

  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
  }
})

client.login(token)
