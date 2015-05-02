var test = require('tape')
var richMessage = require('../')

test('link replacement', function (t) {
  var message = {
    text: '#cats #cats #cats not#cat',
    username: 'cat',
    timestamp: Date.now()
  }

  var output = richMessage(message, 'other_cat')
  var expected = '<div><p>' +
    '<a href="#cats">#cats</a> <a href="#cats">#cats</a> ' +
    '<a href="#cats">#cats</a> not#cat' +
    '</p><p></p></div>'

  t.equal(output.html, expected)
  t.end()
})
