const Command = require('./Command.js')

class FunCommand extends Command {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Fun',
        price: 10
      })
    )
  }

  async gommeVideo() {
    return new Promise((resolve, reject) => {
      const request = require('request')
      request.get(
        {
          url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC7MIk4LVEjcGiJX919oJ1Eg&maxResults=10&order=date&type=video&key=AIzaSyCfrC4r1SgdL8XMd8JYBox9BePIhDAeOTs',
          json: true
        },
        function(error, response, body) {
          let videoGomme = 'https://www.youtube.com/watch?v=' + body.items[0].id.videoId
          if (!videoGomme) {
            reject('error')
          } else {
            resolve(videoGomme)
          }
        }
      )
    })
  }
}
module.exports = FunCommand
