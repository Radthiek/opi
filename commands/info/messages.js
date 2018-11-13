const Command = require('../../base/commands/Command.js')

class Messages extends Command {
  constructor(client) {
    super(client, {
      name: 'messages',
      aliases: ['spam'],
      category: 'Info',
      description: 'So viel Spam.',
      usage: 'messages',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message) {
    let stats = this.client.stats.array()
    let totalMessages = 0
    for (let i = 0; i < stats.length; i++) {
      totalMessages += stats[i].messages
    }
    let average = Math.round(totalMessages / stats.length)

    if (average < 1000) {
      return (`Da geht noch was: **${average} Nachrichten pro Tag**`)
    } else {
      return (`Ganz schön viel Spam: **${average} Nachrichten pro Tag**`)
    }
  }
}

module.exports = Messages
