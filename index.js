module.exports = makeRichMessage
module.exports.mergeMessages = mergeMessages
module.exports.timeago = timeago

var emoji = require('markdown-it-emoji')
var ghlink = require('ghlink')
var higlight = require('highlight.js')
var MarkdownIt = require('markdown-it')
var twemoji = require('twemoji')
var moment = require('moment')

var CAT_URL = 'https://cdn.rawgit.com/moose-team/rich-message/master/cat.png'

var md = new MarkdownIt({
  linkify: true,
  highlight: function (str, lang) {
    if (lang && higlight.getLanguage(lang)) {
      try {
        return higlight.highlight(lang, str).value
      } catch (err) {}
    }

    try {
      return higlight.highlightAuto(str).value
    } catch (err) {}

    return '' // use external default escaping
  }
}).use(emoji)

md.renderer.rules.emoji = function (token, index) {
  return twemoji.parse(token[index].content)
}

function makeRichMessage (message, username) {
  message.anon = /Anonymous/i.test(message.username)
  message.avatar = message.anon
    ? CAT_URL
    : `https://github.com/${message.username}.png`
  message.timeago = timeago(message.timestamp)

  message.text = message.text.replace(/(^|\s)(#[a-zA-Z0-9]+)(?=$|\s)/g, '$1[$2]($2)')
  message.html = md.render(message.text)
  message.html = message.html.replace(/\n/g, '<p></p>')
  message.html = ghlink(message.html, { format: 'html' })

  var highlight = (message.text.indexOf(username) !== -1)
  var classStr = highlight ? ' class="highlight"' : ''
  message.html = `<div${classStr}>${message.html}</div>`

  return message
}

function mergeMessages (message1, message2) {
  message1.text += '\n' + message2.text
  message1.html += '<p></p>' + message2.html
  return message1
}

function timeago (milliseconds) {
  var timeago = moment(milliseconds).calendar()
  if (timeago.indexOf('Today at ') === 0) return timeago.substring(9)
  return timeago
}
