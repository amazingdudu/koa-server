const Router = require('@koa/router');
const controller = require('../controller/user');
const middleware = require('../middleware/user');

const router = new Router({ prefix: '/user' });

router.post('/register', middleware.validate, controller.create);

module.exports = router;
