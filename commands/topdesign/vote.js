const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Vote extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'vote',
      aliases: ['like'],
      category: 'Top Design',
      description: 'LIIIIIKKEEEEESSSS',
      usage: 'vote #<postid>',
      permLevel: 0
    })
  }

  async run(message) {
    if (message.args[0] === '<:gomme:313418733861470210>') return `Vielen Dank für deine Stimme! ${this.client.emojis.get('313418733861470210')}`
    const postID = this.f.getPostID(message.args)
    if (!postID) throw 'Nutze `!vote #[Nr des Posts]` um für einen Post zu voten. \nhttps://youtu.be/trJqJfpdReE'
    try {
      const request = await this.f.votePost(postID, message.author.id)
      if (!request) throw `**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden oder ist nicht aus dem aktuellem Monat.`
      if (request.action === 'remove') return `Dein Vote wurde entfernt! Der Post von **${request.posted_by}** hat jetzt **${request.likes} ${this.f.voteOrVotes(request.likes)}**.`
      if (request.action === 'add') return `Dein Vote wurde hinzugefügt! Der Post von **${request.posted_by}** hat jetzt **${request.likes} ${this.f.voteOrVotes(request.likes)}**.`
    } catch (error) {
      console.log(error)
      throw error
      // message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Vote
