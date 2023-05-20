// В node.js мы имеем 4 вида стримов
// 1. Readable - чтение
// 2. Writable - Запись
// 3. Duplex - универсальные(чтение + запись Readable + Writable)
// 4. Transform - Такой же как Duplex. НО! Может изменять данные по мере чтения

//? Представим то у нас есть файл размером 5 гб, если мы попытаемся прочитать его
//? Стандартным методом fs.readFile() и это может занять длительное время если файл большой
//? То есть пока мы этот файл не считаем иы его никуда не отправим, а хотелось бы отправлять этот файл по кусочкам
//TODO streams для этого и предназначены. Мы читаем файл по кусочкам, прочитали -> Отправили. По умолчанию кусочек 64кb,
//TODO Все что можно получать или отправлять по сети, можно отправить по кусочкам, не обязательно файлы

const fs = require('fs')
const path = require('path')

//TODO Стандартный способ считать файл
// fs.readFile(path.resolve(__dirname, 'test.txt'), (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

//TODO streams работают по принципу событий, т.е мы создаем stream. Указываем к нему путь.
//TODO И после подписываемся на событие, основные из них(data, open, close, end, err, pause, ready, resume)
//? Один chunk по дефолту 64kb(65486b), если запустим код то увидим что наш файл был разбит на несколько таких chunk
// const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'), {
//   encoding: 'utf-8', //? <--- Так же принемет объект с опциями вторым параметром
// })

// stream.on('data', (chunk) => console.log(chunk))
// stream.on('end', () => console.log('Закончили чтение файла'))
// stream.on('open', () => console.log('Начали чтение файла'))
// stream.on('error', (e) => console.log(e.message)) //! Не забываем обработать Error иначе app упадет

//TODO Теперь попробуем по кусочкам что то записать в наш файл
// const writebleStream = fs.createWriteStream(path.resolve(__dirname, 'test.txt'))
// for (let i = 0; i < 20; i++) {
//   writebleStream.write(i + '.\n')
// }
// writebleStream.end() // Способы
// writebleStream.close() // Завершить
// writebleStream.destroy() // Запись

//* Забегая вперед, если мы работаем с http server у нас доступны 2 объекта в параметрах request и response
//TODO Так вот они являются стримами
const http = require('http')
http.createServer((req, res) => {
  //req - readable stream
  //res - writable stream
  // Отправка данных пользователю
  const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt')) // create stream
  //! В Такой ситуации стрим закончит читать раньше чем пользователь скачает
  //! Так как http соединение значительно медленней чем чтение файла
  stream.on('data', (chunk) => res.write(chunk)) // Отправляем file по кусочкам по сети
  stream.on('end', () => res.end()) // Обрабатываем ситуацию когда мы закончили читать файл и завершить сетевое подключение
  stream.on('error', (e) => console.log(e.message))
  //? И для этого есть метод pipe()
  stream.pipe(res) // т.е readable stream не начинает читать следующую порцию данных пока res - writable stream не закончит
  // записывать предыдущею
})
