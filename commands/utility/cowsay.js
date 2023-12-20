/* eslint-disable no-useless-escape */
const { SlashCommandBuilder } = require('discord.js')
const cowsay = require('cowsay')

let cowList

// Create an asynchronous function to fetch the cow list
async function fetchCowList () {
  return new Promise((resolve, reject) => {
    cowsay.list((error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

// Immediately-invoked function expression (IIFE) to run the asynchronous code
(async () => {
  cowList = await fetchCowList()
})()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Makes a cow say something!')
    .addStringOption(option =>
      option.setName('say')
        .setDescription('The text for the cow to say!')
        .setMaxLength(60))
    .addStringOption(option =>
      option.setName('cow')
        .setDescription('The cow to display!')
        .setMaxLength(25)),
  async execute (interaction) {
    const input = interaction.options.getString('say') || 'Ime a cow 🐄'
    const cow = interaction.options.getString('cow') || 'default'

    if (cowList.includes(cow)) {
      let toSay = cowsay.say({
        text: input,
        f: cow
      })

      toSay = toSay.replaceAll('\`', '\'')

      await interaction.reply(`\`\`\`${toSay.substring(0, 1994)}\`\`\``)
    } else {
      await interaction.reply({ content: 'Not a valid cow! Click [here](<https://github.com/piuccio/cowsay/tree/master/cows>) for a list of cows :)', ephemeral: true })
    }
  }
}
