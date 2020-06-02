const handler = require('./error-handler');

console.log(handler(['this is a message', { a: 'c', b: ['Message 1', 'Message 2']}, 12776, {err: 'Some error message'}]))