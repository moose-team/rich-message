var test = require('tape')
var richMessage = require('./')
var mergeMessages = richMessage.mergeMessages
var CAT_URL = 'https://cdn.rawgit.com/moose-team/rich-message/master/cat.png'

test('usage example', function (t) {
  var message = {
    text: 'hi maxogden', // text entered by a user
    username: 'mafintosh', // user's github name
    timestamp: Date.now()
  }
  var username = 'maxogden' // current user's github name (used for highlighting)

  var output = richMessage(message, username)
  var expected = {
    text: 'hi maxogden',
    username: 'mafintosh',
    anon: false,
    avatar: 'https://github.com/mafintosh.png',
    timeago: richMessage.timeago(message.timestamp),
    html: '<div class="highlight"><p>hi maxogden</p><p></p></div>'
  }

  t.equal(output.html, expected.html, 'html is correctly formatted')
  t.false(output.anon, 'user is not anon')
  t.equal(output.timeago, expected.timeago, 'timeago works as expected')
  t.end()
})

test('link replacement', function (t) {
  var message = {
    text: '#cats #cats #cats not#cat #cat!%$',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  var expected = '<div><p>' +
    '<a href="#cats">#cats</a> <a href="#cats">#cats</a> ' +
    '<a href="#cats">#cats</a> not#cat #cat!%$' +
    '</p><p></p></div>'

  t.equal(output.html, expected, 'links are replaced in output html')
  t.end()
})

test('github avatars', function (t) {
  var message = {
    text: 'i like cats',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  t.equal(output.avatar, 'https://github.com/cat.png')
  t.end()
})

test('anon avatars', function (t) {
  var message = {
    text: 'i like cats',
    username: 'Anonymous cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  t.equal(output.avatar, CAT_URL)
  t.end()
})

test('github links', function (t) {
  var message = {
    text: 'cats isaacs/npm#1234',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  var expected = '<div><p>' +
    'cats <a href="https://github.com/isaacs/npm/issues/1234">' +
    'isaacs/npm#1234</a>' +
   '</p><p></p></div>'

  t.equal(output.html, expected)
  t.end()
})

test('newlines -> paragraphs', function (t) {
  var message = {
    text: 'cat\ncat',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  var expected = '<div><p>' +
    'cat<p></p>cat' +
   '</p><p></p></div>'

  t.equal(output.html, expected)
  t.end()
})

test('username highlight', function (t) {
  var message = {
    text: 'cat',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'cat')
  var expected = '<div class="highlight"><p>' +
    'cat' +
   '</p><p></p></div>'

  t.equal(output.html, expected)
  t.end()
})

// bug: moment does not calculate time reliably in different environments
// on travis, 0 returns 1970, on mac os x, 1969
test.skip('timeago', function (t) {
  var message = {
    text: 'cat',
    username: 'cat',
    timestamp: 0
  }

  var output = richMessage(message, 'cat')
  t.equal(output.timeago, '01/01/1970')
  t.end()
})

test('markdown render', function (t) {
  var message = {
    text: '`cat` **cat**',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  var expected = '<div><p>' +
    '<code>cat</code> <strong>cat</strong>' +
   '</p><p></p></div>'

  t.equal(output.html, expected)
  t.end()
})

test('merge messages', function (t) {
  var message1 = {
    text: 'cat1',
    html: '<p>cat1</p>'
  }

  var message2 = {
    text: 'cat2',
    html: '<p>cat2</p>'
  }

  var output = mergeMessages(message1, message2)
  var expected = {
    text: 'cat1\ncat2',
    html: '<p>cat1</p><p></p><p>cat2</p>'
  }

  t.deepEqual(output, expected)
  t.end()
})
