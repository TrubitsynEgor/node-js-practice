const fs = require('fs')
const path = require('path')

//? Синхронное(блокирующие) Создание директории, первым параметром передаем путь,
//? если нужны вложенные то передать  recursive: true
// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir2'), {
//   recursive: true,
// })

//? АСинхронное(неблокирующие) Создание директории, первым параметром передаем путь,
//? вторым callback
// console.log('START')
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Папка создана')
// })
// console.log('END')

//? Удаление папки:
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//   if (err) {
//     throw err
//   }
// })

//? Создать файл: 1-путь, 2-контент, 3-callback. Функция ПЕРЕзаписывает данные в файл,
//? То есть если в файле уже были данные то она их перезапишет
// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 ggsd 6 3 11', (err) => {
//   if (err) {
//     throw err
//   }
//   console.log('File write')
// })

//? А если нужно что то до записать в конец файла
//? Но что бы гарантировать что контент добавиться именно в конец,
//? Нужно поместить эту функцию внутрь предыдущей
// fs.appendFile(
//   path.resolve(__dirname, 'test.txt'),
//   ' Добавили контент!',
//   (err) => {
//     if (err) throw err
//     console.log('File changed')
//   }
// ) //TODO Но чтобы избежать "Адд колбеков" можно переписать код с callback на Promise

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve()
    })
  )
}
const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve()
    })
  )
}
const readFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err.message)
      }
      resolve(data)
    })
  )
}

const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve()
    })
  )
}
// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data')
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n1567'))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '\nGgasdg'))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n5ggG26'))
//   .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))

// removeFileAsync(path.resolve(__dirname, 'test.txt')).then(() =>
//   console.log('file was deleted')
// )

// const text = process.env.TEXT || '1 5 1 at 135'
// console.log(text)

// writeFileAsync(path.resolve(__dirname, 'text.txt'), text)
//   .then(() => readFileAsync(path.resolve(__dirname, 'text.txt')))
//   .then((data) => data.split(' ').length)
//   .then((count) =>
//     writeFileAsync(
//       path.resolve(__dirname, 'count.txt'),
//       `Колличество слов: ${count}`
//     ).then(() => removeFileAsync(path.resolve(__dirname, 'text.txt')))
//   )
