const Command = require('../../base/commands/Command.js')

const { js_beautify: beautify } = require('js-beautify')

class Code extends Command {
  constructor(client) {
    super(client, {
      name: 'js',
      aliases: ['code'],
      category: 'System',
      description: 'Ganz ezy deinen Code nice posten.',
      usage: 'js',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message) {
    const args = message.args
    let code

    if (args.length < 1) {
      // No Code -> Search and repost
      const messages = message.channel.messages
        .array()
        .reverse()
        .filter(msg => msg.author.id !== message.client.user.id)
      const codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/gi
      for (let m = 0; m < messages.length; m++) {
        const msg = messages[m]
        const groups = codeRegex.exec(msg.content)
        if (groups && groups[1] && groups[1].length) {
          code = groups[1]
          break
        }
      }
    } else {
      // Code -> Post beautified Code
      code = args.join(' ')
    }

    if (!code) {
      message.delete()
      throw 'Da is kein JavaScript-Code zum formatieren.'
    }

    let beautifiedCode = beautify(code, { indent_size: 2, brace_style: 'none' })
    beautifiedCode = this.reduceIndentation(beautifiedCode)
    return (`**${message.author.username}**\n${'```js'}\n${beautifiedCode}\n${'```'}`)
    message.delete()
  }
  reduceIndentation(string) {
    let whitespace = string.match(/^(\s+)/)
    if (!whitespace) return string
    whitespace = whitespace[0].replace('\n', '')
    const lines = string.split('\n')
    const reformattedLines = []
    lines.forEach(line => {
      reformattedLines.push(line.replace(whitespace, ''))
    })
    return reformattedLines.join('\n')
  }
}
module.exports = Code
