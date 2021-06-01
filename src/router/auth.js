const Router = require('@koa/router');
const controller = require('../controller/auth');
const middleware = require('../middleware/auth');

const router = new Router({ prefix: '/auth' });

router.post('/login', middleware.loginValidate, controller.login);

module.exports = router;
