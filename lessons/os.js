const os = require('os')
const cluster = require('cluster')

// console.log(os.platform()) //* win32 - OS
// console.log(os.arch()) //* x64 - Архитектура процессора
// console.log(os.cpus()) //* return array где каждый элемент это obj с описанием ядра процессора
//? Так же мы можем узнать колличество ядер os.cpus().length, и на основании колличества ядер разное колличество процессов
// const cpus = os.cpus()

// console.log(process.pid)

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length - 2; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    console.log(`Воркер с pid ${worker.process.pid} умер`)
    cluster.fork()
  })
} else {
  console.log(`Воркер с pid = ${process.pid} запущен`)
  setInterval(() => {
    console.log(`Воркер с pid = ${process.pid} запущен`)
  }, 5000)
}
