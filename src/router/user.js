const Router = require('@koa/router');
const controller = require('../controller/user');
const middleware = require('../middleware/user');
const authMiddleware = require('../middleware/auth');

const router = new Router({ prefix: '/user' });

router.post('/register', middleware.registerValidate, controller.create);
router.get('/info', authMiddleware.checkLogin, controller.getUserInfo);

module.exports = router;
