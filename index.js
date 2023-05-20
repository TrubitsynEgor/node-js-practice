const Application = require('./framework/Application')
const PORT = process.env.PORT || 5000
const userRouter = require('./src/user-router')
const jsonParser = require('./framework/parseJson')
const parseUrl = require('./framework/parseUrl')
const mongoose = require('mongoose')

const app = new Application()

app.use(parseUrl('http://localhost:5000'))
app.use(jsonParser)
app.addRouter(userRouter)

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://trubitsynwork74:Psqu7uAsl7LpAAFX@cluster0.zulkpqy.mongodb.net/?retryWrites=true&w=majority'
    )
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  } catch (error) {
    console.log(error.message)
  }
}

start()
