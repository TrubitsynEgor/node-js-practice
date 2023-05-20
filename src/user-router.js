const Router = require('../framework/Router')
const router = new Router()
const { createUser, getUser } = require('./user-controller')

router.get('/users', (req, res) => getUser(req, res))
router.post('/users', (req, res) => createUser(req, res))

module.exports = router
