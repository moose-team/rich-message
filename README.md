# rich-message

> Turn a plain message into a rich HTML message

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/rich-message.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/rich-message
[travis-image]: https://img.shields.io/travis/moose-team/rich-message.svg?style=flat-square
[travis-url]: https://travis-ci.org/moose-team/rich-message

## Install

```
npm install rich-message
```

## Usage

```js
var richMessage = require('rich-message')
var basicMessage = {
  text: 'hi maxogden', // text entered by a user
  username: 'mafintosh', // github username
  timestamp: Date.now()
}
var username = 'maxogden' // current user's github username (used for highlighting)

var output = richMessage(basicMessage, username)
// { text: 'hi maxogden',
//   username: 'mafintosh',
//   timestamp: 1458939703123,
//   anon: false,
//   avatar: 'https://github.com/mafintosh.png',
//   timeago: '2:01 PM',
//   html: '<div class="highlight"><p>hi maxogden</p><p></p></div>' }
```

This module is currently very tightly coupled with [friends](https://github.com/moose-team/friends) (sorry). If you'd like to help make it more usable for other projects, please fork and contribute!

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)
