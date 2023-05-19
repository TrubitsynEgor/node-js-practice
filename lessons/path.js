const path = require('path')

console.log(
  'Склеить участки пути: ',
  path.join(__dirname, 'first', 'second', 'third')
  // Склеить участки пути:  c:\Users\Егор\Desktop\node-js\node-js-practice\lessons\first\second\third
)
console.log(
  'Получить абсолютный путь: ',
  path.resolve('first', 'second', 'third')
  //Получить абсолютный путь:  c:\Users\Егор\Desktop\node-js\node-js-practice\first\second\third
)

const fullPath = path.resolve(__dirname, 'first', 'second', 'third.js')
console.log('Парсинг пути', path.parse(fullPath))
// Парсинг пути {
//   root: 'c:\\',
//   dir: 'c:\\Users\\Егор\\Desktop\\node-js\\node-js-practice\\lessons\\first\\second',
//   base: 'third',
//   ext: '',
//   name: 'third'
// }

console.log('Разделитель в ОС: ', path.sep) // Разделитель в ОС:  \
console.log('Проверка на абсолютный путь: ', path.isAbsolute(fullPath)) // Проверка на абсолютный путь:  true

console.log('Название файла: ', path.basename(fullPath)) // third.js
console.log('Расширение файла: ', path.extname(fullPath)) // .js

//-------------------------------------------

const siteUrl = 'http://localhost:8080/user?id=5123'

const url = new URL(siteUrl)

console.log(url)
// URL {
//   href: 'http://localhost:8080/user?id=5123',
//   origin: 'http://localhost:8080',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'localhost:8080',
//   hostname: 'localhost',
//   port: '8080',
//   pathname: '/user',
//   search: '?id=5123',
//   searchParams: URLSearchParams { 'id' => '5123' },
//   hash: ''
// }
