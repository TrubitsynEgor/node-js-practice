const Emitter = require('events')

const emitter = new Emitter()

emitter.on('message', (data, second) => {
  console.log(`Вы прислали сообщение  ${data}`)
  console.log(`Второй аргумент  ${second}`)
})

const MESSAGE = process.env.MESSAGE || ''
console.log(process.env.MESSAGE)

if (MESSAGE) {
  emitter.emit('message', MESSAGE, 123)
} else {
  emitter.emit('message', 'Вы не указали сообщение')
}
