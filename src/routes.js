const Router = require('koa-router')

const authRequired = require('./middlewares/authRequired')
const mainController = require('./controllers/main')
const userController = require('./controllers/user')

// Main Router
const router = new Router()
router.get('/boom', mainController.boom)
router.get('/ping', mainController.check)

// API Router (v1)
const apiRouter = new Router({ prefix: '/v1' })
apiRouter.get('/user', authRequired, userController.get)
apiRouter.get('/user/confirm/:token', userController.confirm)
apiRouter.post('/user/register', userController.create)
apiRouter.post('/user/authenticate', userController.login)

// Merge Routers
router.use('/api', apiRouter.routes())

module.exports = router
